import { StyleProp, TextStyle, ViewStyle } from "react-native";

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
  fontFamily ?:string
}