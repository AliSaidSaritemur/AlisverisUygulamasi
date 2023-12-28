import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import UserUpdate from '../components/UserUpdate';
import LastOrdersUser from '../components/LastOrdersUser';
import { getSession } from '../Services/SessionsService'; 
import {updateUser} from '../Services/UserService';
import FavoriteProductsList from '../components/FavoriteProductsList';

export default function ProfileScreen({ navigation }) {

  const [user, setUser] = useState();
  const [modalUpdateIsVisible, setModalUpdateIsVisible] = useState(false)  
  const [modalLastOrdersVisible, setModalLastOrdersVisible] = useState(false)  
  const [updateInfoPressed, setUpdateInfoPressed] = useState(false);
  const [refreshPage,setRefreshPage]=useState(false);
  const [modalFavoritesVisible, setModalFavoritesVisible] = useState(false)
  const [refreshPageFavorites,setRefreshPageFavorites]=useState(false);
  useEffect(() => {
    const fetchId = async () => {
      const user = await getSession(); 
      setUser(user);
    };

    fetchId();
  }, [updateInfoPressed]);
  const startModalUpdate = () => {
    setModalUpdateIsVisible(true)
  }; 
  const endModalUpdate=()=>{
    setModalUpdateIsVisible(false)
  };
const startModalLastOrders = () => {
    setModalLastOrdersVisible(true)
  };
  const startModalFavorites = () => {
    setModalFavoritesVisible(true)
    setRefreshPageFavorites(!refreshPageFavorites);
  };
  const endModalFavorites=()=>{
    setRefreshPage(!refreshPageFavorites);
    setModalFavoritesVisible(false)
  };

  const endModalLastOrders=()=>{
    setRefreshPage(!refreshPage);
    setModalLastOrdersVisible(false)
  };

  const UpdateUser =(id,email,name,password,surname,telNo,adress)=>{
    updateUser(id,email,name,password,surname,telNo,adress);
    endModalUpdate();
    setUpdateInfoPressed(true);
  }

  return (
    user ?
    <ScrollView    contentContainerStyle={styles.scrollViewContent}
    keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Image style={styles.userImage} source={require('../assets/User.jpg')}  />
        <Text style={styles.userName}> {user.Name} </Text>
        <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={startModalUpdate}>
    <Text style={styles.buttonText}>Profil Bilgilerini Güncelle</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={startModalLastOrders}>
    <Text style={styles.buttonText}>Geçmiş Siparişlerim</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={startModalFavorites}>
    <Text style={styles.buttonText}>Favorilerim</Text>
  </TouchableOpacity>
</View>
          </View>   
          <UserUpdate visible={modalUpdateIsVisible} onUpdateUser={UpdateUser} onCancel={endModalUpdate} user={user} />
          <LastOrdersUser visible={modalLastOrdersVisible} onCancel={endModalLastOrders} onRefreshPage={refreshPage} />
      <FavoriteProductsList visible={modalFavoritesVisible} onCancel={endModalFavorites} onRefreshPage={refreshPageFavorites} />
      </View>
      </ScrollView> 
    :
    <ActivityIndicator size="large" color="blue" />
  );
}

const styles = StyleSheet.create({
  scrollViewContent:{
    flexGrow: 1,
  },
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
},
userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
},
userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
},

buttonContainer: {
  marginTop: 20,
  width: '90%',
  justifyContent: 'center',
},
button: {
  width: '90%',
  height: 50,
  borderWidth: 0.5,
  borderRadius: 10,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
  marginLeft:20,
  backgroundColor: '#00fa9a',
},
buttonText: {
  color: 'black',
  textAlign: 'center',
},

});