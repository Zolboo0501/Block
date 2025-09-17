import { messageDate, WIDTH } from '@utils';
import Images from 'components/Images';
import MultipleImage from 'components/MultipleImage';
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { stripHtml } from 'string-strip-html';

const Message: React.FC<any> = ({ item }) => {
  const renderText = () => {
    const messageText =
      item?.botData?.length > 0
        ? item?.botData?.[0]?.text
        : item?.content || '';

    return (
      messageText &&
      stripHtml(messageText).result && (
        <TextView>{stripHtml(messageText).result}</TextView>
      )
    );
  };

  return (
    <View style={styles.container}>
      <TextView fontSize={12} color="#666666">
        {messageDate(item)}
      </TextView>
      <View style={styles.messageContainer}>
        {item?.attachments?.length > 3 ? (
          <MultipleImage item={item} />
        ) : (
          <Images item={item} />
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
  },
});
