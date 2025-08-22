import FastImage from '@d11/react-native-fast-image';
import images from '@images';
import { setNavigation } from '@utils';
import Button from 'components/Button';
import Input from 'components/Input';
import TextView from 'components/TextView';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const SignIn: React.FC<any> = ({ navigation }) => {
  const [disable, setDisable] = useState(true);

  const [user, setUser] = useState({
    phone: '',
    password: '',
  });

  useLayoutEffect(() => {
    setNavigation({ navigation, title: ' ' });
  }, [navigation]);

  useEffect(() => {
    if (user.password.length > 0) {
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
    navigation.navigate('OtpVerify');
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
        <View style={styles.inputContainer}>
          <Input
            label="PASSWORD"
            value={user.password}
            onChangeText={(text: string) => onChange(text, 'password')}
            placeholder="Enter your password"
            secureTextEntry
            keyboardType="default"
          />
          <TouchableOpacity style={styles.end}>
            <TextView fontSize={14} fontFamily="General Sans">
              Forgot password ?
            </TextView>
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <Button
              title="SIGN IN"
              titleWeight={'500'}
              onPress={() => onSave()}
              disabled={disable}
            />
            <Button
              title="BECOME A MEMBER"
              color="#111111"
              titleWeight={'500'}
              border
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: { flex: 1, paddingHorizontal: 15 },
  end: {
    alignItems: 'flex-end',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
