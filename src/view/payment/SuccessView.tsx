/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { useNavigation } from '@react-navigation/native';
import Button from 'components/Button';
import TextView from 'components/TextView';
import { StyleSheet, View } from 'react-native';

const SuccessView: React.FC<any> = ({ onClose }) => {
  const navigation = useNavigation<any>();

  const onHandlePress = () => {
    onClose();
    setTimeout(() => {
      navigation.navigate('Biometric');
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

const styles = StyleSheet.create({
  status: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },

  statusImage: { width: 178, height: 178 },
});
export default SuccessView;
