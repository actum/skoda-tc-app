// PageHeader.tsx
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Icon from '@/src/components/icon';
import { flowColorsRgbaOnSurface0 } from '@/src/assets/styles';

// Interface for properties
interface IPageHeader {
  title?: string;
  backAction: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function PageHeader(props: IPageHeader) {
  return (
    <View style={[props.style, styles.root]}>
      <TouchableOpacity
        onPress={props.backAction}
        style={styles.iconContainer}
        accessibilityRole="button"
        accessibilityLabel="Go back"
      >
        <Icon type={'chevron-left'} size={32} color={'#fff'} />
      </TouchableOpacity>

      {props.title && (
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    left: 10,
    position: 'absolute',
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  text: {
    color: flowColorsRgbaOnSurface0,
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
