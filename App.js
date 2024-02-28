import React from 'react';
import AppNavigator from './AppNavigator';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider>
            <AppNavigator/>
        </SafeAreaProvider>
    );
}