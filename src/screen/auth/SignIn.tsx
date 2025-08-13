import { Menu } from '@icons';
import TextView from 'components/TextView';
import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

const SignIn: React.FC<any> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.container, styles.space]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.goBack()}
        >
          <Menu />
        </TouchableOpacity>
        <View style={styles.title}>
          <TextView
            fontFamily="General Sans"
            fontWeight={'500'}
            center
            fontSize={80}
          >
            VAULT
          </TextView>
        </View>
        <View style={styles.tabContainer}></View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: { flex: 1 },
  space: {
    paddingHorizontal: 15,
  },
  title: {
    marginTop: '20%',
  },
  tabContainer: {
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    padding: 4,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292929',
    marginTop: 15,
  },
});
