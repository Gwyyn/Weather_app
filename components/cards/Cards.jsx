import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, Text} from "react-native";

const Cards = ({nextDaysForecast}) => {

    return (
        <View style={styles.cardContainer}>
            <ScrollView horizontal={true} style={styles.scrollContainer}>
                {nextDaysForecast.map((day) => (
                    <View key={day.date} style={styles.card}>
                        <Text style={styles.dataText}>
                            {day.date}
                        </Text>
                        <Text style={styles.degreesCard}>
                            {day.avgTemp} °C
                        </Text>
                        <Text style={styles.dataText}>
                            {day.mostCommonCondition}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        height: 105,
    },
    scrollContainer: {

    },
    card: {
        height: 95,
        width: 72,
        borderRadius: 20,
        backgroundColor: "#F8F8F8",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "space-between",
        justifyContent: "space-evenly",
        margin: 7,
        padding: 10,
    },
    dataText: {
        color: "#939393",
    },
    degreesCard: {
        fontSize: 16,
        color: "#116DE8"
    },
});

export default Cards;