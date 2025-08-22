/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';

type OTPInputProps = {
  length: number;
  value: string;
  disabled: boolean;
  onChange?(value: any): void;
  inputError: boolean;
};

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  disabled,
  value,
  onChange,
  inputError,
}) => {
  const inputRefs = useRef<Array<TextInput>>([]);
  const onChangeValue = (text: string, index: number) => {
    if (!onChange) {
      return;
    }
    if (text.length === length) {
      const val: string[] = text.split('');

      onChange(val);
      inputRefs?.current[length]?.focus();
    } else {
      const newValue = [...value];
      newValue[index] = text;

      onChange(newValue);
    }
  };

  const handleChange = (text: string, index: number) => {
    onChangeValue(text, index);

    if (text.length !== 0) {
      if (index === length) {
        return Keyboard.dismiss();
      } else {
        if (text.length === length) {
          Keyboard.dismiss();
          return inputRefs?.current[length]?.focus();
        }
        return inputRefs?.current[index + 1]?.focus();
      }
    }
    return inputRefs?.current[index - 1]?.focus();
  };

  const handleBackSpace = (event: any, index: number) => {
    const { nativeEvent } = event;

    if (nativeEvent.key === 'Backspace') {
      handleChange('', index);
    }
  };

  return (
    <View style={styles.container}>
      {[...new Array(length)].map((item: any, index: number) => (
        <TextInput
          ref={ref => {
            if (ref && !inputRefs.current.includes(ref)) {
              inputRefs.current = [...inputRefs.current, ref];
            }
          }}
          style={[
            styles.input,
            {
              borderColor: value[index] ? '#fff' : '#272727',
              color: '#fff',
              fontWeight: '600',
            },
          ]}
          placeholder="0"
          textAlign="center"
          key={index}
          maxLength={index === 0 ? length : 1}
          value={value[index]}
          selectTextOnFocus
          editable={!disabled}
          keyboardType="decimal-pad"
          testID={`OTP-input${index}`}
          onChangeText={(text: string) => {
            handleChange(text, index);
          }}
          onKeyPress={event => handleBackSpace(event, index)}
          autoComplete="one-time-code"
          textContentType={'oneTimeCode'}
        />
      ))}
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    gap: 16,
  },
  input: {
    flex: 1,
    fontFamily: 'General Sans',
    fontSize: 24,
    height: 71,
    borderRadius: 20,
    borderWidth: 1.5,
  },
});
