/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import BottomSheet from '@gorhom/bottom-sheet';
import { Close } from '@icons';
import images from '@images';
import { useNavigation } from '@react-navigation/native';
import { setNavigation } from '@utils';
import { createCustomBackdrop } from 'components/BottomSheetCustomBackdrop';
import Button from 'components/Button';
import GroupCheckbox from 'components/GroupCheckbox';
import TextView from 'components/TextView';
import useRegister from 'hooks/useRegister';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

const PaymentMethod: React.FC<any> = ({ ref, onChange }) => {
  const safeAreaInsets = useSafeAreaInsets();
  const topInset = safeAreaInsets.top - 24;

  const onClose = useCallback(() => {
    ref.current?.close();
  }, [ref]);

  return (
    <BottomSheet
      ref={ref}
      onChange={onChange}
      snapPoints={['90%']}
      topInset={topInset}
      index={-1}
      enablePanDownToClose
      enableContentPanningGesture={true}
      keyboardBlurBehavior="restore"
      enableDynamicSizing={false}
      handleIndicatorStyle={{ width: 43 }}
      backgroundStyle={{ backgroundColor: '#272727', borderRadius: 20 }}
      backdropComponent={
        ref.current?.index !== -1 ? createCustomBackdrop(onClose) : undefined
      }
    >
      <View
        style={[
          styles.contentContainer,
          {
            paddingTop: 10,
            paddingBottom:
              safeAreaInsets.bottom > 0 ? safeAreaInsets.bottom : 15,
          },
        ]}
      >
        <TextView color="#DEDEDE" center>
          Payment Confirmation
        </TextView>
        <TouchableOpacity style={styles.close} onPress={() => onClose()}>
          <Close />
        </TouchableOpacity>
        <SuccessView onClose={onClose} />
      </View>
    </BottomSheet>
  );
};

const SuccessView: React.FC<any> = ({ onClose }) => {
  const navigation = useNavigation<any>();
  const onHandlePress = () => {
    onClose();
    setTimeout(() => {
      navigation.navigate('Profile');
    }, 500);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.status}>
        <FastImage
          source={images.success}
          resizeMode="contain"
          style={styles.statusImage}
        />
        <View style={{ gap: 14, width: '90%' }}>
          <TextView fontWeight={'600'} fontSize={20} center>
            Payment Confirmed
          </TextView>
          <TextView fontSize={14} center>
            Your payment has been successfully processed. You can now enjoy your
            membership benefits.
          </TextView>
        </View>
      </View>
      <Button
        title="Go to profile"
        titleWeight={'500'}
        titleSize={14}
        border
        color="#272727"
        onPress={() => onHandlePress()}
        borderColor="#DEDEDE"
      />
    </View>
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
  status: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  space: { flex: 1, paddingVertical: 10, gap: 32 },
  payment: { paddingHorizontal: 15, gap: 32 },
  method: {
    paddingHorizontal: 15,
    gap: 16,
  },
  statusImage: { width: 178, height: 178 },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    position: 'relative',
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
  close: {
    position: 'absolute',
    right: 15,
    top: 0,
    padding: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    width: '100%',
  },
});
