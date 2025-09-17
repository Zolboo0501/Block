import { messageDate, WIDTH } from '@utils';
import Attachments from 'components/Attachments';
import MultipleAttachment from 'components/MultipleAttachment';
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Message: React.FC<any> = ({ item }) => {
  const renderText = () => {
    return <TextView>{item?.content}</TextView>;
  };

  return (
    <View style={styles.container}>
      <TextView fontSize={12} color="#666666">
        {messageDate(item)}
      </TextView>
      <View style={styles.messageContainer}>
        {item?.attachments?.length > 3 ? (
          <MultipleAttachment item={item} />
        ) : (
          <Attachments item={item} />
        )}

        {renderText()}
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: { alignItems: 'flex-end', gap: 10 },
  messageContainer: {
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    maxWidth: WIDTH - 100,
    gap: 10,
  },
});
