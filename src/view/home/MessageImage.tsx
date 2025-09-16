/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import { Close } from '@icons';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  fitContainer,
  ResumableZoom,
  useImageResolution,
} from 'react-native-zoom-toolkit';

const MessageImage: React.FC<any> = ({ source, index }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isOdd = index % 2 === 1;
  const insets = useSafeAreaInsets();
  const { isFetching, resolution } = useImageResolution({ uri: source });
  const { width, height } = useWindowDimensions();

  if (isFetching || resolution === undefined) {
    return null;
  }

  const size = fitContainer(resolution.width / resolution.height, {
    width,
    height,
  });

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
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
      <Modal
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: insets.top > 0 ? insets.top : 10,
              paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.close}
          >
            <Close />
          </TouchableOpacity>

          <ResumableZoom
            maxScale={3} // or resolution.width / size.width if you want based on image
            minScale={1}
            style={{ flex: 1 }}
          >
            <FastImage
              source={{
                uri: source,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.contain}
              style={size} // 👈 the actual scaled-down image size
            />
          </ResumableZoom>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default MessageImage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111', flexDirection: 'column' },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    paddingLeft: 15,
  },
  image2: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});
