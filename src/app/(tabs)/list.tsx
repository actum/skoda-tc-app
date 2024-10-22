import { Image, StyleSheet, Text, TextStyle, View } from 'react-native';
import Badge from '../../components/badge';
import {
  flowColorsBackgroundPrimary,
  flowColorsRgbaSemanticAlert,
  flowColorsRgbaSemanticInfo,
  flowColorsRgbaSemanticPositive,
  flowColorsRgbaSemanticWarning,
  flowColorsTextPrimary,
  flowTypographyLargeBody,
  flowTypographyLargeH1,
} from '@/src/app/styles';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Image src="@skodaflow/web-tokens/src/assets/logo/horizontalWider.svg" />
      <Text
        style={[styles.text, { fontSize: 30, fontFamily: 'SKODANext-Light' }]}
      >
        {' '}
        List of products{' '}
      </Text>
      <Badge text="Nový" color={flowColorsRgbaSemanticInfo} />
      <Badge text="Chyba" color={flowColorsRgbaSemanticAlert} />
      <Badge text="Aktualizace" color={flowColorsRgbaSemanticWarning} />
      <Badge text="Dokončeno" color={flowColorsRgbaSemanticPositive} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: flowColorsBackgroundPrimary,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: flowColorsTextPrimary,
    fontFamily: flowTypographyLargeBody.fontFamily,
    fontSize: parseFloat(flowTypographyLargeBody.fontSize),
    fontWeight: flowTypographyLargeBody.fontWeight as TextStyle['fontWeight'],
    letterSpacing:
      parseFloat(flowTypographyLargeBody.letterSpacing) *
      parseFloat(flowTypographyLargeBody.fontSize),
    lineHeight: parseFloat(flowTypographyLargeBody.lineHeight),
    textDecorationLine:
      flowTypographyLargeBody.textDecoration as TextStyle['textDecorationLine'],
    textTransform:
      flowTypographyLargeBody.textTransform as TextStyle['textTransform'],
  },
  title: {
    color: flowColorsTextPrimary,
    fontFamily: flowTypographyLargeH1.fontFamily,
    fontSize: parseFloat(flowTypographyLargeH1.fontSize),
    fontWeight: flowTypographyLargeH1.fontWeight as TextStyle['fontWeight'],
    letterSpacing:
      parseFloat(flowTypographyLargeH1.letterSpacing) *
      parseFloat(flowTypographyLargeH1.fontSize),
    lineHeight: parseFloat(flowTypographyLargeH1.lineHeight),
    textDecorationLine:
      flowTypographyLargeH1.textDecoration as TextStyle['textDecorationLine'],
    textTransform:
      flowTypographyLargeH1.textTransform as TextStyle['textTransform'],
  },
});
