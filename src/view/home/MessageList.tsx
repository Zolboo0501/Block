/* eslint-disable react/no-unstable-nested-components */
import { FlashList } from '@shopify/flash-list';
import useAuth from 'hooks/useAuth';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Message from './Message';
import UserMessage from './UserMessage';

const MessageList: React.FC<any> = ({ data }) => {
  const { loggedUser } = useAuth();

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      if (item.customerId === loggedUser?.erxesCustomerId) {
        return <Message item={item} />;
      }
      return <UserMessage item={item} />;
    },
    [loggedUser?.erxesCustomerId], // ✅ dependency
  );

  const Separator = () => <View style={styles.separator} />;

  return (
    <FlashList
      data={data}
      keyExtractor={item => item?.id?.toString()}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={styles.container}
      removeClippedSubviews
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  separator: {
    height: 10,
  },
});
export default MessageList;
