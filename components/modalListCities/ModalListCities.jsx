import React from 'react';
import {Animated, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Cross from "../../assets/icons/cross/Cross";
import Tresh from "../../assets/icons/tresh/Tresh";

const ModalListCities = ({isModalVisible, setIsModalVisible, animation, cities, selectCity, removeCity, cleanAllCities}) => {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={() => setIsModalVisible(false)}
            >
                <Animated.View
                    style={[styles.modalView, {
                        opacity: animation,
                        transform: [{scale: animation}]
                    }]}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Edit cities</Text>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Cross style={styles.closeButtonText}/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.scrollViewStyle}>
                        {cities.length > 0 ? (
                            cities.map((city, index) => (
                                <View key={index}>
                                    <TouchableOpacity style={styles.cityItem}
                                                      onPress={() => selectCity(city.name)}>
                                        <Text style={styles.cityName}>
                                            {city.name}
                                        </Text>
                                        <TouchableOpacity onPress={() => removeCity(city.name)}
                                                          style={styles.removeCityButton}>
                                            <Tresh/>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <View style={styles.divider}/>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.emptyListText}>Scan the qr-code to set the city</Text>
                        )
                        }

                    </ScrollView>
                    <TouchableOpacity onPress={cleanAllCities} style={styles.cleanAllButton}>
                        <Text style={styles.cleanAllButtonText}>Clean All</Text>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон для тени
    },
    emptyListText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    cleanAllButtonText: {
        color: '#E72E2E',
        fontSize: 16,
        fontFamily: "Poppins Medium"
    },
    cleanAllButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    scrollViewStyle: {
        width: '100%',
    },
    cityItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    removeCityButton: {
        padding: 7,
        marginLeft: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#E0E0E0',

    },
    modalView: {
        width: 300,
        height: 450,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    modalHeader: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        paddingTop: 2,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 3,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cityName: {
        fontFamily: "Poppins Medium",
        fontSize: 16,
        marginRight: 10,
    },
});


export default ModalListCities;