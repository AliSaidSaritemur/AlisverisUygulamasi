import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import AdminProductsScreen from './screens/AdminProductsScreen';
import AdminHomeScreen from './screens/AdminHomeScreen';
import BasketScreen from './screens/BasketScreen';
import { removSession,getSessionsRole } from './Services/SessionsService';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
export default  function App() {
  const Stack = createNativeStackNavigator();
  const [initialRoute, setInitialRoute] = useState('Login');
  const [Isloading, setIsLoading] = useState(true);
const [role,setRole]=useState(1);
  useEffect(() => {
    const checkSession = async () => {
      setRole(await getSessionsRole());
    };
    checkSession();
  }, []);
  useEffect(() => {
    const checkSession = async () => {
      console.log(role);
      if(role=="noSession"){
        setInitialRoute('Login');
        setIsLoading(false);
        return;
      }
      if(role=="user"){
        setInitialRoute('Home');
        setIsLoading(false);
        return;
      }
      if(role=="admin"){
        setInitialRoute('AdminHome');
        setIsLoading(false);
        return;
      }
    
    };
    checkSession();
  }, [role]);

  return (
    !Isloading ?
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:"green"}}}  initialRouteName={ initialRoute} >
      <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Products" component={ProductsScreen}  options={{ headerShown: false }}/>
      <Stack.Screen
  name="Home"
  component={HomeScreen}
  options={({ navigation }) => ({
    title: "MARKETİM",
    headerBackVisible: false,
    
    headerRight: () => (
        <TouchableOpacity onPress={() => {navigation.navigate('Login'); removSession();
        }}>
      <Ionicons name="log-out-outline"size={30} color={"black"} />
      </TouchableOpacity>

    ),
  })}
/>
<Stack.Screen
  name="AdminHome"
  component={AdminHomeScreen}
  options={({ navigation }) => ({
    title: "ADMİN PANELİ",
    headerBackVisible: false,
    headerRight: () => (
        <TouchableOpacity onPress={() => {navigation.navigate('Login'); removSession();
        }}>
    <Ionicons name="log-out-outline" size={scale(30)}  />
      </TouchableOpacity>

    ),
  })}
/>
        <Stack.Screen name="AdminProducts" component={AdminProductsScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Basket" component={BasketScreen}  options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    : <ActivityIndicator size="large" color="blue" />
  );
}

const styles = StyleSheet.create({});
