// Accordion.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutAnimation,
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';
import Icon from '@/src/components/icon';
import {
  flowColorsRgbaOnSurface0,
  flowColorsRgbaOnSurface800,
  flowColorsRgbaOnSurface900,
  flowTypographySmallBody,
  flowTypographySmallSubheadline,
} from '@/src/assets/styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  initiallyExpanded?: boolean;
  onToggle?: (isExpanded: boolean) => void;
  headerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  initiallyExpanded = false,
  onToggle,
  headerStyle,
  contentStyle,
  titleStyle,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(initiallyExpanded);
  const animatedController = useRef(
    new Animated.Value(initiallyExpanded ? 1 : 0),
  ).current;

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`],
  });

  useEffect(() => {
    Animated.timing(animatedController, {
      duration: 300,
      toValue: isExpanded ? 1 : 0,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, animatedController]);

  const toggleAccordion = () => {
    // Animace rozbalení a sbalení
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(!isExpanded);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleAccordion}
        activeOpacity={0.8}
        style={[styles.header, headerStyle]}
      >
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
          <Icon
            type="chevron-bottom"
            size={20}
            color={flowColorsRgbaOnSurface0}
          />
        </Animated.View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={[styles.content, contentStyle]}>{children}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: flowColorsRgbaOnSurface800,
    borderRadius: 12,
    shadowColor: flowColorsRgbaOnSurface900,
    overflow: 'hidden',
    elevation: 2, // Pro Android
    shadowOffset: { width: 0, height: 2 }, // Pro iOS
    shadowOpacity: 0.1, // Pro iOS
    shadowRadius: 4, // Pro iOS
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: flowColorsRgbaOnSurface800,
  },
  title: {
    color: flowColorsRgbaOnSurface0,
    fontFamily: flowTypographySmallSubheadline.fontFamily,
    fontSize: parseFloat(flowTypographySmallSubheadline.fontSize),
    fontWeight:
      flowTypographySmallSubheadline.fontWeight as TextStyle['fontWeight'],
    letterSpacing:
      parseFloat(flowTypographySmallSubheadline.letterSpacing) *
      parseFloat(flowTypographySmallSubheadline.fontSize),
    lineHeight: parseFloat(flowTypographySmallSubheadline.lineHeight),
    paddingHorizontal: 16,
    textDecorationLine:
      flowTypographySmallSubheadline.textDecoration as TextStyle['textDecorationLine'],
    textTransform:
      flowTypographySmallSubheadline.textTransform as TextStyle['textTransform'],
  },
  content: {
    color: flowColorsRgbaOnSurface0,
    backgroundColor: flowColorsRgbaOnSurface800,
    fontFamily: flowTypographySmallBody.fontFamily,
    fontSize: parseFloat(flowTypographySmallBody.fontSize),
    fontWeight: flowTypographySmallBody.fontWeight as TextStyle['fontWeight'],
    letterSpacing:
      parseFloat(flowTypographySmallBody.letterSpacing) *
      parseFloat(flowTypographySmallBody.fontSize),
    lineHeight: parseFloat(flowTypographySmallBody.lineHeight),
    padding: 16,
    textDecorationLine:
      flowTypographySmallBody.textDecoration as TextStyle['textDecorationLine'],
    textTransform:
      flowTypographySmallBody.textTransform as TextStyle['textTransform'],
  },
});

export default Accordion;
