import { Image, StyleSheet, Text, TextStyle, View } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '@/src/providers/UserContext';
import BaseContainer from '@/src/components/containers/BaseContainer';
import StyledButton from '@/src/components/button/StyledButton';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { useLocation, useNavigate } from 'react-router-native';
import {
  flowColorsRgbaSemanticAlert,
  flowColorsRgbaSemanticInfo,
  flowColorsRgbaSemanticPositive,
  flowColorsRgbaSemanticWarning,
  flowColorsRgbaTextPrimary,
  flowTypographyLargeBody,
  flowTypographyLargeH1,
} from '@/src/assets/styles';
import Badge from '@/src/components/badge/Badge';
import TextParagraph from '@/src/components/text/TextParagraph';
import FormExample from '@/src/components/forms/FormExample';

export default function DetailPage() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  console.log('location', location);
  return (
    <BaseContainer>
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}> DETAIL</Text>
        <Text style={{ fontSize: 20, padding: 20 }}>
          {' '}
          USER: {userCtx.userData?.firstName} {userCtx.userData?.lastName}
        </Text>
        <Image src="@skodaflow/web-tokens/src/assets/logo/horizontalWider.svg" />
        <Badge text="Nový" color={flowColorsRgbaSemanticInfo} />
        <Badge text="Chyba" color={flowColorsRgbaSemanticAlert} />
        <Badge text="Aktualizace" color={flowColorsRgbaSemanticWarning} />
        <Badge text="Dokončeno" color={flowColorsRgbaSemanticPositive} />
        <TextParagraph text="Toto je odstavec s výchozími styly." />
        <FormExample></FormExample>
        <StyledButton
          title={'HOME'}
          onPress={() => {
            navigate(RouteKey.home);
          }}
        />
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: flowColorsRgbaTextPrimary,
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
    color: flowColorsRgbaTextPrimary,
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
