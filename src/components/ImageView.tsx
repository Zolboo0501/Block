/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import { Close } from '@icons';
import { getAttachmentUrl, WIDTH } from '@utils';
import React, { useRef } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ImageView: React.FC<any> = ({ item, modalVisible, setModalVisible }) => {
  const scrollRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  return (
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

        <ScrollView
          ref={scrollRef}
          contentContainerStyle={{ flexGrow: 1 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEventThrottle={16}
          pagingEnabled
        >
          {item?.attachments?.map((image: any, index: number) => (
            <View
              key={index}
              style={{
                flex: 1,
                width: WIDTH,
              }}
            >
              <FastImage
                source={{
                  uri: getAttachmentUrl(image?.url),
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  flex: 1,
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111', flexDirection: 'column' },

  close: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
    paddingLeft: 15,
  },
});
