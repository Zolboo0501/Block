import { getAttachmentUrl } from '@utils';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import RotateImage from './RotateImage';
import ImageView from './ImageView';

const MultipleImage: React.FC<any> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <TouchableOpacity
      onPress={() => setModalVisible(true)}
      style={[
        styles.imagesContainer,
        {
          height: 150 + item?.attachments?.length * 10,
          marginTop: item?.attachments?.length * 3,
        },
      ]}
    >
      {item?.attachments?.map((image: any, index: number) => {
        const source = getAttachmentUrl(image?.url, 500);

        return <RotateImage source={source} index={index} key={index} />;
      })}
      <ImageView
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={item}
      />
    </TouchableOpacity>
  );
};

export default MultipleImage;

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'column',
    gap: 10,
    position: 'relative',
    width: 160,
  },
});
