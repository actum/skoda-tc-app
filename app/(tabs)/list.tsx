import { StyleSheet, View, Text } from 'react-native';
import * as Styles from '../styles.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Styles.flowColorsBackgroundPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: Styles.flowColorsTextPrimary,
        fontSize: parseFloat(Styles.flowTypographyLargeH1.fontSize),
        lineHeight: parseFloat(Styles.flowTypographyLargeH1.lineHeight),
        fontFamily: Styles.flowTypographyLargeH1.fontFamily,
        fontWeight: Styles.flowTypographyLargeH1.fontWeight,
        letterSpacing: parseFloat(Styles.flowTypographyLargeH1.letterSpacing) * parseFloat(Styles.flowTypographyLargeH1.fontSize),
        textTransform: Styles.flowTypographyLargeH1.textTransform,
        textDecorationLine: Styles.flowTypographyLargeH1.textDecoration,
    },
    text: {
        color: Styles.flowColorsTextPrimary,
        fontSize: parseFloat(Styles.flowTypographyLargeBody.fontSize),
        lineHeight: parseFloat(Styles.flowTypographyLargeBody.lineHeight),
        fontFamily: Styles.flowTypographyLargeBody.fontFamily,
        fontWeight: Styles.flowTypographyLargeBody.fontWeight.toString(),
        letterSpacing: parseFloat(Styles.flowTypographyLargeBody.letterSpacing) * parseFloat(Styles.flowTypographyLargeBody.fontSize),
        textTransform: Styles.flowTypographyLargeBody.textTransform,
        textDecorationLine: Styles.flowTypographyLargeBody.textDecoration,
    },
});

export default function TabTwoScreen() {
  return (
    <View style={[styles.container]}>
      <Text style={[styles.text, {fontSize: 30, fontFamily: 'SKODANext-Light'}]}> List of products </Text>
    </View>
  );
}
