import { Menu } from '@icons';
import { useNavigation } from '@react-navigation/native';
import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const Header: React.FC<any> = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.back}
      >
        <Menu />
      </TouchableOpacity>
      <TextView fontWeight={'500'} color="#DEDEDE" center>
        Vault Member
      </TextView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  back: { position: 'absolute', left: 15, top: 9, zIndex: 10 },
});
