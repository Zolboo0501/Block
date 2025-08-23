/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { setNavigation } from '@utils';
import Button from 'components/Button';
import KeyboardContainer from 'components/KeyboardContainer';
import OTPInput from 'components/OTPInput';
import TextView from 'components/TextView';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const OtpVerify: React.FC<any> = ({ navigation, route }) => {
  const { type } = route.params || {};

  const [otp, setOtp] = useState<any>([]);
  const [disable, setDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [time, setTime] = useState(120);
  const [isStop, setIsStop] = useState(false);

  useLayoutEffect(() => {
    setNavigation({ navigation, title: ' ' });
  }, [navigation]);

  useEffect(() => {
    const isOtpComplete = otp?.every(
      (item: any) => item?.toString().trim() !== '',
    );
    setDisable(!isOtpComplete || otp.length !== 4);
  }, [otp]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(prevState => prevState - 1);
      } else {
        clearInterval(interval);
        setIsStop(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const onChange = (newValue: any) => {
    const filteredCode = newValue.filter(
      (item: any) => item !== '' && item !== undefined,
    );

    setOtp(filteredCode);
  };

  const reSendOTP = () => {
    setTime(120);
    setIsStop(false);
  };

  const onSave = () => {
    if (type === 'register') {
      navigation.navigate('Payment');
    }
  };

  return (
    <KeyboardContainer>
      <SafeAreaView style={styles.container}>
        <View style={styles.space}>
          <View style={styles.logo}>
            <FastImage
              source={images.logo45}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextView fontSize={14} center>
              VERIFICATION CODE
            </TextView>
            <TextView center>
              We have sent the verification code to your phone number
            </TextView>
            <OTPInput
              length={4}
              value={otp}
              onChange={onChange}
              disabled={false}
              inputError={errorMessage}
            />
            <Button
              title="VERIFY"
              titleWeight={'500'}
              onPress={() => onSave()}
              disabled={disable}
            />
            <View style={styles.reSend}>
              <TouchableOpacity>
                <TextView fontSize={14} center>
                  Didn’t receive code?
                </TextView>
              </TouchableOpacity>
              <TextView fontSize={18} center>
                {String(Math.floor(time / 60)).padStart(2, '0')}:
                {String(time % 60).padStart(2, '0')}
              </TextView>
              {isStop && (
                <TouchableOpacity onPress={() => reSendOTP()}>
                  <TextView
                    fontSize={14}
                    center
                    style={{ textDecorationLine: 'underline' }}
                  >
                    Resend
                  </TextView>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardContainer>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { flex: 1, paddingHorizontal: 15 },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  image: {
    width: 240,
    height: 240,
  },
  reSend: {
    marginTop: 24,
    gap: 16,
  },
  inputContainer: {
    flex: 1,
    gap: 16,
  },
});
