import React from 'react';
import { NativeRouter } from 'react-router-native';
import { View } from 'react-native';
import { AppRoutes } from './Routes';
import FlashMessage from 'react-native-flash-message';

export default function Router() {
  return (
    <NativeRouter>
      <View>
        <AppRoutes />
        <FlashMessage
          duration={10000}
          position="top"
          hideOnPress
          style={{
            paddingTop: 40,
          }}
        />
      </View>
    </NativeRouter>
  );
}
