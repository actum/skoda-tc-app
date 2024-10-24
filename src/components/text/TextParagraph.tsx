// TextParagraph.tsx
import React from 'react';
import { Text, StyleSheet, TextStyle, StyleProp } from 'react-native';
import {
  flowTypographyMediumBody,
  flowColorsRgbaOnSurface0,
} from '@/src/assets/styles';

interface TextParagraphProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontStyle?: TextStyle['fontStyle'];
  lineHeight?: number;
  textAlign?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}

const TextParagraph: React.FC<TextParagraphProps> = ({
  text,
  color = flowColorsRgbaOnSurface0,
  fontSize = parseFloat(flowTypographyMediumBody.fontSize),
  fontWeight = flowTypographyMediumBody.fontWeight as TextStyle['fontWeight'],
  fontStyle = flowTypographyMediumBody.fontStyle as TextStyle['fontStyle'],
  lineHeight = parseFloat(flowTypographyMediumBody.lineHeight),
  textAlign = 'left',
  style = {},
}) => {
  return (
    <Text
      style={[
        styles.text,
        {
          color,
          fontSize,
          fontWeight,
          fontStyle,
          lineHeight,
          textAlign,
        },
        style,
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: flowColorsRgbaOnSurface0,
    fontSize: parseFloat(flowTypographyMediumBody.fontSize),
    fontWeight: flowTypographyMediumBody.fontWeight as TextStyle['fontWeight'],
    fontStyle: flowTypographyMediumBody.fontStyle as TextStyle['fontStyle'],
    lineHeight: parseFloat(flowTypographyMediumBody.lineHeight),
    textAlign: 'left',
  },
});

export default TextParagraph;
