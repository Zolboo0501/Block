/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DrawerContent: React.FC<any> = () => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top > 0 ? insets.top : 15 },
      ]}
    >
      <Text>DrawerContent</Text>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15 },
});
