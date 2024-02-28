import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {fetchWeather} from "../fetch requests/WeatherRequest";
import GetWeatherImg from "../getWeatherImg/GetWeatherImg";
import Cards from "../cards/Cards";
import MainCity from "./mainCity/mainCity";
import Temperature from "./temperature/Temperature";
import FeelsLikeTemperature from "./feelsLikeTemperature/FeelsLikeTemperature";
import ModalListCities from "../modalListCities/ModalListCities";
import LastCitiesList from "../lastCitiesList/LastCitiesList";

const Main = () => {
    const [cities, setCities] = useState([]);
    const [todayForecast, setTodayForecast] = useState(null);
    const [nextDaysForecast, setNextDaysForecast] = useState([]);
    const [lastCityName, setLastCityName] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0)); // Для анимации появления и исчезновения


    useEffect(() => {
        async function fetchData() {
            await loadCities();
            setIsLoading(false);

        }

        fetchData();
    }, []);

    useEffect(() => {
        if (cities.length > 0 && lastCityName) {
            const lastCity = cities.find(city => city.name === lastCityName);
            if (lastCity) {
                const {name, data} = lastCity;
                const currentTemp = data[0].main.feels_like;
                processForecastData(data, name, currentTemp);
            }
        }
    }, [lastCityName]);

    useEffect(() => {
        toggleModal();
    }, [isModalVisible]);

    const toggleModal = () => {
        if (isModalVisible) {
            Animated.timing(animation, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
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
        const lastCityName = await AsyncStorage.getItem('lastCity');
        if (citiesJson) {
            const loadedCities = JSON.parse(citiesJson);
            setCities(loadedCities);
        }
        setLastCityName(lastCityName);
    };

    const handleQRScan = async (cityName) => {
        const cityExists = cities.some(city => city.name === cityName);
        if (!cityExists) {
            const weatherData = await fetchWeather(cityName);
            if (weatherData) {
                const currentTemp = weatherData[0].main.feels_like;
                processForecastData(weatherData, cityName, currentTemp);
                const newCity = {name: cityName, data: weatherData};
                const newCities = [newCity, ...cities];
                setCities(newCities);
                await AsyncStorage.setItem('cities', JSON.stringify(newCities));
                await AsyncStorage.setItem('lastCity', cityName);
                setLastCityName(cityName);

            }
        }
    };

    const processForecastData = (forecastData, cityName, currentTemp) => {
        const dailyData = forecastData.reduce((acc, value) => {
            const date = new Date(value.dt * 1000);
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`; // Форматирование даты в дд.мм
            if (!acc[formattedDate]) {
                acc[formattedDate] = {temps: [], conditions: {}};
            }
            acc[formattedDate].temps.push(value.main.temp);
            const condition = value.weather[0].main; // Предполагаем, что есть хотя бы одно погодное условие
            if (acc[formattedDate].conditions[condition]) {
                acc[formattedDate].conditions[condition] += 1;
            } else {
                acc[formattedDate].conditions[condition] = 1;
            }
            return acc;
        }, {});

        const dailyAverage = Object.keys(dailyData).map((formattedDate) => {
            const dayData = dailyData[formattedDate];
            const avgTemp = dayData.temps.reduce((acc, value) => acc + value, 0) / dayData.temps.length;
            const mostCommonCondition = Object.keys(dayData.conditions).reduce((a, b) => dayData.conditions[a] > dayData.conditions[b] ? a : b);
            return {date: formattedDate, avgTemp: avgTemp.toFixed(0), mostCommonCondition};
        });

        if (dailyAverage.length > 0) {
            setTodayForecast({
                ...dailyAverage[0],
                name: cityName,
                feelsLike: currentTemp.toFixed(0),
            });
            setNextDaysForecast(dailyAverage.slice(1, 5));
        }
    };

    const removeCity = async (cityName) => {
        const filteredCities = cities.filter(city => city.name !== cityName);
        setCities(filteredCities);
        await AsyncStorage.setItem('cities', JSON.stringify(filteredCities));

        // Если удаляемый город был последним выбранным, устанавливается todayForecast в последний город в списке
        if (todayForecast && todayForecast.name === cityName) {
            if (filteredCities.length > 0) {
                const lastCity = filteredCities[filteredCities.length - 1];
                await selectCity(lastCity.name); // Использование selectCity для загрузки данных последнего города
            } else {
                setTodayForecast(null);// Если больше нет городов, сбросить todayForecast
                setIsModalVisible(false);
            }
        }
    };

    const selectCity = async (cityName) => {
        const selectedCity = cities.find(city => city.name === cityName);
        if (selectedCity) {
            const {name, data} = selectedCity;
            const currentTemp = data[0].main.feels_like;
            processForecastData(data, name, currentTemp);
            await AsyncStorage.setItem('lastCity', cityName);
            setLastCityName(cityName);

        }
        setIsModalVisible(false);
    };

    const cleanAllCities = async () => {
        setCities([]);
        await AsyncStorage.removeItem('cities');
        await AsyncStorage.removeItem('lastCity');
        setIsModalVisible(false);
    };


    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (cities.length > 0) {
        return (
            <View style={styles.mainContainer}>
                <MainCity setIsModalVisible={setIsModalVisible} todayForecast={todayForecast}/>

                <Temperature todayForecast={todayForecast}/>

                <FeelsLikeTemperature todayForecast={todayForecast}/>

                <View style={styles.WeatherIcon}>
                    <GetWeatherImg weatherData={todayForecast}/>
                </View>

                <View>
                    <Text style={styles.fiveDaysText}>
                        Next 4 days
                    </Text>
                </View>

                <Cards nextDaysForecast={nextDaysForecast}/>
                <View style={styles.lastCitiesContainer}>
                    <Text style={styles.lastCitiesText}>Last 5 added cities</Text>
                    <LastCitiesList
                        cities={cities}
                        selectCity={selectCity}
                        lastCityName={lastCityName}
                    />
                </View>
                <ModalListCities
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    animation={animation}
                    cities={cities}
                    selectCity={selectCity}
                    removeCity={removeCity}
                    cleanAllCities={cleanAllCities}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.emptyApp}>
                <Text style={styles.emptyAppText}>
                    Click on the QR-code button and scan for weather data of your favourite city! :)
                </Text>
            </View>
        )
    }


};

const styles = StyleSheet.create({
    lastCitiesContainer:{
        width: "90%",
        alignItems: "center",
    },
    lastCitiesText: {
        paddingTop: 5,
        fontSize: 14,
        fontFamily: "Poppins Medium",
    },


    emptyApp: {
        flex: 1,
        paddingTop: 150,
        paddingLeft: 25,
        width: "90%",
    },
    emptyAppText: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: "Poppins Medium",
        color: '#3a3838',
    },
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        paddingTop: 19,
    },
    fiveDaysText: {
        fontFamily: "Poppins Medium",
        fontSize: 14
    },
    WeatherIcon: {
        alignItems: "center",
        justifyContent: "center",
        height: 180
    },
});

export default Main;