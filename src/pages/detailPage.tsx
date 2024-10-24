// DetailPage.tsx
import {ActivityIndicator, ScrollView, StyleSheet, Text, TextStyle, View,} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import BaseContainer from '@/src/components/containers/BaseContainer';
import StyledButton from '@/src/components/button/StyledButton';
import {RouteKey} from '@/src/components/navigation/Navigation';
import {useNavigate, useParams} from 'react-router-native';
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
import {ProductContext} from '@/src/providers/ProductProvider';
import {Licence} from '@/src/connections/request/Data';
import Icon, {IconType} from '@/src/components/icon';
import PageHeader from '@/src/components/pageHeader';
import {CardItemsContext} from '@/src/providers/CardItemsProvider';
import Accordion from '@/src/components/accordion/Accordion';

export default function DetailPage() {
    let iconType: IconType | null = null;
    let iconColor: string = '';
    let isExpired = false;
    let licenceStateText = '';
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();

    const {getProductById} = useContext(ProductContext);
    const [product, setProduct] = useState<Licence | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const ctxCard = useContext(CardItemsContext);

    // Mock data pro Accordion
    const mockAccordionData = [
        {
            id: 1,
            title: 'Informace o produktu',
            content:
                'Toto je podrobný popis produktu, který obsahuje všechny důležité informace a specifikace.',
        },
        {
            id: 2,
            title: 'Recenze zákazníků',
            content:
                'Zde najdete recenze a hodnocení od našich spokojených zákazníků.',
        },
        {
            id: 3,
            title: 'Specifikace',
            content:
                'Detailní technické specifikace produktu, včetně materiálů a rozměrů.',
        },
        {
            id: 4,
            title: 'Často kladené otázky',
            content: 'Odpovědi na nejčastější otázky týkající se našeho produktu.',
        },
        {
            id: 5,
            title: 'Záruka a podpora',
            content: 'Informace o zárukách, servisu a podpoře pro náš produkt.',
        },
        {
            id: 6,
            title: 'Návody a příručky',
            content:
                'Přístup k návodům a uživatelským příručkám pro efektivní využití produktu.',
        },
    ];

    // Formátování data
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
                <PageHeader title={'Paid services'} backAction={() => {
                }} />
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color={flowColorsRgbaBrandPrimary} />
                </View>
            </BaseContainer>
        );
    }

    // Zobrazit Chybu
    if (error || !product || !id) {
        return (
            <BaseContainer>
                <PageHeader title={'Paid services'} backAction={() => {
                }} />
                <View style={styles.mainWrapper}>
                    <CustomImage
                        source={require('../assets/images/404.png')}
                        placeholder={require('../assets/images/placeholder.webp')} // Lokální obrázek jako placeholder
                        errorPlaceholder={require('../assets/images/missing-image.webp')} // Lokální obrázek jako chybový placeholder
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

    return (
        <BaseContainer>
            {/* PageHeader Absolutně Umístěn nad obrázek */}
            <PageHeader
                title={''} // Prázdný nadpis
                backAction={() => navigate(RouteKey.home)}
            />
            <ScrollView style={{marginBottom: 80}}>
                <View style={styles.mainWrapper}>
                    {/* Container pro obrázek */}
                    <View style={styles.imageContainer}>
                        <CustomImage
                            source={require('../assets/images/products/1.png')}
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
                            <View style={[styles.icon, {backgroundColor: iconColor}]}>
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
                                            ctxCard.setItems([product]);
                                            navigate(RouteKey.checkout);
                                        }}
                                        style={{width: '100%'}}
                                    />
                                )
                            }
                            style={styles.cardFullWidth}
                        />
                        {product.description && (
                            <TextParagraph text={product.description} />
                        )}
                        {/* Dynamické vykreslení Accordion sekcí z mock dat */}
                        {mockAccordionData.map((item) => (
                            <Accordion
                                key={item.id}
                                title={item.title}
                                initiallyExpanded={false}
                            >
                                <TextParagraph text={item.content} />
                            </Accordion>
                        ))}
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
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 250, // Musí odpovídat výšce obrázku
    },
    mainWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
    },
    titleContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
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
    iconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
    },
    icon: {
        borderRadius: 50,
        padding: 0,
    },
    bodyContainer: {
        alignItems: 'center',
        gap: 16,
        justifyContent: 'center',
        paddingHorizontal: 16,
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
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
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
});
