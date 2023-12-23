import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductsScreen from './ProductsScreen';
import ProfileScreen from './ProfileScreen';
import FavoriteListScreen from './FavoriteListScreen';
const personName = "Profil";
const basketName = "İstek Sepeti";
const homeName = "Market";
const Tab = createBottomTabNavigator();
export default function HomeScreen({ navigation }) {
  return (
    <Tab.Navigator
    initialRouteName={homeName}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
  
        if (route.name === personName) {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === basketName) {
          iconName = focused ? 'basket' : 'basket-outline';
        } else if (route.name === homeName) {
          iconName = focused ? 'home' : 'home-outline';
        }
  
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'grey',
      tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
      tabBarStyle: { padding: 10, height: 70 }
    })}
  >
    <Tab.Screen name={personName} component={ProfileScreen}  options={{ headerShown: false }} /> 
    <Tab.Screen name={homeName} component={ProductsScreen}   options={{ headerShown: false }}/>
    <Tab.Screen name={basketName} component={FavoriteListScreen}  options={{ headerShown: false }} />
  </Tab.Navigator>

  );
}