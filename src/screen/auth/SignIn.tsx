import { useMutation } from '@apollo/client/react';
import { ClIENTPORTAL_ID } from '@constants';
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { keys } from '@storage';
import { setNavigation } from '@utils';
import Button from 'components/Button';
import Container from 'components/Container';
import Input from 'components/Input';
import KeyboardContainer from 'components/KeyboardContainer';
import TextView from 'components/TextView';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import useRegister from 'hooks/useRegister';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  useMMKVBoolean,
  useMMKVObject,
  useMMKVString,
} from 'react-native-mmkv';

const SignIn: React.FC<any> = ({ navigation }) => {
  const alert = useAlert();
  const [disable, setDisable] = useState(true);
  const { signedIn } = useRegister();
  const [confirmFaceId] = useMMKVBoolean(keys.confirmFaceId);
  const [_, setLatestAccount] = useMMKVObject(keys.latestAccount);
  const [deviceToken] = useMMKVString(keys.deviceToken);
  const [user, setUser] = useState({
    phone: '',
    password: '',
  });

  const [login, { loading: loginLoading }] = useMutation(
    userQL.clientPortalLogin,
    {
      onCompleted() {
        setLatestAccount(user);
        if (!confirmFaceId) {
          return navigation.navigate('Biometric');
        }
        signedIn();
      },
      onError(err) {
        alert.onError(err.message);
      },
    },
  );

  useLayoutEffect(() => {
    setNavigation({ navigation, title: ' ' });
  }, [navigation]);

  useEffect(() => {
    if (user.password.length > 0 && user.phone.length === 8) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);

  const onChange = (text: string, type: string) => {
    if (type === 'phone') {
      setUser(prev => ({ ...prev, phone: text }));
    }
    if (type === 'password') {
      setUser(prev => ({ ...prev, password: text }));
    }
  };

  const onSave = () => {
    login({
      variables: {
        login: user.phone,
        password: user.password,
        clientPortalId: ClIENTPORTAL_ID,
        deviceToken,
      },
    });
  };

  return (
    <Container>
      <KeyboardContainer>
        <View style={styles.container}>
          <View style={styles.logo}>
            <FastImage
              source={images.vaultLogo}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              label="PHONE"
              value={user.phone}
              onChangeText={(text: string) => onChange(text, 'phone')}
              placeholder="Enter your phone"
              isPhone={true}
              maxLength={8}
              keyboardType="phone-pad"
            />
            <Input
              label="PASSWORD"
              value={user.password}
              onChangeText={(text: string) => onChange(text, 'password')}
              placeholder="Enter your password"
              secureTextEntry
              keyboardType="default"
            />
            <TouchableOpacity
              style={styles.end}
              onPress={() => navigation.navigate('ForgetPassword')}
            >
              <TextView fontSize={14} fontFamily="General Sans">
                Forgot password ?
              </TextView>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <Button
                title="SIGN IN"
                titleSize={14}
                loading={loginLoading}
                titleWeight={'500'}
                onPress={() => onSave()}
                disabled={disable}
              />
              <Button
                title="BECOME A MEMBER"
                color="#111111"
                titleSize={14}
                titleWeight={'500'}
                border
                onPress={() => navigation.navigate('ValidationForm')}
              />
            </View>
          </View>
        </View>
      </KeyboardContainer>
    </Container>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1 },

  end: {
    alignItems: 'flex-end',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 240,
    height: 240,
  },
  inputContainer: {
    flex: 1,
    gap: 16,
  },
  buttonContainer: {
    gap: 20,
    marginTop: 15,
  },
});
