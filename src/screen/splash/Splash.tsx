import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Splash: React.FC<any> = () => {
  return (
    <View style={styles.center}>
      <FastImage
        source={images.vaultLogo}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 240,
  },
});
