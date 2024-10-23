import { StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Navigation } from '../navigation/Navigation';
import { CarNavigation } from "@/src/components/car-navigation/CarNavigation";
import useCarState from "@/src/components/carState";

export default function BaseContainer({ children }: { children: ReactNode }) {
    const catState = useCarState()
    return (
        <View style={styles.container}>
            {catState.car && (
                <View style={styles.menu}>
                    <CarNavigation />
                </View>
            )}
            <View style={styles.children}>{children}</View>
            {!catState.car && (
                <View style={styles.navigation}>
                    <Navigation />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    children: {
        height: '100%',
    },
    container: {
        backgroundColor: 'rgba(22, 23, 24, 1)',
        position: 'relative',
    },
    navigation: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        width: '100%',
    },
    menu: {
        width: '100%',
    }
});