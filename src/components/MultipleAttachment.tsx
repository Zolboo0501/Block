/* eslint-disable react-native/no-inline-styles */
import { getAttachmentUrl } from '@utils';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import RotateImage from './RotateImage';
import ImageView from './ImageView';
import File from 'components/File';

const MultipleAttachment: React.FC<any> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const images = item?.attachments?.filter((att: any) =>
    att?.type?.includes('image'),
  );
  const files = item?.attachments?.filter(
    (att: any) => !att?.type?.includes('image'),
  );

  return (
    <View style={{ gap: 10 }}>
      {images?.length > 0 && (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={[
            styles.imagesContainer,
            {
              height: 150 + images?.length * 10,
              marginTop: images?.length * 3,
            },
          ]}
        >
          {images?.map((image: any, index: number) => {
            const source = getAttachmentUrl(image?.url, 500);

            return <RotateImage source={source} index={index} key={index} />;
          })}
          <ImageView
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            item={item}
          />
        </TouchableOpacity>
      )}
      {files?.map((att: any, index: number) => (
        <File att={att} key={index} />
      ))}
    </View>
  );
};

export default MultipleAttachment;

const styles = StyleSheet.create({
  imagesContainer: {
    flexDirection: 'column',
    gap: 10,
    position: 'relative',
    width: 160,
  },
});
