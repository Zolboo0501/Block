/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TextView from './TextView';
import { IButton } from './types';
import colors from '@colors';

const Button: React.FC<IButton> = ({
  title,
  titleSize,
  titleWeight,
  onPress,
  height = 42,
  flex,
  icon,
  paddingHorizontal,
  paddingVertical,
  loading,
  loadingColor = 'white',
  rightIcon,
  style,
  disabled = false,
  color,
  border,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || (loading && true)}
      style={[
        styles.buttonContainer,
        style && style,
        {
          flex: flex ? 1 : undefined,
          height: height,
          paddingVertical: paddingVertical && paddingVertical,
          paddingHorizontal: paddingHorizontal && paddingHorizontal,
          backgroundColor: color ? color : '#272727',
          borderWidth: border ? 1 : 0,
          borderColor: border ? (borderColor ? borderColor : '#272727') : '',
        },
      ]}
      onPress={onPress}
    >
      {icon && <View style={{ marginRight: 5 }}>{icon}</View>}

      <TextView
        fontSize={titleSize && titleSize}
        color="white"
        fontWeight={titleWeight && titleWeight}
        fontFamily="General Sans"
      >
        {title}
      </TextView>
      {loading && (
        <View style={{ marginLeft: 10 }}>
          <ActivityIndicator
            color={loadingColor && loadingColor}
            size={'small'}
          />
        </View>
      )}
      {rightIcon && <View style={{ marginLeft: 5 }}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});
