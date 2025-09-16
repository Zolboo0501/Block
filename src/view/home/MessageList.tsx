/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import { FlashList } from '@shopify/flash-list';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { View } from 'react-native';
import Message from './Message';
import UserMessage from './UserMessage';

const MessageList: React.FC<any> = ({ data }) => {
  const { loggedUser } = useAuth();

  const renderItem = ({ item }: { item: any }) => {
    if (item.customerId === loggedUser?.erxesCustomerId) {
      return <Message item={item} />;
    }
    return <UserMessage item={item} />;
  };

  return (
    <FlashList
      data={data}
      keyExtractor={(_, index: number) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={{ flexGrow: 1, paddingVertical: 20 }}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default MessageList;
