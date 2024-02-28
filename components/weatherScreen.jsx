import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, FlatList, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import QRCodeIcon from "../assets/icons/QRCodeIcon/QRCodeIcon";

const fetchWeather = async (cityName) => {
    const apiKey = '132568a4e47fb5f6230ca4f3549c8c7e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

const WeatherScreen = ({navigation}) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        loadCities();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const fetchScannedCity = async () => {
                const cityName = await AsyncStorage.getItem('scannedCity');
                if (cityName) {
                    await handleQRScan(cityName);
                    await AsyncStorage.removeItem('scannedCity');
                }
            };

            fetchScannedCity();
        }, [cities])
    );

    const loadCities = async () => {
        const citiesJson = await AsyncStorage.getItem('cities');
        if (citiesJson) {
            setCities(JSON.parse(citiesJson));
        }
    };

    const handleQRScan = async (cityName) => {
        const cityExists = cities.some(city => city.name === cityName);
        if (!cityExists) {
            const weatherData = await fetchWeather(cityName);
            if (weatherData) {
                const newCity = {name: cityName, data: weatherData};
                const newCities = [...cities, newCity];
                setCities(newCities);
                await AsyncStorage.setItem('cities', JSON.stringify(newCities));
            }
        }
    };

    const handleDeleteCity = async (cityName) => {
        const newCities = cities.filter(city => city.name !== cityName);
        setCities(newCities);
        await AsyncStorage.setItem('cities', JSON.stringify(newCities));
    };

    return (
        <View style={styles.container}>
            <QRCodeIcon onPress={() => navigation.navigate('QRScanner')}/>
            <FlatList
                data={cities}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View style={styles.cityItem}>
                        <View>
                            <Text style={styles.cityName}>{item.name}</Text>
                            {item.data.weather && item.data.weather.length > 0 && (
                                <Text style={styles.weatherText}>{item.data.weather[0].main}</Text>
                            )}
                            {item.data.main && (
                                <Text style={styles.tempText}>
                                    {`${(item.data.main.temp - 273.15).toFixed(0)}°C`}
                                </Text>
                            )}
                            {item.data.main && (
                                <Text style={styles.tempText}>
                                    feels like:
                                    {`${(item.data.main.feels_like - 273.15).toFixed(0)}°C`}
                                </Text>
                            )}
                        </View>
                        <TouchableOpacity onPress={() => handleDeleteCity(item.name)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Удалить</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',

    },
    cityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5,
        width: 300,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    cityName: {
        fontSize: 18,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#ffffff',
        fontSize: 14,
    },
    weatherText: {
        fontSize: 16,
        color: '#333',
    },
    tempText: {
        fontSize: 16,
        color: '#555',
    },
});

export default WeatherScreen;


// import React, {useEffect, useState} from 'react';
// import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useIsFocused} from '@react-navigation/native';
//
// const fetchWeather = async (cityName) => {
//     const apiKey = '132568a4e47fb5f6230ca4f3549c8c7e';
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
//
//     try {
//         const response = await fetch(url);
//         return await response.json(); // Возвращает данные о погоде
//     } catch (error) {
//         console.error("Error fetching weather data:", error);
//     }
// };
//
// const HomeScreen = ({navigation}) => {
//     const [cities, setCities] = useState([]);
//     const isFocused = useIsFocused();
//
//     const loadCities = async () => {
//         const citiesJson = await AsyncStorage.getItem('cities');
//         if (citiesJson) {
//             setCities(JSON.parse(citiesJson));
//         }
//     };
//
//     useEffect(() => {
//         if (isFocused) {
//             loadCities();
//         }
//     }, [isFocused]);
//
//     const handleQRScan = async (cityName) => {
//         const weatherData = await fetchWeather(cityName);
//         if (weatherData) {
//             const newCity = {name: cityName, data: weatherData};
//             const newCities = [...cities, newCity];
//             setCities(newCities);
//             await AsyncStorage.setItem('cities', JSON.stringify(newCities));
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <Button title="Scan QR Code" onPress={() => navigation.navigate('QRScanner', {onScan: handleQRScan})}/>
//             <FlatList
//                 data={cities}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({item}) => (
//                     <View>
//                         <Text>{item.name}</Text>
//                         {/* Отображение информации о погоде для каждого города */}
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });
//
// export default HomeScreen;
