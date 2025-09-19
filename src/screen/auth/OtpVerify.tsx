/* eslint-disable react-native/no-inline-styles */
import { useMutation } from '@apollo/client/react';
import { ClIENTPORTAL_ID } from '@constants';
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { setNavigation } from '@utils';
import Button from 'components/Button';
import KeyboardContainer from 'components/KeyboardContainer';
import OTPInput from 'components/OTPInput';
import TextView from 'components/TextView';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useRegister from 'hooks/useRegister';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const OtpVerify: React.FC<any> = ({ navigation, route }) => {
  const type = route.params?.type || '';
  const number = route?.params?.number || '';

  const [code, setCode] = useState<any>(['']);
  const alert = useAlert();
  const { onChange, userId } = useRegister();
  const [disable, setDisable] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [time, setTime] = useState(120);
  const [isStop, setIsStop] = useState(false);

  const { phone } = useRegister();

  const [forget] = useMutation(userQL.clientPortalForgotPassword, {
    onCompleted() {
      setTime(120);
      setIsStop(false);
      setCode(['']);
      alert.onSuccess('A 4-digit verification code has been sent.');
    },
    onError(error) {
      alert.onError(error.message);
    },
  });

  const [loginWithPhone] = useMutation(userQL.clientPortalLoginWithPhone, {
    onCompleted() {
      setTime(120);
      setIsStop(false);
      setCode(['']);
      alert.onSuccess('A 4-digit verification code has been sent.');
    },
    onError(error) {
      alert.onError(error.message);
    },
  });

  const [verifyOTPMutation, { loading }] = useMutation(
    userQL.clientPortalVerifyOTP,
    {
      onCompleted: () => {
        navigation.navigate('Payment', { type: 'register' });
      },
      onError: err => {
        setErrorMessage(true);
        alert.onError(err.message);
      },
    },
  );

  useLayoutEffect(() => {
    setNavigation({ navigation, title: ' ' });
  }, [navigation]);

  useEffect(() => {
    const isOtpComplete = code?.every(
      (item: any) => item?.toString().trim() !== '',
    );
    setDisable(!isOtpComplete || code.length !== 4);
  }, [code]);

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

  const reSendOTP = () => {
    if (type === 'register') {
      loginWithPhone({
        variables: {
          clientPortalId: ClIENTPORTAL_ID,
          phone,
        },
      });
    }
    return forget({
      variables: {
        clientPortalId: ClIENTPORTAL_ID,
        phone: number,
      },
    });
  };

  const onSave = () => {
    if (type === 'register') {
      onChange('otp', code);
      return verifyOTPMutation({
        variables: {
          userId,
          phoneOtp: code.join(''),
        },
      });
    }
    navigation.navigate('Password', { code: code?.join(''), number });
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
              value={code}
              onChange={newValue => {
                const filteredCode = newValue.filter(
                  (item: any) => item !== '' && item !== undefined,
                );

                setCode(filteredCode);
              }}
              disabled={false}
              inputError={errorMessage}
            />
            <Button
              title="VERIFY"
              titleWeight={'500'}
              onPress={() => onSave()}
              disabled={disable}
              loading={loading}
            />
            <View style={styles.reSend}>
              <TextView fontSize={14} center>
                Didn’t receive code?
              </TextView>

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
