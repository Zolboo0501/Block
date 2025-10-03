import TextView from 'components/TextView';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Welcome: React.FC<any> = ({ loggedUser }) => {
  return (
    <View style={styles.columnSpace}>
      <View style={styles.row}>
        <TextView fontWeight={'600'} fontSize={32}>
          Hello,{' '}
        </TextView>
        <TextView fontWeight={'600'} fontSize={32} color="#0077FF">
          {loggedUser?.firstName}
        </TextView>
      </View>
      <TextView fontSize={14} color="#FFFFFFB2">
        Welcome back, hope your feeling good today
      </TextView>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  columnSpace: { flexDirection: 'column', gap: 10 },
  row: { flexDirection: 'row' },
});
