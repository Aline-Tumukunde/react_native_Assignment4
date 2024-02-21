import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Button, Text, TextInput, Switch } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'; // Import DefaultTheme and DarkTheme
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import ContactScreen from './screens/ContactScreen';
import ProfileScreen from './screens/Profile';
import InternetConnection from './screens/InternetConnection';
import { getTheme, setTheme as setAsyncStorageTheme } from './screens/Theme'; 

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

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={theme}> {/* Pass the theme to NavigationContainer */}
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={TabNavigator} options={{ drawerIcon: H }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ drawerIcon: Profile }} />
          <Drawer.Screen name="Calculator" component={CalculatorScreen} options={{ drawerIcon: Calculator }} />
          <Drawer.Screen name="Contacts" component={ContactScreen} options={{ drawerIcon: Contact }} />
        </Drawer.Navigator>
      </NavigationContainer>
      <View style={styles.themeSwitchContainer}>
        <Text>Current Theme: {currentThemeText}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDarkTheme ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isDarkTheme}
        />
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
  themeSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  }
});
