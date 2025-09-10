/* eslint-disable react-native/no-inline-styles */
import React, { forwardRef, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TextView from './TextView';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Close } from '@icons';
import SuccessView from 'view/payment/SuccessView';

const PaymentMethod = forwardRef((props: any, ref: any) => {
  const safeAreaInsets = useSafeAreaInsets();
  const topInset = safeAreaInsets.top - 24;

  const onClose = useCallback(() => {
    (ref as any)?.current?.close();
  }, [ref]);

  return (
    <BottomSheet
      ref={ref}
      onChange={props?.onChange}
      snapPoints={['90%']}
      topInset={topInset}
      index={-1}
      enablePanDownToClose
      enableContentPanningGesture
      keyboardBlurBehavior="restore"
      enableDynamicSizing={false}
      handleIndicatorStyle={{ width: 43 }}
      backgroundStyle={{ backgroundColor: '#272727', borderRadius: 20 }}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          paddingBottom: safeAreaInsets.bottom > 0 ? safeAreaInsets.bottom : 15,
          paddingHorizontal: 15,
        }}
      >
        <TextView color="#DEDEDE" center>
          Payment Confirmation
        </TextView>
        <TouchableOpacity onPress={onClose} style={styles.close}>
          <Close />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <SuccessView onClose={onClose} />
        </View>
      </View>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    right: 15,
    top: 0,
    padding: 10,
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
    position: 'relative',
  },
});
export default PaymentMethod;
