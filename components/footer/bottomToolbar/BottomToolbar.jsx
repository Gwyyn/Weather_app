import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Home from "../../../assets/icons/bottomToolBarIcons/home/Home";
import Weather from "../../../assets/icons/bottomToolBarIcons/weather/Weather";
import Profile from "../../../assets/icons/bottomToolBarIcons/profile/Profile";

const BottomToolbar = ({navigation}) => {
    return (
        <View style={styles.toolbar}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Home/>
                <Text style={styles.buttonTextHome}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Weather/>
                <Text style={styles.buttonText}>Weather</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Profile/>
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#F9F9F9',
        borderRadius: 20,

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextHome: {
        fontFamily: 'Poppins Medium',
        fontSize: 10,
    },
    buttonText: {
        fontFamily: 'Poppins Medium',
        fontSize: 10,
        color: '#909090',
    },
});

export default BottomToolbar;
