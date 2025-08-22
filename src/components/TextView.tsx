/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native';
import { ITextView } from './types';

const TextView: React.FC<ITextView> = ({
  children,
  fontSize,
  color,
  fontWeight = '400',
  justify,
  center,
  numberOfLines,
  italic,
  opacity,
  style,
  fontFamily,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines && numberOfLines}
      maxFontSizeMultiplier={1}
      style={[
        {
          textAlign: justify ? 'justify' : center ? 'center' : undefined,
          fontFamily: fontFamily ? fontFamily : 'General Sans',
          fontStyle: italic ? 'italic' : 'normal',
          fontSize: fontSize ? fontSize : 16,
          opacity: opacity ? opacity : undefined,
          color: color ? color : '#fff',
          fontWeight: fontWeight && fontWeight,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextView;
