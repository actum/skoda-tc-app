// DetailPage.tsx
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import BaseContainer from '@/src/components/containers/BaseContainer';
import StyledButton from '@/src/components/button/StyledButton';
import { RouteKey } from '@/src/components/navigation/Navigation';
import { useNavigate, useParams } from 'react-router-native';
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
import { CardItemsContext } from '@/src/providers/CardItemsProvider';
import Accordion from '@/src/components/accordion/Accordion';
import { BackLinkContext } from '@/src/providers/BackLinkProvider';
import useCarState from '@/src/components/carState';
import formatPrice from '@/src/helpers/price';

export default function DetailPage() {
  const { car } = useCarState();
  const ctxBackLink = useContext(BackLinkContext);
  let iconType: IconType | null = null;
  let iconColor: string = '';
  let isExpired = false;
  let licenceStateText = '';

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useContext(ProductContext);
  const [product, setProduct] = useState<Licence | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const ctxCard = useContext(CardItemsContext);

  const styles = StyleSheet.create({
    bodyContainer: {
      alignItems: 'center',
      gap: 16,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    carIconContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'flex-start',
    },
    card: {
      marginBottom: 20,
    },
    cardFullWidth: {
      backgroundColor: flowColorsRgbaOnSurface800,
      marginBottom: 20,
      width: '100%',
    },
    errorText: {
      color: flowColorsRgbaSemanticAlert,
      fontSize: 18,
      textAlign: 'center',
    },
    icon: {
      borderRadius: 50,
      padding: 0,
    },
    iconContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
      justifyContent: 'flex-start',
      paddingHorizontal: 16,
    },
    image: {
      borderRadius: 10,
      height: '100%',
      width: '100%',
    },
    imageContainer: {
      height: car ? 300 : 250,
      position: 'relative',
      width: '100%', // Musí odpovídat výšce obrázku
    },
    imageFullWidth: {
      width: '100%', // Nastavení šířky na 100%
      height: '100%',
      aspectRatio: 16 / 9, // Udržuje poměr stran 16:9
      borderRadius: 10,
    },
    loader: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    mainWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      paddingBottom: car ? 0 : 30,
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
    titleContainer: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingHorizontal: 16,
    },
  });

  const mockAccordionData = [
      {
          id: 1,
          title: 'Product Information',
          content:
              'This is a detailed description of the product, containing all the important information and specifications.',
      },
      {
          id: 2,
          title: 'Customer Reviews',
          content:
              'Here you will find reviews and ratings from our satisfied customers.',
      },
      {
          id: 3,
          title: 'Specifications',
          content:
              'Detailed technical specifications of the product, including materials and dimensions.',
      },
      {
          id: 4,
          title: 'Frequently Asked Questions',
          content: 'Answers to the most common questions regarding our product.',
      },
      {
          id: 5,
          title: 'Warranty and Support',
          content: 'Information about warranties, service, and support for our product.',
      },
      {
          id: 6,
          title: 'Guides and Manuals',
          content:
              'Access to guides and user manuals for the effective use of the product.',
      },
  ];

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  }

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      setLoading(false);
      setError('ID produktu není k dispozici.');
    }
  }, [id]);

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

  function getImage(product: Licence) {
    switch (product.code) {
      case 'PR0001':
        return require(`../assets/images/products/PR0001.png`);
      case 'PR0002':
        return require(`../assets/images/products/PR0002.png`);
      case 'PR0003':
        return require(`../assets/images/products/PR0003.png`);
      case 'PR0004':
        return require(`../assets/images/products/PR0004.png`);
      default:
        return require(`../assets/images/products/traffication.png`);
    }
  }

  function renewService(product: Licence) {
    ctxCard.setItems([product]);
    ctxBackLink.setBackLink(RouteKey.detail.replace(':id', product.code));
    navigate(RouteKey.checkout);
  }

  // Nastavení ikony a barvy na základě expirace
  if (product && product.purchasedLicense?.endDate) {
    if (new Date(product.purchasedLicense.endDate) > new Date()) {
      iconType = 'check';
      iconColor = 'rgba(120, 250, 174, 1)';
      isExpired = false;
    } else {
      iconType = 'warning';
      iconColor = 'rgba(253, 88, 88, 1)';
      isExpired = true;
    }

    licenceStateText = `${isExpired ? 'Expired on' : 'Active until'} ${formatDate(
      new Date(product.purchasedLicense.endDate).toString(),
    )}`;
  }

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
        <PageHeader title={'Paid services'} backAction={() => {}} />
        <View style={styles.mainWrapper}>
          <CustomImage
            source={require('../assets/images/404.png')}
            placeholder={require('../assets/images/placeholder.webp')}
            errorPlaceholder={require('../assets/images/missing-image.webp')}
            style={styles.image}
            loadingIndicatorColor={flowColorsRgbaBrandPrimary}
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

  if (car) {
    return (
      <BaseContainer>
        {/* PageHeader Absolutně Umístěn nad obrázek */}
        <PageHeader
          title={car ? product.name : ''} // Prázdný nadpis
          backAction={() => navigate(RouteKey.home)}
        />
        <View style={car ? { height: '44%' } : { flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                paddingHorizontal: 83,
                paddingTop: 40,
              }}
            >
              <View style={{ flex: 1, flexDirection: 'column', gap: 30 }}>
                {iconType && product.purchasedLicense && (
                  <View style={styles.carIconContainer}>
                    <View style={[styles.icon, { backgroundColor: iconColor }]}>
                      <Icon
                        type={iconType as IconType}
                        size={28}
                        color={flowColorsRgbaTextPrimary}
                      />
                    </View>
                    {licenceStateText && (
                      <TextParagraph
                        style={[styles.text, { fontSize: 26 }]}
                        text={licenceStateText}
                      />
                    )}
                  </View>
                )}
                <View>
                  {product.description && (
                    <TextParagraph text={product.description} fontSize={24} />
                  )}
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.imageContainer}>
                  <CustomImage
                    source={getImage(product)}
                    placeholder={require('../assets/images/placeholder.webp')} // Lokální obrázek jako placeholder
                    errorPlaceholder={require('../assets/images/missing-image.webp')} // Lokální obrázek jako chybový placeholder
                    style={styles.imageFullWidth}
                    loadingIndicatorColor={flowColorsRgbaBrandPrimary}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={{ height: '20%' }}>
          <View
            style={{
              backgroundColor: '#303132',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 30,
              paddingTop: 5,
              height: 100,
              paddingVertical: 10,
            }}
          >
            <View style={{ flexDirection: 'row', gap: 25 }}>
              <TouchableOpacity
                style={{ paddingTop: 5 }}
                onPressOut={() => {
                  navigate(RouteKey.home);
                }}
              >
                <Icon type={'arrow'} size={32} color={'white'} />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 28,
                  }}
                >
                  Price {formatPrice(product.price.toString())} CZK
                </Text>
                <Text
                  style={{
                    color: '#C4C6C7',
                    fontFamily: 'SKODA Next',
                    fontSize: car ? 22 : 16,
                    paddingLeft: car ? 16 : 0,
                  }}
                >
                  including VAT
                </Text>
              </View>
            </View>
            <View
              style={car ? { alignItems: 'center', paddingTop: 10 } : undefined}
            >
              <StyledButton
                fontSize={car ? 24 : undefined}
                title={'Renew service'}
                onPress={(e) => {
                  renewService(product);
                }}
              />
            </View>
          </View>
        </View>
      </BaseContainer>
    );
  }

  return (
    <BaseContainer>
      {/* PageHeader Absolutně Umístěn nad obrázek */}
      <ScrollView style={{ marginBottom: 80 }}>
        <View style={styles.mainWrapper}>
          {/* Container pro obrázek */}
          <View style={styles.imageContainer}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10,
              }}
            >
              <PageHeader
                title={car ? product.name : ''}
                backAction={() => navigate(RouteKey.home)}
              />
            </View>
            <CustomImage
              source={getImage(product)}
              placeholder={require('../assets/images/placeholder.webp')} // Lokální obrázek jako placeholder
              errorPlaceholder={require('../assets/images/missing-image.webp')} // Lokální obrázek jako chybový placeholder
              style={styles.imageFullWidth}
              loadingIndicatorColor={flowColorsRgbaBrandPrimary}
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
                    onPress={() => {
                      renewService(product);
                    }}
                    style={{ width: '100%' }}
                  />
                )
              }
              style={styles.cardFullWidth}
            />
            {product.description && (
              <TextParagraph text={product.description} />
            )}
            {mockAccordionData.map((item) => (
              <Accordion
                key={item.id}
                title={item.title}
                initiallyExpanded={false}
              >
                <TextParagraph text={item.content} />
              </Accordion>
            ))}
          </View>
        </View>
      </ScrollView>
    </BaseContainer>
  );
}
