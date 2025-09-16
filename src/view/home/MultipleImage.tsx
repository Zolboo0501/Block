import { getAttachmentUrl } from '@utils';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import RotateImage from './RotateImage';

const MultipleImage: React.FC<any> = ({ item }) => {
  return (
    <TouchableOpacity
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
