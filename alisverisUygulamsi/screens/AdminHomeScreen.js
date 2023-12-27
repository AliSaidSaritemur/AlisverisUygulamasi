import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdminProductsScreen from './AdminProductsScreen';
import AdminUsersScreen from './AdminUsersScreen';
import AdminStatsScreen from './AdminStatsScreen';

const adminHome="Veriler";
const adminProfile="Üyeler";
const adminMarket="Ürünler";
const Tab = createBottomTabNavigator();
export default function AdminHomeScreen({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={adminHome}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === adminHome) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === adminProfile) {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === adminMarket) {
            iconName = focused ? 'basket' : 'basket-outline';
          }
    
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00fa9a',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: { padding: 10, height: 70 }
      })}
    >
      <Tab.Screen name={adminHome} component={AdminStatsScreen}  options={{ headerShown: false }} />
      <Tab.Screen name={adminProfile} component={AdminUsersScreen}   options={{ headerShown: false }}/>
      <Tab.Screen name={adminMarket} component={AdminProductsScreen}  options={{ headerShown: false }} />

    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})