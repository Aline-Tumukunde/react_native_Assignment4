import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
    const [inputText, setInputText] = useState('');
    const [storedData, setStoredData] = useState('');

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('myKey', inputText);
            Alert.alert('Success', 'Data stored successfully!');
        } catch (error) {
            console.error('Error storing data: ', error);
            Alert.alert('Error', 'Failed to store data');
        }
    };

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('myKey');
            if (value !== null) {
                setStoredData(value);
            } else {
                Alert.alert('Error', 'No data found for the given key');
            }
        } catch (error) {
            console.error('Error retrieving data: ', error);
            Alert.alert('Error', 'Failed to retrieve data');
        }
    };

    const removeData = async () => {
        try {
            await AsyncStorage.removeItem('myKey');
            Alert.alert('Success', 'Data removed successfully!');
            setStoredData('');
        } catch (error) {
            console.error('Error removing data: ', error);
            Alert.alert('Error', 'Failed to remove data');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter data"
                onChangeText={text => setInputText(text)}
                value={inputText}
            />
            <Button title="Store Data" onPress={storeData} />
            <Button title="Get Data" onPress={getData} />
            <Button title="Remove Data" onPress={removeData} />
            {storedData ? <Text style={styles.storedData}>Stored Data: {storedData}</Text> : null}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    storedData: {
        marginTop: 20,
    },
});

export default App;
