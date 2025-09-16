/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import { getAttachmentUrl } from '@utils';
import ImageView from 'components/ImageView';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const MessageImage: React.FC<any> = ({ item, image, index }) => {
  const source = getAttachmentUrl(image?.url);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isOdd = index % 2 === 1;

  return (
    <TouchableOpacity
      onPress={() => {
        setModalVisible(true);
      }}
    >
      <FastImage
        source={{
          uri: `${source}`,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={[
          styles.image2,
          {
            marginLeft: isOdd ? 40 : 0,
            marginTop: isOdd ? -60 : index === 2 ? -60 : 0,
          },
        ]}
      />
      <ImageView
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
        index={index}
      />
    </TouchableOpacity>
  );
};

export default MessageImage;

const styles = StyleSheet.create({
  image2: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});
