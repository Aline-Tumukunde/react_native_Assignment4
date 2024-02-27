import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://picsum.photos/100/200' }}
                style={styles.backgroundImage}>
                <View style={styles.body}>
                    <Text style={styles.title}>Welcome to MyApp</Text>
                    <Text style={styles.subtitle}>In this app you can use calculator</Text>
                    <Text style={styles.subtitle}>Access local Contacts, you can edit your profile</Text>
                    <Text style={styles.subtitle}>Switch themes and sign in/Sign up using Google</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Let's Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        paddingTop: 50,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#715b8f',
        fontFamily: 'Courier New',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 24,
        marginBottom: 10,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Courier New',
    },
    button: {
        backgroundColor: '#715b8f',
        paddingHorizontal: 20,
        paddingVertical: 50,
        borderRadius: 5,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Courier New',
    },
});

export default HomeScreen;
