import FastImage from '@d11/react-native-fast-image';
import { Face } from '@icons';
import images from '@images';
import { keys } from '@storage';
import Button from 'components/Button';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';

const Login: React.FC<any> = ({ navigation }) => {
  const [latestAccount] = useMMKVObject(keys.latestAccount);

  const onSignIn = () => {
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
            icon={latestAccount ? <Face /> : undefined}
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
