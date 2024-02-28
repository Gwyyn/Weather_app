import React, {useState, useEffect} from "react";
import {Text, View, StyleSheet, Button} from "react-native";
import {CameraView, Camera} from "expo-camera/next";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QRScanner({navigation, route}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({type, data}) => {
        setScanned(true);
        // Функция onScan, переданная через параметры маршрута, и передается ей название города
        await AsyncStorage.setItem('scannedCity', data);
        navigation.goBack();
    };


    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barCodeTypes: ["qr", "pdf417"],
                }}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.overlay} />
            <View style={styles.transparentSquare} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    transparentSquare: {
        position: 'absolute',
        height: 250,
        width: 250,
        borderColor: 'white',
        borderWidth: 2,
        backgroundColor: 'transparent',
    },
});

