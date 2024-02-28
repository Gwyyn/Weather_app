import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const FeelsLikeTemperature = ({todayForecast}) => {
    return (
        <View style={styles.tempContainer}>
            <Text style={styles.feelsLike}>
                feels like {todayForecast && todayForecast.feelsLike}°C
            </Text>
        </View>
    );
};


const styles = StyleSheet.create({
    tempContainer: {
        flexDirection: "row",
    },
    feelsLike: {
        fontFamily: "Poppins Medium",
        fontSize: 14
    },
});

export default FeelsLikeTemperature;