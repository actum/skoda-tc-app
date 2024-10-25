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
import useCarState from '@/src/components/carState';
import { flowColorsRgbaOnSurface0 } from '@/src/assets/styles';

// Interface for properties
interface IPageHeader {
  title?: string;
  backAction: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function PageHeader(props: IPageHeader) {
  const { car } = useCarState();

  const styles = StyleSheet.create({
    carIconContainer: { paddingLeft: 22 },
    carRoot: { alignItems: 'center', flexDirection: 'row', gap: 20 },
    carText: {
      color: '#fff',
      fontSize: 36,
    },
    iconContainer: {
      left: 10,
      position: 'absolute', // Nastavení pozice ikony vlevo
    },
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', // Vycentrování obsahu ve středu
      height: 60, // Nastavení výšky pro správné zarovnání
      // backgroundColor: '#000', // Přidání pozadí pro lepší viditelnost
    },
    text: {
      color: flowColorsRgbaOnSurface0,
      fontSize: 20,
      fontWeight: 'bold',
    },
    titleContainer: {
      alignItems: 'center', // Zarovná text na střed
      justifyContent: 'center',
    },
  });

  if (car) {
    return (
      <View style={styles.carRoot}>
        <TouchableOpacity
          onPress={props.backAction}
          style={styles.carIconContainer}
        >
          <Icon type={'chevron-left'} size={40} color={'#fff'} />
        </TouchableOpacity>
        <View>
          <Text style={styles.carText}>{props.title}</Text>
        </View>
      </View>
    );
  }

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
