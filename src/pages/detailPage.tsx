// DetailPage.tsx
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import BaseContainer from '@/src/components/containers/BaseContainer';
import StyledButton from '@/src/components/button/StyledButton';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { useLocation, useNavigate, useParams } from 'react-router-native';
import {
  flowColorsRgbaBrandPrimary,
  flowColorsRgbaOnSurface0,
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
import CustomImage from '@/src/components/image/Image';
import Card from '@/src/components/card/Card';
import { ProductContext } from '@/src/providers/ProductProvider';
import { Licence } from '@/src/connections/request/Data';
import Icon, { IconType } from '@/src/components/icon';
import { formatDate } from 'tough-cookie';

export default function DetailPage() {
  let iconType;
  let iconColor;
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  console.log('location', location);
  console.log('id', id);
  const { getProductById } = useContext(ProductContext);
  const [product, setProduct] = useState<Licence | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (product && product.purchasedLicense?.endDate) {
    if (new Date(product.purchasedLicense?.endDate) > new Date()) {
      iconType = 'check';
      iconColor = 'rgba(120, 250, 174, 1)';
    } else {
      iconType = 'warning';
      iconColor = 'rgba(253, 88, 88, 1)';
    }
  }

  console.log(iconType);

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (!id) {
    console.error('Error fetching product: PRODUCT ID missing');
    alert('Chyba při načítání produktu.');
    return;
  }

  const fetchProduct = async () => {
    if (!id) {
      setError('ID produktu není k dispozici.');
      setLoading(false);
      return;
    }

    setLoading(true);
    const fetchedProduct = await getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setError(null);
    } else {
      setError('Produkt nebyl nalezen.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <BaseContainer>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={flowColorsRgbaBrandPrimary} />
        </View>
      </BaseContainer>
    );
  }

  if (error || !product || !id) {
    return (
      <BaseContainer>
        <View style={styles.bodyContainer}>
          <CustomImage
            source={require('../assets/images/404.png')}
            placeholder={require('../assets/images/placeholder.webp')} // Lokální obrázek jako placeholder
            errorPlaceholder={require('../assets/images/missing-image.webp')} // Lokální obrázek jako chybový placeholder
            style={styles.image}
            loadingIndicatorColor="#ff0000"
            onLoad={() => console.log('Obrázek načten!')}
            onError={() => console.log('Chyba při načítání obrázku!')}
          />
          <Text style={styles.errorText}>{error}</Text>
          <StyledButton
            title="Zpět na Home"
            onPress={() => navigate(RouteKey.home)}
          />
        </View>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      <ScrollView style={{ marginBottom: 80 }}>
        <View style={styles.mainWrapper}>
          <View style={styles.headerContainer}>
            <CustomImage
              source={require('../assets/images/products/1.png')}
              placeholder={require('../assets/images/placeholder.webp')} // Lokální obrázek jako placeholder
              errorPlaceholder={require('../assets/images/missing-image.webp')} // Lokální obrázek jako chybový placeholder
              style={styles.imageFullWidth}
              loadingIndicatorColor="#ff0000"
              onLoad={() => console.log('Obrázek načten!')}
              onError={() => console.log('Chyba při načítání obrázku!')}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{product.name}</Text>
          </View>
          {iconType && product.purchasedLicense && (
            <View style={styles.iconContainer}>
              <View style={[styles.icon, { backgroundColor: iconColor }]}>
                <Icon
                  type={iconType as IconType}
                  size={18}
                  color={flowColorsRgbaOnSurface0}
                />
              </View>
              <Text style={styles.text}>
                Active until{' '}
                {formatDate(new Date(product.purchasedLicense.endDate))}
              </Text>
            </View>
          )}
          <View style={styles.bodyContainer}>
              <Card
                  title="Rastrový Obrázek"
                  subtitle="Podtitulek karty"
                  description="Toto je popis karty s rastrovým obrázkem."
                  actions={
                      <StyledButton
                          title="Akce"
                          onPress={() => console.log('Akce stisknuta!')}
                      />
                  }
                  onPress={() => console.log('Karta stisknuta!')}
                  style={styles.cardFullWidth}
              />
            <TextParagraph text="Toto je odstavec s výchozími styly." />
            <StyledButton
              title={'HOME'}
              onPress={() => {
                navigate(RouteKey.home);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    gap: 24,
      paddingTop: 50,
      display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
  icon: {
    borderRadius: 50,
    padding: 0,
  },
  bodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  card: {
    marginBottom: 20,
  },
  cardFullWidth: {
    width: '100%',
    marginBottom: 20,
  },
  image: {
    borderRadius: 10,
    height: 200,
    marginBottom: 20,
    width: 200,
  },
  imageFullWidth: {
    width: '100%', // Nastavení šířky na 100%
      height: 250,
    aspectRatio: 16 / 9, // Udržuje poměr stran 16:9
    marginBottom: 20,
    borderRadius: 10,
  },
  text: {
    color: flowColorsRgbaOnSurface0,
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
    color: flowColorsRgbaOnSurface0,
    paddingHorizontal: 16,
    gap: 10,
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: flowColorsRgbaSemanticAlert,
    fontSize: 18,
    textAlign: 'center',
  },
});
