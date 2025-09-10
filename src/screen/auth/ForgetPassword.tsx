import { useMutation } from '@apollo/client/react';
import { ClIENTPORTAL_ID } from '@constants';
import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { setNavigation } from '@utils';
import Button from 'components/Button';
import Container from 'components/Container';
import Input from 'components/Input';
import KeyboardContainer from 'components/KeyboardContainer';
import TextView from 'components/TextView';
import userQL from 'graph/userQL';
import useAlert from 'hooks/useAlert';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const ForgetPassword: React.FC<any> = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [disable, setDisable] = useState(true);
  const alert = useAlert();
  const [forget, { loading }] = useMutation(userQL.clientPortalForgotPassword, {
    onCompleted() {
      navigation.navigate('OtpVerify', { number: phone });
    },
    onError(error) {
      alert.onError(error.message);
    },
  });

  useLayoutEffect(() => {
    setNavigation({ navigation, title: ' ' });
  }, [navigation]);

  useEffect(() => {
    if (phone.length === 8) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [phone]);

  const onSave = () => {
    forget({
      variables: {
        clientPortalId: ClIENTPORTAL_ID,
        phone,
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
            <TextView fontSize={14} center>
              FORGOT PASSWORD
            </TextView>
            <TextView center>
              Please enter your phone number to receive an OTP code for password
              reset
            </TextView>
            <Input
              label="PHONE"
              value={phone}
              onChangeText={(text: string) => setPhone(text)}
              placeholder="Enter your phone"
              isPhone={true}
              maxLength={8}
              keyboardType="phone-pad"
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
              <Button
                title="BACK"
                color="#111111"
                titleSize={14}
                titleWeight={'500'}
                border
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </View>
      </KeyboardContainer>
    </Container>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    gap: 20,
    marginTop: 100,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  inputContainer: {
    flex: 1,
    gap: 16,
  },
  image: {
    width: 240,
    height: 240,
  },
});
