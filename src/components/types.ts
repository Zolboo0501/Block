import { StyleProp, TextStyle, ViewStyle } from 'react-native';

type TFontweight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'ultralight'
  | 'thin'
  | 'light'
  | 'medium'
  | 'regular'
  | 'semibold'
  | 'condensedBold'
  | 'condensed'
  | 'heavy'
  | 'black'
  | undefined;

export interface IButton {
  title: string;
  color?: string;
  image?: string;
  transparent?: boolean;
  onPress: any;
  height?: number;
  flex?: boolean;
  icon?: any;
  titleSize?: number;
  titleColor?: string;
  titleWeight?: TFontweight;
  paddingHorizontal?: number;
  paddingVertical?: number;
  loading?: boolean;
  loadingColor?: string;
  rightIcon?: any;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  border?: boolean;
  leftIcon?: any;
  borderColor?: string;
}

export interface ITextView {
  fontSize?: number;
  fontWeight?: TFontweight;
  children: any;
  color?: string;
  justify?: boolean;
  center?: boolean;
  numberOfLines?: number;
  italic?: boolean;
  isError?: boolean;
  opacity?: number;
  style?: StyleProp<TextStyle>;
  fontFamily?: string;
}

export type OTPInputProps = {
  length: number;
  value: string;
  disabled: boolean;
  onChange?(value: any): void;
  inputError: boolean;
};

export interface InputProps {
  value: any;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url'
    | 'decimal-pad';
  isPhone?: boolean;
  maxLength?: number;
  isError?: boolean;
  labelFontFamily?: string;
  labelColor?: string;
}

export interface ICheckbox {
  value: any;
  onChange: (value: any) => void;
  label: any;
}
