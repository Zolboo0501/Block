import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const Splash: React.FC<any> = ({ progress }) => {
  return (
    <View style={styles.center}>
      <FastImage
        source={images.vaultLogo}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <TextView fontSize={15} fontWeight={'600'}>
          Апп шинэчилж байна..... {Math.round(progress * 100)}%
        </TextView>
        <TextView fontSize={13} fontFamily="Open Sans">
          App version : {DeviceInfo.getVersion()}
        </TextView>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  textContainer: {
    marginTop: '25%',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 240,
  },
});
