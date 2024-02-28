import React from 'react';
import {SafeAreaView, StyleSheet} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WeatherScreen from './components/weatherScreen';
import QRScanner from './components/pages/QRScanner';
import HomeScreen from "./components/pages/HomeScreen";

const Stack = createStackNavigator();

function AppNavigator() {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView style={{paddingTop: insets.top, flex: 1}}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{headerShown: false}}/>
                    <Stack.Screen
                        name="QRScanner"
                        component={QRScanner}
                        options={{title: 'Scan QR Code'}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});
export default AppNavigator;
