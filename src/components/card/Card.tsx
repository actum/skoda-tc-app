// components/Card.tsx
import React from 'react';
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CustomImage from '@/src/components/image/Image';
import {
  flowColorsRgbaOnSurface0,
  flowColorsRgbaOnSurface800,
  flowColorsRgbaOnSurface900,
} from '@/src/assets/styles';
import TextParagraph from '@/src/components/text/TextParagraph';

// Typování props pro Card komponentu
interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  priceValue?: number;
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
  priceValue,
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
          style={[styles.image, imageStyle]}
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
        style={[styles.image, imageStyle]}
        loadingIndicatorColor="#ff0000"
        onLoad={() => console.log('Obrázek načten!')}
        onError={() => console.log('Chyba při načítání obrázku!')}
      />
    );
  };

  // Základní obsah karty
  const cardContent = priceValue ? (
    <View style={[styles.content, contentStyle]}>
      <View style={styles.cardWithPrice}>
        <View>
          {title && <TextParagraph text={title} style={styles.subtitle} />}
        </View>
        <View>
          {priceValue && (
            <TextParagraph text={`${priceValue} CZK`} style={styles.title} />
          )}
          {description && (
            <TextParagraph text={description} style={styles.description} />
          )}
        </View>
      </View>
      {children}
      {actions && <View style={styles.actions}>{actions}</View>}
    </View>
  ) : (
    <View style={[styles.content, contentStyle]}>
      {title && <TextParagraph text={title} style={styles.title} />}
      {subtitle && <TextParagraph text={subtitle} style={styles.subtitle} />}
      {description && (
        <TextParagraph text={description} style={styles.description} />
      )}
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
    backgroundColor: flowColorsRgbaOnSurface800,
    borderRadius: 12,
    shadowColor: flowColorsRgbaOnSurface900,
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
    backgroundColor: flowColorsRgbaOnSurface0, // Základní barva pro případ, že obrázek není
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
  cardWithPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: flowColorsRgbaOnSurface0,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: flowColorsRgbaOnSurface0,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: flowColorsRgbaOnSurface0,
    marginBottom: 10,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default Card;
