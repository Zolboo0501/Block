/* eslint-disable react-native/no-inline-styles */
import { WIDTH } from '@utils';
import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

import lottie from '@lottie';
import TextView from './TextView';

const ProcessingLoader: React.FC<any> = ({ isVisible, onVisible }) => {
  return (
    <Modal
      visible={isVisible}
      onRequestClose={() => {
        onVisible(false);
      }}
      animationType="fade"
    >
      <TouchableOpacity style={styles.dialogContainer} activeOpacity={1}>
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              width: WIDTH - 100,
              backgroundColor: '#111111',
              borderRadius: 24,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <View style={{ padding: 20 }}>
                <AnimatedLottieView
                  source={lottie.upload}
                  style={{
                    height: WIDTH * 0.3,
                    width: 300,
                  }}
                  autoPlay
                />
                <View>
                  <TextView center>Та түр хүлээнэ үү</TextView>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ProcessingLoader;

const styles = StyleSheet.create({
  dialogContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
