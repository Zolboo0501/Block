/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const Container: React.FC<any> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.container,
          {
            paddingVertical: 10,
            paddingHorizontal: 15,
          },
        ]}
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
