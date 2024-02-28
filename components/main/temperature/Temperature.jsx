import React from 'react';
import {StyleSheet, Text, View} from "react-native";

const Temperature = ({todayForecast}) => {
    return (
        <View style={styles.tempContainer}>
            <Text style={styles.temperature}>
                {todayForecast && todayForecast.avgTemp}
            </Text>
            <Text style={styles.degree}>
                °
            </Text>
            <Text style={styles.temperature}>
                C
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({

    tempContainer: {
        flexDirection: "row",
    },
    temperature: {
        fontFamily: "Poppins Medium",
        fontSize: 38.4
    },
    degree: {
        fontFamily: "Poppins Medium",
        fontSize: 20
    },

});

export default Temperature;