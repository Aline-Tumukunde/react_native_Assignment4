import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from './screens/HomeScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import ContactScreen from './screens/ContactScreen';
import ProfileScreen from './screens/Profile';

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
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // Your styles...
});
