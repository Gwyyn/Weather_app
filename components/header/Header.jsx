import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import Avatar from "../../assets/icons/avatar/Avatar";
import QRCodeIcon from "../../assets/icons/QRCodeIcon/QRCodeIcon";

const Header = ({navigation}) => {
    return (
        <View style={styles.header}>
            <View style={styles.userWithAvatar}>
                <Avatar/>
                <Text style={styles.userName}>Hello, user!</Text>
            </View>
            <QRCodeIcon onPress={() => navigation.navigate('QRScanner')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    userWithAvatar: {
        flex: 1,
        flexDirection: "row",

    },
    userName: {
        fontFamily: "Poppins Medium",
        fontSize: 24,
        paddingLeft: 13,
    },
});

export default Header;