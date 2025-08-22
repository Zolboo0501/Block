import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const KeyboardContainer: React.FC<any> = ({ children, style }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, style && style]}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1 },
});

export default KeyboardContainer;
