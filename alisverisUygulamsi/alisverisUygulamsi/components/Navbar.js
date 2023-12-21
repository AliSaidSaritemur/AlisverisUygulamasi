import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import LoginScreeen from '../screens/LoginScreen';
import AdminProductsScreen from '../screens/AdminProductsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";
export default function Navbar() {
  return (
    <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;

        if (rn === homeName) {
          iconName = focused ? 'home' : 'home-outline';

        } else if (rn === detailsName) {
          iconName = focused ? 'list' : 'list-outline';

        } else if (rn === settingsName) {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'grey',
      labelStyle: { paddingBottom: 10, fontSize: 10 },
      style: { padding: 10, height: 70}
    }}>

      <Tab.Screen name={"Home"} component={HomeScreen} />
      <Tab.Screen name={"Details"} component={LoginScreeen} />
      <Tab.Screen name={"Settings"} component={AdminProductsScreen} />
  </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})