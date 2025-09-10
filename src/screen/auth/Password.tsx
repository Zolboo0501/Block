import { useMutation } from '@apollo/client/react';
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { setNavigation } from '@utils';
import Button from 'components/Button';
import Container from 'components/Container';
import Input from 'components/Input';
import KeyboardContainer from 'components/KeyboardContainer';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const Password: React.FC<any> = ({ navigation, route }) => {
  const code = route.params?.code;
  const number = route.params?.number;
  const [pass, setPass] = useState({ password: '', rePassword: '' });
  const [disable, setDisable] = useState(true);
  const alert = useAlert();

  const [reset, { loading }] = useMutation(userQL.clienPortalResetPassword, {
    onCompleted() {
      alert.onSuccess('Your password has been changed successfully.');
      navigation.navigate('Login');
    },
    onError(error) {
      console.log(error.message);
      alert.onError(error.message);
    },
  });

  useLayoutEffect(() => {
    setNavigation({ navigation, title: ' ' });
  }, [navigation]);

  useEffect(() => {
    if (pass.password && pass.rePassword) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [pass]);

  const onChange = (text: string, type: string) => {
    if (type === 'pass') {
      setPass(prev => ({ ...prev, password: text }));
    }
    if (type === 'rePass') {
      setPass(prev => ({ ...prev, rePassword: text }));
    }
  };

  const onSave = () => {
    if (pass.password !== pass.rePassword) {
      return alert.onError('Password and Confirm Password do not match.');
    }
    console.log({
      phone: number,
      password: pass.password,
      code,
    });
    reset({
      variables: {
        phone: number,
        password: pass.password,
        code,
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
              label="PASSWORD"
              value={pass.password}
              onChangeText={(text: string) => onChange(text, 'pass')}
              placeholder="Enter your password"
              secureTextEntry
              keyboardType="default"
            />
            <Input
              label="CONFIRM PASSWORD"
              value={pass.rePassword}
              onChangeText={(text: string) => onChange(text, 'rePass')}
              placeholder="Enter your password"
              secureTextEntry
              keyboardType="default"
            />
            <View style={styles.buttonContainer}>
              <Button
                title="CONTINUE"
                titleSize={14}
                titleWeight={'500'}
                onPress={() => onSave()}
                loading={loading}
                disabled={disable}
              />
            </View>
          </View>
        </View>
      </KeyboardContainer>
    </Container>
  );
};

export default Password;

const styles = StyleSheet.create({
  container: { flex: 1 },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    gap: 20,
    marginTop: 100,
  },
  image: {
    width: 240,
    height: 240,
  },
  inputContainer: {
    flex: 1,
    gap: 16,
  },
});
