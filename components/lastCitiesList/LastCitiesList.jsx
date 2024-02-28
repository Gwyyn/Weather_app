import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, ScrollView} from "react-native";
import RadioButtonTrue from "../../assets/icons/radioButton/radioButtonTrue/RadioButtonTrue";
import RadioButtonFalse from "../../assets/icons/radioButton/radioButtonFalse/RadioButtonFalse";

const LastCitiesList = ({cities, selectCity, lastCityName}) => {

    return (
        <ScrollView style={styles.lastCitiesListContainer}>
            {cities.slice(0, 5).map((city, index) => (
                <View key={index}>
                    <TouchableOpacity
                        key={city.name}
                        onPress={() => selectCity(city.name)}
                        style={[
                            styles.cityItem,
                            city.name === lastCityName ? styles.selectedCity : styles.unselectedCity,
                        ]}
                    >
                        <Text style={styles.nameCities}>{city.name}</Text>
                        {city.name === lastCityName ? <RadioButtonTrue/> : <RadioButtonFalse/>}
                    </TouchableOpacity>
                    <View style={[
                        styles.divider,
                        city.name === lastCityName ? styles.selectedCity : styles.unselectedCity
                    ]}/>
                </View>
            ))}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    lastCitiesListContainer: {
        backgroundColor: "#F8F8F8",
        width: "100%",
        height: '23%', // Пример ограничения максимальной высоты списка
        paddingBottom: 80, // Пример отступа снизу
        borderRadius: 20,
        padding: 15,
        paddingTop: 7,
    },
    cityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        margin: 5,
        borderRadius: 5,
    },
    selectedCity: {
        // backgroundColor: 'lightblue',
    },
    unselectedCity: {
        opacity: 0.4
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',

    },
    nameCities: {
        fontSize: 14,
        fontFamily: "Poppins Medium"
    },

});


export default LastCitiesList;