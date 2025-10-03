/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import images from '@images';
import { FlashList } from '@shopify/flash-list';
import { setNavigation } from '@utils';
import useAuth from 'hooks/useAuth';
import React, { useLayoutEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import EventList from 'view/event/EventList';
import Welcome from 'view/event/Welcome';

const Event: React.FC<any> = ({ navigation }) => {
  const { loggedUser } = useAuth();

  const data = [
    {
      startDate: '2025-10-05T17:00:00',
      endDate: '2025-10-05T23:00:00',
      title: 'Block Developer 2025',
      location: 'Ori Studios',
      description:
        'At BLOCK.MN, our mission is to empower real estate project developers to successfully realize their projects and grow into leading developers in the market. To support this vision, we have established the Developers’ Club — a collaborative platform that connects project developers with trusted businesses offering the products, services, and expertise they need to achieve lasting success.',
      image: images.ori,
      price: 300000,
    },
    {
      startDate: '2025-10-12T17:00:00',
      endDate: '2025-10-12T23:00:00',
      title: 'Introductory Design workshop',
      location: 'Ori Studios',
      description:
        'At BLOCK.MN, our mission is to empower real estate project developers to successfully realize their projects and grow into leading developers in the market. To support this vision, we have established the Developers’ Club — a collaborative platform that connects project developers with trusted businesses offering the products, services, and expertise they need to achieve lasting success.',
      image: images.event2,
      price: 150000,
    },
    {
      startDate: '2025-10-15T17:00:00',
      endDate: '2025-10-15T23:00:00',
      title: 'Introductory Tool workshop',
      location: 'Ori Studios',
      description:
        'At BLOCK.MN, our mission is to empower real estate project developers to successfully realize their projects and grow into leading developers in the market. To support this vision, we have established the Developers’ Club — a collaborative platform that connects project developers with trusted businesses offering the products, services, and expertise they need to achieve lasting success.',
      image: images.event3,
      price: 100000,
    },
  ];

  useLayoutEffect(() => {
    setNavigation({ navigation, title: ' ' });
  }, [navigation]);

  const renderItem = ({ item }: { item: any }) => <EventList data={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.space}>
        <Welcome loggedUser={loggedUser} />
        <FlashList
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { flex: 1, paddingHorizontal: 15, paddingVertical: 15 },
});
