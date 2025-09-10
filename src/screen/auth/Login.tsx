import { useMutation } from '@apollo/client/react';
import { ClIENTPORTAL_ID } from '@constants';
import FastImage from '@d11/react-native-fast-image';
import { Face } from '@icons';
import images from '@images';
import { keys } from '@storage';
import { biometrics } from '@utils';
import Button from 'components/Button';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useRegister from 'hooks/useRegister';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
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
        promptMessage: 'Тохируулах',
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
          // setConfirmFaceId(true);
          // setLoginFaceId(false);
          // return navigation.navigate('Main');
        } else {
          alert.onError('Тохиргоо хийхэд алдаа гарлаа.');
        }
      })
      .catch(err => {
        console.log(err);
        alert.onError('Баталгаажуулалт хийхэд алдаа гарлаа.');
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
