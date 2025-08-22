/* eslint-disable react-native/no-inline-styles */
import { EyeClosed, EyeOpen } from '@icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import TextView from './TextView';
import { InputProps } from './types';

const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  label,
  placeholder,
  secureTextEntry,
  keyboardType,
  isPhone,
  maxLength,
  labelFontFamily,
  labelColor,
  isError,
}) => {
  const [isHide, setIsHide] = React.useState(true);

  const handleChange = () => setIsHide(prevState => !prevState);

  return (
    <View style={styles.columnGap}>
      <TextView
        fontSize={14}
        color={labelColor ? labelColor : '#fff'}
        fontFamily={labelFontFamily ? labelFontFamily : undefined}
      >
        {label}
      </TextView>
      <View
        style={[
          styles.inputContainer,
          {
            borderBottomWidth: 1,
            borderColor: '#DEDEDE',
          },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={(text: string) => {
            if (isPhone) {
              const numericValue = text.replace(/[^0-9.]/g, '');
              return onChangeText(numericValue);
            }
            onChangeText(text);
          }}
          placeholder={placeholder}
          placeholderTextColor={'#93939366'}
          secureTextEntry={secureTextEntry ? (isHide ? true : false) : false}
          keyboardType={isPhone ? 'decimal-pad' : keyboardType || 'default'}
          style={styles.input}
          maxLength={maxLength ? maxLength : isPhone ? 8 : 100}
        />
        {secureTextEntry && (
          <TouchableOpacity style={{ marginRight: 8 }} onPress={handleChange}>
            {isHide ? <EyeClosed size={20} /> : <EyeOpen />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  columnGap: { flexDirection: 'column', gap: 12 },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'General Sans',
    fontWeight: '400',
    color: '#fff',
  },
});
