import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Button, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import ContactScreen from './screens/ContactScreen';
import ProfileScreen from './screens/Profile';
import InternetConnection from './screens/InternetConnection';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const Profile = ({ focused, color, size }) => (
  <Ionicons name='person' size={size + 5} color={focused ? 'blue' : 'gray'} />
);

const H = ({ focused, color, size }) => (
  <Ionicons name='home' size={size + 5} color={focused ? 'blue' : 'gray'} />
);

const Calculator = ({ focused, color, size }) => (
  <Ionicons name='calculator' size={size + 5} color={focused ? 'blue' : 'gray'} />
);

const Contact = ({ focused, color, size }) => (
  <Ionicons name='person' size={size + 5} color={focused ? 'blue' : 'gray'} />
);

const AsyncStorageScreen = ({ navigation }) => {
  const [storedData, setStoredData] = useState('');
  const [inputText, setInputText] = useState('');

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ width: '70%', height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Please enter data"
        onChangeText={text => setInputText(text)}
        value={inputText}
      />
      <Button title="Insert  Data" onPress={storeData} />
      <Button title="Display Data" onPress={getData} />
      <Button title="Remove Data" onPress={removeData} />
      {storedData ? <Text style={{ marginTop: 20 }}>Stored Data: {storedData}</Text> : null}
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={TabNavigator} options={{ drawerIcon: H }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerIcon: Profile }} />
        <Drawer.Screen name="Calculator" component={CalculatorScreen} options={{ drawerIcon: Calculator }} />
        <Drawer.Screen name="Contacts" component={ContactScreen} options={{ drawerIcon: Contact }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }} />
      <Tab.Screen
        name='Calculator'
        component={CalculatorScreen}
        options={{
          tabBarLabel: "Calculator",
          tabBarIcon: ({ color }) => (
            <Ionicons name='calculator' size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Contact'
        component={ContactScreen}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ color }) => (
            <Ionicons name='person' size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='AsyncStorage'
        component={AsyncStorageScreen}
        options={{
          tabBarLabel: "AsyncStorage",
          tabBarIcon: ({ color }) => (
            <Ionicons name='cloud-upload-outline' size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='WI-FI'
        component={InternetConnection}
        options={{
          tabBarLabel: "Internet",
          tabBarIcon: ({ color }) => (
            <Ionicons name='wifi' size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

});


