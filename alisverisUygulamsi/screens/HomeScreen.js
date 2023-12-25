import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductsScreen from './ProductsScreen';
import ProfileScreen from './ProfileScreen';
import BasketScreen from './BasketScreen';
import { removSession } from '../Services/SessionsService';
import { useFocusEffect } from '@react-navigation/native';
const personName = "Profil";
const basketName = "İstek Sepeti";
const homeName = "Market";
const Tab = createBottomTabNavigator();
export default function HomeScreen({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        removSession();
      };
    }, [])
  );
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
    <Tab.Screen name={basketName} component={BasketScreen}  options={{ headerShown: false }} />
  </Tab.Navigator>

  );
}