import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = () => {
    const [profileImage, setProfileImage] = useState(null);

    // Function to handle image picking from gallery
    const pickImageFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfileImage(result.uri);
        }
    };

    // Function to handle image capture from camera
    const takePicture = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfileImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
                <Text>No profile image selected</Text>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={pickImageFromGallery} style={styles.button}>
                    <Text style={styles.buttonText}>Choose from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={takePicture} style={styles.button}>
                    <Text style={styles.buttonText}>Take Picture</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
