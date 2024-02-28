import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Pencil from "../../../assets/icons/pencil/pencil";

const MainCity = ({setIsModalVisible, todayForecast}) => {
    return (
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <View style={styles.mainCity}>
                <Text style={styles.cityText}>
                    {todayForecast ? todayForecast.name : 'Choose city'}
                </Text>

                <Pencil onPress={() => setIsModalVisible(true)}/>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    mainCity: {
        flexDirection: "row",
        alignItems: "center",
    },
    cityText: {
        fontSize: 22,
        color: '#939393',
        fontFamily: "Poppins Medium",
        paddingRight: 6,
    },
});

export default MainCity;