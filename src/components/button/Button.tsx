import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  flowColorsBrandSecondary,
  flowColorsRgbaBrandHoverSecondary,
} from '@/_src/assets/styles';
import { useState } from 'react';

interface IButton extends TouchableOpacityProps {
  title: string;
}

export default function Button(props: IButton) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <TouchableOpacity
      {...props}
      style={[styles.root, isHovered && styles.hover]}
      onPressIn={() => setIsHovered(true)}
      onPressOut={() => setIsHovered(false)}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  hover: {
    backgroundColor: flowColorsRgbaBrandHoverSecondary,
  },
  root: {
    alignItems: 'center',
    backgroundColor: flowColorsBrandSecondary,
    borderRadius: 50,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  text: {
    fontFamily: 'SKODANext-Bold',
    fontSize: 18,
  },
});
