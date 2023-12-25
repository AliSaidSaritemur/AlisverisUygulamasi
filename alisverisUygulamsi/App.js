import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import AdminProductsScreen from './screens/AdminProductsScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import BasketScreen from './screens/BasketScreen';
import { isSessionExist } from './Services/SessionsService';
import { useEffect, useState } from 'react';
export default  function App() {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState('Login');


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"green"}}}  >
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Products" component={ProductsScreen}  options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen}  options={{ title:"MARKETİM" }} />
        <Stack.Screen name="AdminProducts" component={AdminProductsScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="AdminHome" component={AdminHomeScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Basket" component={BasketScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
