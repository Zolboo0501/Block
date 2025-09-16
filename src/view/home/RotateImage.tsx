import FastImage from '@d11/react-native-fast-image';
import React from 'react';
import { StyleSheet } from 'react-native';

const RotateImage: React.FC<any> = ({ source, index }) => {
  const calculateTransform = () => {
    const isEven = index % 2 === 0;
    const deg = isEven ? index / 10 + 7 : -(index / 10 + 7);
    return `${deg}deg`;
  };

  return (
    <FastImage
      source={{
        uri: `${source}`,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
      style={[
        styles.image2,
        {
          top: 10 * index,
          transform: [{ rotate: calculateTransform() }],
        },
      ]}
    />
  );
};

export default RotateImage;

const styles = StyleSheet.create({
  image2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});
