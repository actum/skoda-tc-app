import {Image, StyleSheet, Text, TextStyle, View} from 'react-native';
import Badge from "@/_src/components/badge";
import {
    flowColorsBackgroundPrimary,
    flowColorsRgbaSemanticAlert,
    flowColorsRgbaSemanticInfo,
    flowColorsRgbaSemanticPositive,
    flowColorsRgbaSemanticWarning,
    flowColorsTextPrimary,
    flowTypographyLargeBody,
    flowTypographyLargeH1
} from "@/app/styles";

export default function TabTwoScreen() {
    return (
        <View style={[styles.container]}>
                <Image src="@skodaflow/web-tokens/src/assets/logo/horizontalWider.svg" />
            <Text style={[styles.text, {fontSize: 30, fontFamily: 'SKODANext-Light'}]}> List of products </Text>
            <Badge text="Nový" color={flowColorsRgbaSemanticInfo} />
            <Badge text="Chyba" color={flowColorsRgbaSemanticAlert} />
            <Badge text="Aktualizace" color={flowColorsRgbaSemanticWarning} />
            <Badge text="Dokončeno" color={flowColorsRgbaSemanticPositive} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: flowColorsBackgroundPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: flowColorsTextPrimary,
        fontSize: parseFloat(flowTypographyLargeH1.fontSize),
        lineHeight: parseFloat(flowTypographyLargeH1.lineHeight),
        fontFamily: flowTypographyLargeH1.fontFamily,
        fontWeight: flowTypographyLargeH1.fontWeight as TextStyle['fontWeight'],
        letterSpacing: parseFloat(flowTypographyLargeH1.letterSpacing) * parseFloat(flowTypographyLargeH1.fontSize),
        textTransform: flowTypographyLargeH1.textTransform as TextStyle['textTransform'],
        textDecorationLine: flowTypographyLargeH1.textDecoration as TextStyle['textDecorationLine'],
    },
    text: {
        color: flowColorsTextPrimary,
        fontSize: parseFloat(flowTypographyLargeBody.fontSize),
        lineHeight: parseFloat(flowTypographyLargeBody.lineHeight),
        fontFamily: flowTypographyLargeBody.fontFamily,
        fontWeight: flowTypographyLargeBody.fontWeight as TextStyle['fontWeight'],
        letterSpacing: parseFloat(flowTypographyLargeBody.letterSpacing) * parseFloat(flowTypographyLargeBody.fontSize),
        textTransform: flowTypographyLargeBody.textTransform as TextStyle['textTransform'],
        textDecorationLine: flowTypographyLargeBody.textDecoration as TextStyle['textDecorationLine'],
    },
});
