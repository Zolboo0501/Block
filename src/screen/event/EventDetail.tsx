/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import { ArrowLeft, Clock, Location } from '@icons';
import images from '@images';
import { HEIGHT, WIDTH } from '@utils';
import TextView from 'components/TextView';
import dayjs from 'dayjs';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EventDetail: React.FC<any> = ({ route, navigation }) => {
  const data = route?.params?.data;
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[
          styles.container,
          { paddingBottom: insets.bottom > 0 ? insets.bottom + 10 : 10 },
        ]}
      >
        <View style={styles.relative}>
          <FastImage
            style={styles.image}
            source={data.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.7)']}
            locations={[0, 0.4, 1]}
            style={styles.gradient}
          />
          <View
            style={[
              styles.content,
              { paddingTop: insets.top > 0 ? insets.top + 10 : 10 },
            ]}
          >
            <View style={styles.columnGap}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <ArrowLeft size={34} color="#fff" />
              </TouchableOpacity>
              <TextView
                fontWeight={'600'}
                fontSize={32}
                style={{ width: '70%' }}
              >
                {data.title}
              </TextView>
            </View>
            <View style={styles.rowSpaceBetween}>
              <View style={styles.price}>
                <TextView fontSize={14} fontWeight={'600'} color="#fff">
                  {data.price.toLocaleString('de-DE')}₮
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
                <FastImage
                  source={images.pro4}
                  style={[styles.profile, { marginLeft: -8 }]}
                  resizeMode="cover"
                />
                <FastImage
                  source={images.pro5}
                  style={[styles.profile, { marginLeft: -8 }]}
                  resizeMode="cover"
                />
                <View
                  style={[styles.profile, styles.center, { marginLeft: -8 }]}
                >
                  <TextView fontWeight={'600'} fontSize={12}>
                    16+
                  </TextView>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.box}>
              <Clock />
              <TextView fontSize={14} fontWeight={'600'}>
                {dayjs(data.startDate).format('DD MMM')} -{' '}
                {dayjs(data.endDate).format('DD MMM')}
              </TextView>
            </View>
            <View style={styles.box}>
              <Location />
              <TextView fontSize={14} fontWeight={'600'}>
                {data.location}
              </TextView>
            </View>
          </View>
          <TextView fontSize={14} justify>
            {data.description}
          </TextView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { borderWidth: 1, borderColor: '#0077FF' }]}
          >
            <TextView fontWeight={'600'} color="#0077FF">
              No / Not going
            </TextView>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#0077FF' }]}
          >
            <TextView fontWeight={'600'}>Yes / Going</TextView>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EventDetail;

const styles = StyleSheet.create({
  container: { flex: 1 },
  relative: { position: 'relative' },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 15,
  },
  image: {
    width: WIDTH,
    height: HEIGHT * 0.55,
  },
  profile: { width: 32, height: 32, borderRadius: 32 },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0077FF',
  },
  row: { flexDirection: 'row', gap: 8 },
  box: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#FFFFFF80',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  section: {
    marginTop: 10,
    gap: 25,
    paddingHorizontal: 15,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  price: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#0077FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT * 0.55,
    paddingHorizontal: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  columnGap: {
    gap: 32,
  },
});
