/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import images from '@images';
import { FlashList } from '@shopify/flash-list';
import TextView from 'components/TextView';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Portal from 'view/portal/Portal';

const Main: React.FC<any> = ({ navigation }) => {
  const portal = [
    {
      label: 'Vault',
      image: images.vaultLogo,
      onPress: () => navigation.navigate('Benefits'),
    },
    {
      label: 'BLOCK',
      image: images.block,
      onPress: () => navigation.navigate('Benefits'),
    },
    {
      label: 'BLOK',
      image: images.blok,
      onPress: () => navigation.navigate('Benefits'),
    },
    {
      label: 'HIGHLAND PARK',
      image: images.hightland,
      onPress: () => navigation.navigate('Benefits'),
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    return <Portal data={item} />;
  };

  const renderEmpty = () => {
    return (
      <View style={styles.center}>
        <TextView fontSize={20}>Not found portal.</TextView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlashList
        data={portal}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 15 }}
        keyExtractor={(_, index: number) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: {
    paddingHorizontal: 15,
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
