/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import BottomSheet from '@gorhom/bottom-sheet';
import { setNavigation } from '@utils';
import GroupCheckbox from 'components/GroupCheckbox';
import PaymentMethod from 'components/PaymentMethod';
import TextView from 'components/TextView';
import useRegister from 'hooks/useRegister';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const Payment: React.FC<any> = ({ navigation }) => {
  const { membership } = useRegister();

  const bottomSheetRef = useRef<BottomSheet>(null);

  useLayoutEffect(() => {
    setNavigation({ navigation, title: 'Vault Membership Form' });
  }, [navigation]);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetRef.current?.close();
    }
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.space}>
          <View style={styles.payment}>
            <TextView fontSize={40} fontFamily="NewYork">
              PAYMENT
            </TextView>
            <View style={styles.member}>
              <TextView
                fontFamily="Optician Sans"
                fontSize={14}
                color="#DEDEDE"
              >
                Your Selected Membership Plan
              </TextView>
              <View style={styles.rowSpaceBetween}>
                <View style={{ flex: 1 }}>
                  <GroupCheckbox
                    item={membership}
                    value={membership}
                    label={{
                      label: membership.name,
                      subLabel: `${membership.price}/${membership.duration}`,
                    }}
                  />
                </View>
                <FastImage
                  source={membership.image}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <TextView
                fontSize={14}
                fontWeight={'500'}
                color="#444444"
                style={{ paddingHorizontal: 15 }}
              >
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
          </View>
          <View style={styles.line} />
          <View style={styles.memberDetail}>
            <Info label="Membership type:" value={membership.name} />
            <Info label="Price:" value={membership.price} />
            <Info label="Duration:" value={membership.duration} />
            <TextView fontSize={14} fontWeight={'500'} justify>
              Elevate your VAULT experience with the exclusive VAULT Platinum
              VISA Card by TransBank, designed for the elite member who values
              privacy, luxury, and unparalleled access.
            </TextView>
          </View>
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
      </SafeAreaView>
      <PaymentMethod ref={bottomSheetRef} onChange={handleSheetChanges} />
    </>
  );
};

const Info: React.FC<any> = ({ label, value }) => {
  return (
    <View style={styles.rowSpace}>
      <TextView fontFamily="Optician Sans" fontSize={14}>
        {label}
      </TextView>
      <TextView fontSize={14}>{value}</TextView>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: { flex: 1 },
  member: { gap: 16 },
  space: { flex: 1, paddingVertical: 10, gap: 32 },
  payment: { paddingHorizontal: 15, gap: 32 },
  method: {
    paddingHorizontal: 15,
    gap: 16,
  },
  box: {
    padding: 10,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
  memberDetail: {
    gap: 16,
    paddingHorizontal: 15,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    width: '100%',
  },
});
