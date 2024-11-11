import {Platform, StyleSheet, Text, TextStyle} from 'react-native';
import React, {FC} from 'react';
import {Colors, Fonts} from '../../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';

interface Props {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'h7'
    | 'h8'
    | 'h9'
    | 'body';
  fontFamily?: Fonts;
  fontSize?: number;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
  numberOfLines?: number;
  onLayout?: (event: any) => void;
}

const CustomText: FC<Props> = ({
  children,
  fontFamily = 'Satoshi-Regular',
  fontSize,
  variant,
  numberOfLines,
  onLayout,
  style,
  ...props
}) => {
  let computerFontSize: number =
    Platform.OS === 'android'
      ? RFValue(fontSize || 12)
      : RFValue(fontSize || 10);

  switch (variant) {
    case 'h1':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 24)
          : RFValue(fontSize || 22);
      break;
    case 'h2':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 22)
          : RFValue(fontSize || 20);
      break;
    case 'h3':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 20)
          : RFValue(fontSize || 18);
      break;
    case 'h4':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 18)
          : RFValue(fontSize || 16);
      break;
    case 'h5':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 16)
          : RFValue(fontSize || 14);
      break;
    case 'h6':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 14)
          : RFValue(fontSize || 12);
      break;
    case 'h7':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 12)
          : RFValue(fontSize || 10);
      break;
    case 'h8':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 10)
          : RFValue(fontSize || 8);
      break;
    case 'h9':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 8)
          : RFValue(fontSize || 6);
      break;
    case 'body':
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 16)
          : RFValue(fontSize || 15);
      break;

    default:
      computerFontSize =
        Platform.OS === 'android'
          ? RFValue(fontSize || 12)
          : RFValue(fontSize || 10);
      break;
  }

  return (
    <Text
      onLayout={onLayout}
      style={[
        styles.text,
        {
          color: Colors.text,
          fontSize: computerFontSize,
          fontFamily: fontFamily,
        },
        style,
      ]}
      numberOfLines={numberOfLines !== undefined ? numberOfLines : undefined}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {},
});
