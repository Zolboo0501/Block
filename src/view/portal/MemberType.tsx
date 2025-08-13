/* eslint-disable react-native/no-inline-styles */
import images from '@images';
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const MemberType = () => {
  const data = [
    {
      image: images.member,
      name: 'PLATINUM',
      price: '‍4 years/$2,000',
    },
    {
      image: images.member2,
      name: 'LIFETIME',
      price: '‍∞ / $5,000',
    },
    {
      image: images.member3,
      name: 'ANNUAL',
      price: '‍1 year/ $1,000',
    },
  ];

  return (
    <View style={styles.container}>
      <TextView fontSize={14} color="#DEDEDE">
        MEMBERSHIP TYPE
      </TextView>
      <View style={styles.typeContainer}>
        {data.map((item: any, index: number) => (
          <View style={styles.columnGap} key={index}>
            <FastImage source={item.image} style={styles.image} />
            <TextView
              fontFamily="General Sans"
              fontWeight={'500'}
              fontSize={14}
            >
              {item.name}
            </TextView>
            <TextView
              fontFamily="General Sans"
              fontWeight={'500'}
              fontSize={14}
              color="#DEDEDE"
            >
              {item.price}
            </TextView>
          </View>
        ))}
      </View>
      <View style={styles.textContainer}>
        <TextView
          fontFamily="General Sans"
          fontWeight={'500'}
          fontSize={14}
          color="#444444"
        >
          For more information on Membership types please click 
        </TextView>
        <TouchableOpacity>
          <TextView
            style={{ textDecorationLine: 'underline' }}
            fontFamily="General Sans"
            fontSize={14}
            color="#fff"
          >
            here.
          </TextView>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MemberType;

const styles = StyleSheet.create({
  container: { flexDirection: 'column', gap: 14 },
  typeContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  columnGap: {
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: 61,
    height: 61,
  },
});
