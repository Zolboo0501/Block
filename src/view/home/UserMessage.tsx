import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { messageDate, WIDTH } from '@utils';
import Images from 'components/Images';
import MultipleImage from 'components/MultipleImage';
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { stripHtml } from 'string-strip-html';

const UserMessage: React.FC<any> = ({ item }) => {
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
      <View style={styles.rowGap}>
        <FastImage source={images.logo45} style={styles.image} />
        <View style={styles.messageContainer}>
          {item?.attachments?.length > 3 ? (
            <MultipleImage item={item} />
          ) : (
            <Images item={item} />
          )}

          {renderText()}
        </View>
      </View>
    </View>
  );
};

export default UserMessage;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  rowGap: {
    flexDirection: 'row',
    gap: 5,
  },
  image: {
    width: 32,
    height: 32,
  },

  messageContainer: {
    flexDirection: 'column',
    backgroundColor: '#333333',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    borderBottomRightRadius: 18,
    maxWidth: WIDTH - 100,
  },
});
