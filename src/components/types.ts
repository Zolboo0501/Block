import { StyleProp, TextStyle } from "react-native";

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