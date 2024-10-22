// Badge.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  flowColorsRgbaSemanticInfo,
  flowColorsRgbaSurfacePrimary,
  flowTypographyMediumBody,
} from '@/src/app/styles';

interface BadgeProps {
  text: string;
  color?: string;
  textColor?: string;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  color = flowColorsRgbaSemanticInfo,
  textColor = flowColorsRgbaSurfacePrimary,
  fontSize = parseFloat(flowTypographyMediumBody.fontSize),
  style = {},
}) => {
  return (
    <View style={[styles.badge, { backgroundColor: color }, style]}>
      <Text style={[styles.badgeText, { color: textColor, fontSize }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    // `backgroundColor` je nastaven přes props
  },
  badgeText: {
    // `color` a `fontSize` jsou nastaveny přes props
    fontWeight: flowTypographyMediumBody.fontWeight as TextStyle['fontWeight'],
    fontFamily: flowTypographyMediumBody.fontFamily,
    fontSize: parseFloat(flowTypographyMediumBody.fontSize),
    fontStyle: flowTypographyMediumBody.fontStyle as TextStyle['fontStyle'],
  },
});

export default Badge;
