/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { WIDTH } from '@utils';
import GroupCheckbox from 'components/GroupCheckbox';
import TextView from 'components/TextView';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const Membership: React.FC<any> = () => {
  const data = [
    {
      image: images.member,
      name: 'PLATINUM',
      price: '‍4 years/$2,000',
      key: 'PLATINUM',
    },
    {
      image: images.member2,
      name: 'LIFETIME',
      price: '‍∞ / $5,000',
      key: 'LIFETIME',
    },
    {
      image: images.member3,
      name: 'ANNUAL',
      price: '‍1 year/ $1,000',
      key: 'ANNUAL',
    },
  ];

  const [selectedType, setSelectedType] = useState<string>('');

  const onChange = (value: string) => {
    setSelectedType(value);
  };

  return (
    <View style={styles.columnGap}>
      <TextView
        fontSize={14}
        style={{ paddingHorizontal: 15 }}
        color="#DEDEDE"
        fontFamily="Optician Sans"
      >
        Select Membership Plan
      </TextView>
      <View style={styles.membership}>
        {data.map((item: any, index: number) => (
          <TouchableOpacity
            style={styles.rowSpaceBetween}
            key={index}
            onPress={() => {
              onChange(item.key);
            }}
          >
            <View style={{ flex: 1 }}>
              <GroupCheckbox
                item={item}
                value={selectedType}
                label={{ label: item.name, subLabel: item.price }}
              />
            </View>
            <FastImage
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
      <TextView
        fontSize={14}
        fontWeight={'500'}
        color="#444444"
        style={{ paddingHorizontal: 15 }}
      >
        For more information on Membership types please{' '}
        <TouchableOpacity>
          <TextView
            fontSize={14}
            fontWeight={'500'}
            color="#fff"
            style={{ textDecorationLine: 'underline' }}
          >
            click here.
          </TextView>
        </TouchableOpacity>
      </TextView>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  columnGap: {
    gap: 14,
  },
  membership: { gap: 16, paddingHorizontal: 39, marginTop: 15 },

  line: {
    borderBottomWidth: 1,
    width: WIDTH,
    borderColor: '#DEDEDE',
    marginTop: 10,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  image: {
    width: 60,
    height: 60,
  },
});
export default Membership;
