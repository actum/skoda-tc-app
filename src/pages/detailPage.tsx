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
  flowColorsRgbaOnSurface800,
  flowColorsRgbaSemanticAlert,
  flowColorsRgbaTextPrimary,
  flowTypographyLargeBody,
  flowTypographySmallH1,
} from '@/src/assets/styles';
import TextParagraph from '@/src/components/text/TextParagraph';
import CustomImage from '@/src/components/image/Image';
import Card from '@/src/components/card/Card';
import { ProductContext } from '@/src/providers/ProductProvider';
import { Licence } from '@/src/connections/request/Data';
import Icon, { IconType } from '@/src/components/icon';
import PageHeader from '@/src/components/pageHeader';

export default function DetailPage() {
  let iconType;
  let iconColor;
  let isExpired = false;
  let licenceStateText = '';
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  console.log('location', location);
  console.log('id', id);
  const { getProductById } = useContext(ProductContext);
  const [product, setProduct] = useState<Licence | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }

  if (product && product.purchasedLicense?.endDate) {
    if (new Date(product.purchasedLicense?.endDate) > new Date()) {
      iconType = 'check';
      iconColor = 'rgba(120, 250, 174, 1)';
      isExpired = false;
    } else {
      iconType = 'warning';
      iconColor = 'rgba(253, 88, 88, 1)';
      isExpired = true;
    }

    licenceStateText = `${isExpired ? 'Expired on' : 'Active until'} ${formatDate(new Date(product.purchasedLicense.endDate).toString())}`;
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
        <PageHeader title={'Paid services'} backAction={() => {}} />
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={flowColorsRgbaBrandPrimary} />
        </View>
      </BaseContainer>
    );
  }

  if (error || !product || !id) {
    return (
      <BaseContainer>
        <PageHeader title={''} backAction={() => {}} />
        <View style={styles.mainWrapper}>
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
      <PageHeader
        title={'Paid services'}
        backAction={() => navigate(RouteKey.home)}
      />
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
                  color={flowColorsRgbaTextPrimary}
                />
              </View>
              {licenceStateText && (
                <TextParagraph style={styles.text} text={licenceStateText} />
              )}
            </View>
          )}
          <View style={styles.bodyContainer}>
            <Card
              title="Price total"
              description="Including VAT"
              priceValue={product.price}
              actions={
                isExpired && (
                  <StyledButton
                    title="Renew service"
                    onPress={() => console.log('Akce stisknuta!')}
                    style={{ width: '100%' }}
                  />
                )
              }
              onPress={() => console.log('Karta stisknuta!')}
              style={styles.cardFullWidth}
            />
            {product.description && (
              <TextParagraph text={product.description} />
            )}
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  icon: {
    borderRadius: 50,
    padding: 0,
  },
  bodyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    marginBottom: 20,
  },
  cardFullWidth: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: flowColorsRgbaOnSurface800,
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
    fontFamily: flowTypographySmallH1.fontFamily,
    fontSize: parseFloat(flowTypographySmallH1.fontSize),
    fontWeight: flowTypographySmallH1.fontWeight as TextStyle['fontWeight'],
    letterSpacing:
      parseFloat(flowTypographySmallH1.letterSpacing) *
      parseFloat(flowTypographySmallH1.fontSize),
    lineHeight: parseFloat(flowTypographySmallH1.lineHeight),
    textDecorationLine:
      flowTypographySmallH1.textDecoration as TextStyle['textDecorationLine'],
    textTransform:
      flowTypographySmallH1.textTransform as TextStyle['textTransform'],
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
