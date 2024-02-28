import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useFonts} from "expo-font";
import Header from "../header/Header";
import Main from "../main/Main";
import BottomToolbar from "../footer/bottomToolbar/BottomToolbar";

const HomeScreen = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        'Poppins Medium': require('../../assets/fonts/Poppins Medium.ttf'),
    });



    if (!fontsLoaded) {
        return <View><Text>Loading....</Text></View>;
    } else {
        return (
            <View style={styles.container}>
                <Header navigation={navigation}/>
                <Main/>
                <BottomToolbar navigation={navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        backgroundColor: '#ffffff',

    },
});

export default HomeScreen;


