import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Image source={{ uri:"https://picsum.photos/300" }}
                style={{ width: 300, height: 300 }} />
            <Text style={styles.text}>Email: tumukunde@gmail.com</Text>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6E6FA',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 16,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#715b8f',
    },
});
