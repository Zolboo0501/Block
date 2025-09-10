/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import Button from 'components/Button';
import TextView from 'components/TextView';
import { StyleSheet, View } from 'react-native';

const ErrorView: React.FC<any> = ({ onClose }) => {
  const onHandlePress = () => {
    onClose();
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
            Transaction Unsuccessful
          </TextView>
          <TextView fontSize={14} center>
            We were unable to process your payment. Please check your payment
            details and try again.
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

export default ErrorView;

const styles = StyleSheet.create({
  status: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },

  statusImage: { width: 178, height: 178 },
});
