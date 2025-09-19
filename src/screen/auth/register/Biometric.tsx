/* eslint-disable react-native/no-inline-styles */
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { keys } from '@storage';
import Button from 'components/Button';
import TextView from 'components/TextView';
import useRegister from 'hooks/useRegister';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';

const Biometric: React.FC<any> = ({ navigation, route }) => {
  const type = route?.params?.type;
  const biometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  const { phone, password, signedIn } = useRegister();
  const [_, setConfirmFaceId] = useMMKVBoolean(keys.confirmFaceId);
  const [__, setLatestAccount] = useMMKVObject(keys.latestAccount);

  const initialBiometrics = async () => {
    const { publicKey } = await biometrics.createKeys();
    console.log(publicKey);
    if (type === 'register') {
      const userInfo = {
        phone,
        password,
      };
      setLatestAccount(userInfo);
      setConfirmFaceId(true);
      navigation.navigate('SignIn');
    }

    setConfirmFaceId(true);
    return signedIn();
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
