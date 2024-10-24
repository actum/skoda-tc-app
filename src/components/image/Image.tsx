// CustomImage.tsx
import React, { useState } from 'react';
import {
  View,
  Image,
  ImageStyle,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
  StyleSheet,
  ImageSourcePropType,
  ImageResizeMode,
} from 'react-native';

interface CustomImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  placeholder?: ImageSourcePropType;
  errorPlaceholder?: ImageSourcePropType;
  onLoad?: () => void;
  onError?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  loadingIndicatorColor?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  source,
  style,
  resizeMode = 'cover',
  placeholder,
  errorPlaceholder,
  onLoad,
  onError,
  containerStyle,
  loadingIndicatorColor = '#000',
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const handleLoad = () => {
    setLoading(false);
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
    if (onError) {
      onError();
    }
  };

  // Vyberte správný zdroj obrázku
  let displaySource: ImageSourcePropType = source;
  if (error && errorPlaceholder) {
    displaySource = errorPlaceholder;
  } else if (loading && placeholder) {
    displaySource = placeholder;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {loading && placeholder && (
        <Image
          source={placeholder}
          style={[style, styles.image]}
          resizeMode={resizeMode}
        />
      )}
      {error && errorPlaceholder && (
        <Image
          source={errorPlaceholder}
          style={[style, styles.image]}
          resizeMode={resizeMode}
        />
      )}
      {!error && (
        <Image
          source={displaySource}
          style={style}
          resizeMode={resizeMode}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      {loading && !placeholder && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={loadingIndicatorColor}
          size="small"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CustomImage;
