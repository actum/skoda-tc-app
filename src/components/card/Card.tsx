// components/Card.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ImageSourcePropType } from 'react-native';
import CustomImage from '@/src/components/image/Image';

// Typování props pro Card komponentu
interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: ImageSourcePropType | React.ReactNode;
  actions?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  image,
  actions,
  onPress,
  style,
  contentStyle,
  imageStyle,
  children,
}) => {
  // Funkce pro renderování obrázku
  const renderImage = () => {
    if (!image) return null;

    if (React.isValidElement(image)) {
      // Pokud je image React element, renderujeme ho přímo
      return (
        <CustomImage
          source={require('../../assets/images/products/1.png')}
          placeholder={require('../../assets/images/placeholder.webp')} // Lokální obrázek jako placeholder
          errorPlaceholder={require('../../assets/images/missing-image.webp')} // Lokální obrázek jako chybový placeholder
          style={styles.image}
          loadingIndicatorColor="#ff0000"
          onLoad={() => console.log('Obrázek načten!')}
          onError={() => console.log('Chyba při načítání obrázku!')}
        />
      );
    }

    return (
      <CustomImage
        source={require('../../assets/images/products/1.png')}
        placeholder={require('../../assets/images/placeholder.webp')} // Lokální obrázek jako placeholder
        errorPlaceholder={require('../../assets/images/missing-image.webp')} // Lokální obrázek jako chybový placeholder
        style={styles.image}
        loadingIndicatorColor="#ff0000"
        onLoad={() => console.log('Obrázek načten!')}
        onError={() => console.log('Chyba při načítání obrázku!')}
      />
    );
  };

  // Základní obsah karty
  const cardContent = (
    <View style={[styles.content, contentStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {children}
      {actions && <View style={styles.actions}>{actions}</View>}
    </View>
  );

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
      style={[styles.card, style]}
    >
      {renderImage()}
      {cardContent}
    </TouchableOpacity>
  );
};

// Styly pro Card komponentu
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Pro Android
    marginVertical: 10,
    marginHorizontal: 20,
    overflow: 'hidden', // Zajistí, že obsah nebude přesahovat za zaoblené rohy
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#eee', // Základní barva pro případ, že obrázek není
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // Nastavení šířky na 100%
    height: 200,
    aspectRatio: 16 / 9, // Udržuje poměr stran 16:9
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Card;
