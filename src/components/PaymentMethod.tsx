/* eslint-disable react-native/no-inline-styles */
import BottomSheet from '@gorhom/bottom-sheet';
import { Close } from '@icons';
import { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createCustomBackdrop } from './BottomSheetCustomBackdrop';
import TextView from './TextView';
import SuccessView from 'view/payment/SuccessView';

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
