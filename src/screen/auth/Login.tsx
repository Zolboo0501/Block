/* eslint-disable react-native/no-inline-styles */
import { useMutation } from '@apollo/client/react';
import { ClIENTPORTAL_ID } from '@constants';
import FastImage from '@d11/react-native-fast-image';
import { Face } from '@icons';
import images from '@images';
import { keys } from '@storage';
import { biometrics } from '@utils';
import Button from 'components/Button';
import TextView from 'components/TextView';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useRegister from 'hooks/useRegister';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BiometryTypes } from 'react-native-biometrics';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';

const Login: React.FC<any> = ({ navigation }) => {
  const [latestAccount, __] = useMMKVObject<{
    phone: string;
    password: string;
  }>(keys.latestAccount);
  const [confirmFaceId, _] = useMMKVBoolean(keys.confirmFaceId);
  const alert = useAlert();
  const { signedIn } = useRegister();

  const [loginMutation] = useMutation(userQL.clientPortalLogin, {
    onCompleted() {
      signedIn();
    },
    onError(error) {
      alert.onError(error.message);
      console.log(error.message);
    },
  });

  const initialBiometrics = async () => {
    const { available, biometryType } = await biometrics.isSensorAvailable();

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
    const payload = `${latestAccount?.phone}__${timestamp}`;
    biometrics
      .createSignature({
        promptMessage: 'Biometric setup',
        payload: payload,
      })
      .then((resultObject: any) => {
        const { success } = resultObject;
        if (success) {
          console.log({
            login: latestAccount?.phone,
            password: latestAccount?.password,
            clientPortalId: ClIENTPORTAL_ID,
          });
          loginMutation({
            variables: {
              login: latestAccount?.phone,
              password: latestAccount?.password,
              clientPortalId: ClIENTPORTAL_ID,
            },
          });
        } else {
          alert.onError('Biometric authentication failed.');
        }
      })
      .catch(err => {
        console.log(err);
        alert.onError('Biometric authentication is not available.');
      });
  };

  const onSignIn = () => {
    if (confirmFaceId) {
      return initialBiometrics();
    }
    navigation.navigate('SignIn');
  };

  const onRegister = () => {
    navigation.navigate('ValidationForm');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.space}>
        <View style={styles.logo}>
          <FastImage
            source={images.vaultLogo}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="SIGN IN"
            titleSize={14}
            titleWeight={'500'}
            onPress={() => onSignIn()}
            icon={
              latestAccount?.password &&
              latestAccount?.phone &&
              confirmFaceId ? (
                <Face />
              ) : undefined
            }
          />
          <Button
            title="BECOME A MEMBER"
            titleSize={14}
            titleWeight={'500'}
            onPress={() => onRegister()}
            border
            color="#111111"
          />
          {latestAccount?.password && latestAccount?.phone && confirmFaceId && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignIn');
              }}
              style={{ marginTop: 15 }}
            >
              <TextView fontSize={14} fontWeight={'500'} center>
                USE PASSWORD
              </TextView>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { flex: 1, paddingHorizontal: 15 },
  image: {
    marginTop: '30%',
    width: 240,
    height: 240,
  },
  logo: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    gap: 20,
  },
});
