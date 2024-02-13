import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to this App</Text>
            <Text style={styles.subtitle}>In this app you can use calculator</Text>
            <Text style={styles.subtitle}>Save and delete contacts and also view your profile</Text>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>let's get started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6E6FA',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#715b8f',
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
        color: 'black',
    },
    button: {
        backgroundColor: '#715b8f',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default HomeScreen;
