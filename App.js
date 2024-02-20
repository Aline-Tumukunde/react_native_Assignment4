
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, Button, TextInput, Alert } from 'react-native'; // Import TextInput here
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import ContactScreen from './screens/ContactScreen';
import ProfileScreen from './screens/Profile';
import InternetConnection from './screens/InternetConnection';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [theme, setTheme] = useState(DefaultTheme);
  const [currentThemeText, setCurrentThemeText] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const loadTheme = async () => {
    const savedTheme = await getTheme();
    setTheme(savedTheme === 'dark' ? DarkTheme : DefaultTheme);
    setCurrentThemeText(savedTheme === 'dark' ? 'Dark Theme' : 'Light Theme');
    setIsDarkTheme(savedTheme === 'dark');
  };

  useEffect(() => {
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    setAsyncStorageTheme(newTheme);
    setTheme(newTheme === 'dark' ? DarkTheme : DefaultTheme);
    setCurrentThemeText(newTheme === 'dark' ? 'Dark Theme' : 'Light Theme');
  };

  const AsyncStorageIcon = ({ focused, color, size }) => (
    <Ionicons name='cloud-upload-outline' size={size + 5} color={focused ? 'blue' : 'gray'} />
  );


  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={theme}>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={TabNavigator} options={{ drawerIcon: H }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerIcon: Profile }} />
          <Drawer.Screen name="Calculator" component={CalculatorScreen} options={{ drawerIcon: Calculator }} />
          <Drawer.Screen name="Contacts" component={ContactScreen} options={{ drawerIcon: Contact }} />
          <Drawer.Screen name="AsyncStorage" component={AsyncStorageScreen} options={{ drawerIcon: AsyncStorageIcon }} />

        </Drawer.Navigator>
      </NavigationContainer>
      <View style={styles.themeSwitchContainer}>
        {/* <Text>Current Theme: {currentThemeText}</Text> */}
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
        {/* <Button title="Change Theme" onPress={toggleTheme} /> */}
      </View>
    </View>
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
      {/* <Tab.Screen
        name='AsyncStorage'
        component={AsyncStorageScreen}
        options={{
          tabBarLabel: "AsyncStorage",
          tabBarIcon: ({ color }) => (
            <Ionicons name='cloud-upload-outline' size={30} color={color} />
          ),
        }}
      /> */}
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
  themeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  }
});

// Mock implementation of AsyncStorage functions
const getTheme = async () => {
  return 'light'; // Default theme
};

const setAsyncStorageTheme = async (theme) => {
};

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
