/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import BottomSheet from '@gorhom/bottom-sheet';
import images from '@images';
import { setNavigation } from '@utils';
import GroupCheckbox from 'components/GroupCheckbox';
import PaymentMethod from 'components/PaymentMethod';
import TextView from 'components/TextView';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const data = [
  {
    image: images.member,
    name: 'PLATINUM',
    price: '‍$2,000',
    key: 'PLATINUM',
    duration: '4 years',
  },
  {
    image: images.member2,
    name: 'LIFETIME',
    price: '‍$5,000',
    key: 'LIFETIME',
    duration: 'LIFETIME',
  },
  {
    image: images.member3,
    name: 'ANNUAL',
    price: '$1000',
    key: 'ANNUAL',
    duration: '1 year',
  },
];

const ReNew: React.FC<any> = ({ navigation }) => {
  const [membership, setMembership] = useState<any>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Vault Membership Form' });
  }, [navigation]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetRef.current?.close();
    }
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.space, { marginTop: 15 }]}>
            <View style={{ paddingHorizontal: 15 }}>
              <TextView fontFamily="NewYork" fontSize={32}>
                RENEW
              </TextView>
              <TextView fontFamily="NewYork" fontSize={32}>
                MEMBERSHIP
              </TextView>
            </View>
            <View style={styles.column}>
              <TextView
                fontSize={14}
                color="#DEDEDE"
                fontFamily="Optician Sans"
              >
                Your Selected Membership Plan
              </TextView>
              {data.map((item: any, index: number) => (
                <TouchableOpacity
                  style={[styles.rowSpaceBetween, { paddingHorizontal: 10 }]}
                  key={index}
                  onPress={() => {
                    setMembership(item);
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <GroupCheckbox
                      item={item}
                      value={membership}
                      label={{
                        label: item.name,
                        subLabel: `${item.price}/${item.duration}`,
                      }}
                    />
                  </View>
                  <FastImage
                    source={item.image}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              ))}
              <TextView fontSize={14} fontWeight={'500'} color="#444444">
                For more information on Membership types please{' '}
                <TouchableOpacity
                  onPress={() => navigation.navigate('MembershipDetail')}
                >
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
            </View>
            <View style={styles.line} />
            <View style={styles.column}>
              <View style={styles.rowSpaceBetween}>
                <TextView fontSize={14} fontFamily="Optician Sans">
                  Membership type:
                </TextView>
                <TextView fontSize={14}>{membership?.name}</TextView>
              </View>
              <View style={styles.rowSpaceBetween}>
                <TextView fontSize={14} fontFamily="Optician Sans">
                  Price:
                </TextView>
                <TextView fontSize={14}>{membership?.price}</TextView>
              </View>
              <View style={styles.rowSpaceBetween}>
                <TextView fontSize={14} fontFamily="Optician Sans">
                  Duration:
                </TextView>
                <TextView fontSize={14}>{membership?.duration}</TextView>
              </View>
              <TextView fontWeight={'500'} fontFamily="14">
                Our lifetime membership is designed to enhance your experience
                at our bar and to provide you with exclusive benefits and
                privileges that are not available to the general public.
              </TextView>
              <View style={styles.method}>
                <TextView fontFamily="Optician Sans" fontSize={14}>
                  Payment Method
                </TextView>
                <View style={styles.rowSpace}>
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => {
                      bottomSheetRef.current?.expand();
                    }}
                  >
                    <TextView>QPay</TextView>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <PaymentMethod ref={bottomSheetRef} onChange={handleSheetChanges} />
    </>
  );
};

export default ReNew;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { flex: 1, gap: 32 },
  column: { gap: 16, paddingHorizontal: 15 },
  image: {
    width: 60,
    height: 60,
  },
  method: {
    gap: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center',
  },
  box: {
    padding: 10,
  },
});
