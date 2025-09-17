import FastImage from '@d11/react-native-fast-image';
import { Close } from '@icons';
import { getAttachmentUrl, uploadRemoveFile } from '@utils';
import Processing from 'components/Processing';
import TextView from 'components/TextView';
import useAlert from 'hooks/useAlert';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const RenderImages: React.FC<any> = ({ files, setFiles }) => {
  const alert = useAlert();
  const [isUploading, onUploading] = useState(false);

  const onStart = () => {
    setTimeout(() => {
      onUploading(true);
    }, 1000);
  };

  const onError = (message: string) => {
    console.log(message);
    setTimeout(() => onUploading(false), 2000);
    setTimeout(() => alert.onError(message), 3500);
  };

  const onEnd = (result?: any, fileName?: any) => {
    if (result.status === 200) {
      setFiles((prev: any) =>
        prev.filter((item: any) => item?.uri !== fileName),
      );
    }
    setTimeout(() => {
      onUploading(false);
    }, 1000);
  };

  const onDelete = (item: any) => {
    uploadRemoveFile({ fileName: item?.uri, onStart, onEnd, onError });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.gap} onStartShouldSetResponder={() => true}>
        {files?.map((item: any, index: number) => (
          <Image key={index} index={index} item={item} onDelete={onDelete} />
        ))}
      </View>
      <Processing isVisible={isUploading} onVisible={onUploading} />
    </ScrollView>
  );
};

export default RenderImages;

const Image: React.FC<any> = ({ item, index, onDelete }) => {
  return (
    <View style={styles.fileContainer}>
      <TouchableOpacity
        style={styles.close}
        onPress={() => onDelete(item, index)}
      >
        <Close size={18} />
      </TouchableOpacity>
      <FastImage
        source={{ uri: getAttachmentUrl(item?.url) }}
        resizeMode="cover"
        style={styles.image}
      />
      <TextView numberOfLines={2} fontSize={13} center>
        {item?.name}
      </TextView>
      <TextView center fontSize={13} fontWeight={'500'}>
        {(item?.size / 1024).toFixed(2) + ' KB'}
      </TextView>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  gap: { gap: 10, flexDirection: 'row' },
  fileContainer: {
    width: 120,
    backgroundColor: '#333333',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 5,
  },
  close: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  image: { flex: 1, height: 80, borderRadius: 10 },
});
