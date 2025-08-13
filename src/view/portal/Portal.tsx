import { ArrowLeft } from '@icons';
import { WIDTH } from '@utils';
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const Portal: React.FC<any> = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowSpaceBetween}>
        <TextView fontSize={24}>{data.label}</TextView>
        <TouchableOpacity onPress={() => data.onPress()}>
          <ArrowLeft />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => data.onPress()}>
        <FastImage
          style={styles.image}
          source={data.image}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Portal;

const styles = StyleSheet.create({
  image: {
    width: WIDTH - 30,
    height: 150,
  },
  container: {
    flexDirection: 'column',
    gap: 4,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
