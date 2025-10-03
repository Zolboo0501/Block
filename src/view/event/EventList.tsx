/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import { ArrowUp, Location } from '@icons';
import images from '@images';
import { useNavigation } from '@react-navigation/native';
import { WIDTH } from '@utils';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const EventList: React.FC<any> = ({ data }) => {
  const navigation = useNavigation<any>();

  const onPress = () => {
    navigation.navigate('EventDetail', { data });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <FastImage source={data.image} style={styles.image} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.7)']}
        locations={[0, 0.4, 1]}
        style={styles.gradient}
      />
      <View style={styles.absolute}>
        <View style={styles.column}>
          <TextView fontWeight={'600'} fontSize={14} color="#FFFFFF99">
            {dayjs(data.startDate).format('DD MMM')}
          </TextView>
          <TextView
            fontWeight={'600'}
            fontSize={24}
            color="#fff"
            style={{ width: '80%' }}
          >
            {data.title}
          </TextView>
        </View>
        <View style={styles.row}>
          <View style={styles.rowGap}>
            <Location />
            <TextView fontSize={14} color="#fff">
              {data.location}
            </TextView>
          </View>
          <View style={styles.imageContainer}>
            <FastImage
              source={images.pro}
              style={styles.profile}
              resizeMode="cover"
            />
            <FastImage
              source={images.pro2}
              style={[styles.profile, { marginLeft: -8 }]}
              resizeMode="cover"
            />
            <FastImage
              source={images.pro3}
              style={[styles.profile, { marginLeft: -8 }]}
              resizeMode="cover"
            />
            <View style={[styles.profile, styles.center, { marginLeft: -8 }]}>
              <TextView fontWeight={'600'} fontSize={12}>
                5+
              </TextView>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.end}>
        <ArrowUp />
      </View>
    </TouchableOpacity>
  );
};

export default EventList;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: WIDTH - 30,
    height: 280,
  },
  image: { flex: 1, borderRadius: 25 },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absolute: {
    position: 'absolute',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    height: 280,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  profile: { width: 24, height: 24, borderRadius: 100 },
  column: {
    gap: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    marginLeft: 30,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowGap: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0077FF',
  },
  end: {
    flex: 1,
    width: 56,
    height: 56,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderTopLeftRadius: 12,
    right: 0,
    bottom: 0,
  },
});
