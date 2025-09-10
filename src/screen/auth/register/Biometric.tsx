/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { keys } from '@storage';
import Button from 'components/Button';
import TextView from 'components/TextView';
import useAlert from 'hooks/useAlert';
import useRegister from 'hooks/useRegister';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';

const Biometric: React.FC<any> = ({ navigation }) => {
  const { userId } = useRegister();
  const alert = useAlert();
  const biometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const { phone, password, signedIn } = useRegister();
  const [_, setConfirmFaceId] = useMMKVBoolean(keys.confirmFaceId);
  const [__, setLatestAccount] = useMMKVObject(keys.latestAccount);

  const initialBiometrics = async () => {
    console.log('sda');
    const { available, biometryType } = await biometrics.isSensorAvailable();
    console.log(available, 'hh');
    console.log(biometryType, 'biometryType');
    if (biometryType === BiometryTypes.FaceID && available) {
      recognition();
    }
    if (biometryType === BiometryTypes.Biometrics && available) {
      recognition();
    }
    if (biometryType === BiometryTypes.TouchID && available) {
      recognition();
    }
  };

  const recognition = () => {
    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    const payload = `${userId}__${timestamp}`;
    biometrics
      .createSignature({
        promptMessage: 'Biometric Setup',
        payload: payload,
      })
      .then((resultObject: any) => {
        const { success } = resultObject;
        if (success) {
          const userInfo = {
            phone,
            password,
          };
          setLatestAccount(userInfo);
          setConfirmFaceId(true);
          signedIn();
        } else {
          alert.onError('Тохиргоо хийхэд алдаа гарлаа.');
        }
      })
      .catch(err => {
        console.log(err);
        alert.onError('Баталгаажуулалт хийхэд алдаа гарлаа.');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.space}>
        <FastImage
          source={images.biometric}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.text}>
          <TextView fontSize={20} fontWeight={'600'} center>
            Biometric Setup
          </TextView>
          <TextView fontSize={14} fontWeight={'500'} center color="#FFFFFF66">
            Secure your account with fingerprint or face recognition. Log in
            quickly without entering your password.
          </TextView>
        </View>
        <View style={{ gap: 20 }}>
          <Button
            title="CONTINUE"
            titleWeight={'500'}
            titleSize={14}
            onPress={() => initialBiometrics()}
          />

          <Button
            title={'SET UP LATER'}
            titleWeight={'500'}
            titleSize={14}
            border={true}
            color="#111111"
            onPress={() => {
              signedIn();
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Biometric;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    gap: 20,
    marginTop: '20%',
    flex: 1,
  },
  image: { width: 160, height: 160, alignSelf: 'center', marginTop: '20%' },
});
