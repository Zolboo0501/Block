/* eslint-disable react-native/no-inline-styles */
import { Logout, Menu } from '@icons';
import images from '@images';
import { WIDTH } from '@utils';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import BenefitsDetail from 'view/portal/BenefitsDetail';
import MemberType from 'view/portal/MemberType';
import Title from 'view/portal/Title';

const Benefits: React.FC<any> = ({ navigation }) => {
  const onHandlePress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <FastImage
          source={images.vaultLogo}
          style={styles.image}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => onHandlePress()}
        >
          <Menu />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signinContainer}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Logout />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.info}>
          <Title />
          <MemberType />
          <BenefitsDetail />
        </View>
        <View style={styles.line} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Benefits;

const styles = StyleSheet.create({
  container: { flex: 1 },
  signinContainer: {
    width: 44,
    height: 44,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
    position: 'absolute',
    right: 25,
    top: 10,
  },
  backContainer: {
    width: 44,
    height: 44,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
    position: 'absolute',
    top: 10,
    left: 25,
  },
  image: {
    flex: 1,
  },
  info: {
    flexDirection: 'column',
    gap: 24,
    marginTop: 25,
    paddingHorizontal: 15,
  },
  line: { borderBottomWidth: 1, borderColor: 'white', marginTop: 20 },
  imageContainer: {
    position: 'relative',
    width: WIDTH,
    height: '30%',
  },
});
