import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TextView from 'components/TextView';

const Title = () => {
  return (
    <View style={styles.title}>
      <TextView fontSize={40} fontWeight={'500'} fontFamily="General Sans">
        VAULT
      </TextView>
      <TextView fontSize={40} fontFamily="NewYork">
        MEMBERSHIP
      </TextView>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    flexDirection: 'column',
    gap: 0,
  },
});
