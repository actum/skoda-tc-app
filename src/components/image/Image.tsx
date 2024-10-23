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
  ImageURISource,
} from 'react-native';

interface CustomImageProps {
  source: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  placeholder?: ImageSourcePropType | React.ReactNode;
  errorPlaceholder?: ImageSourcePropType | React.ReactNode;
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

  let displaySource:
    | ImageURISource
    | ImageURISource[]
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | boolean = source;

  if (error && errorPlaceholder) {
    displaySource = errorPlaceholder;
  } else if (loading && placeholder) {
    displaySource = placeholder;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {loading && !placeholder && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={loadingIndicatorColor}
          size="small"
        />
      )}
      <Image
        // @ts-ignore
        source={displaySource}
        style={style}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
      />
      {error && errorPlaceholder && typeof errorPlaceholder !== 'number' && (
        <View style={[styles.placeholderContainer, style]}>
          {errorPlaceholder}
        </View>
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
  placeholderContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomImage;
