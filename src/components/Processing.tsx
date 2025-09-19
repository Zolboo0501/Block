/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { WIDTH } from '@utils';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import TextView from './TextView';

const ProcessingLoader: React.FC<any> = ({ isVisible, onVisible }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Start rotation manually
  const startRotation = () => {
    if (!animationRef.current) {
      animationRef.current = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000, // slower smooth spin
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
    }
    animationRef.current.start();
  };

  // Stop rotation
  const stopRotation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
      rotateAnim.setValue(0); // reset to start
    }
  };

  // Example: stop rotation when modal closes
  useEffect(() => {
    if (!isVisible) {
      stopRotation();
    } else {
      startRotation();
    }
  }, [isVisible]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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
            backgroundColor: '#111111',
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              width: WIDTH - 100,
              borderRadius: 24,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <View style={{ padding: 20 }}>
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <FastImage
                    source={images.vaultLogo}
                    style={{
                      height: WIDTH * 0.5,
                      width: 300,
                      backgroundColor: '#111111',
                    }}
                    resizeMode="contain"
                  />
                </Animated.View>
                <View style={{ marginTop: 10 }}>
                  <TextView fontWeight={'500'} center>
                    Your file is currently being uploaded. Please wait.
                  </TextView>
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
