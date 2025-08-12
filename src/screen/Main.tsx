/* eslint-disable react-native/no-inline-styles */
import { ArrowLeft } from '@icons';
import TextView from 'components/TextView';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const Main: React.FC<any> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.space}>
          <View style={styles.rowSpaceBetween}>
            <TextView fontSize={24}>VAULT</TextView>
            <TouchableOpacity onPress={() => {}}>
              <ArrowLeft />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1 },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  space: {
    paddingHorizontal: 15,
  },
});
