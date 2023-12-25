import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Image, Button,TouchableOpacity } from 'react-native';
import UserUpdate from '../components/UserUpdate';
import LastOrdersUser from '../components/LastOrdersUser';
import { getSession } from '../Services/SessionsService'; 
import {updateUser} from '../Services/UserService';

export default function ProfileScreen({ navigation }) {

  const [user, setUser] = useState();
  const [modalUpdateIsVisible, setModalUpdateIsVisible] = useState(false)  
  const [modalLastOrdersVisible, setModalLastOrdersVisible] = useState(false)  
  const [updateInfoPressed, setUpdateInfoPressed] = useState(false);
  const [refreshPage,setRefreshPage]=useState(false);
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
      <View style={styles.container}>
        <Image style={styles.userImage} source={require('../assets/User.jpg')}  />
        <Text style={styles.userName}> {user.Name} </Text>
        <View style={styles.buttonContainer}>
        <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={startModalUpdate}>
    <Text style={styles.buttonText}>Profil Bilgilerini güncelle</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.button} onPress={startModalLastOrders}>
    <Text style={styles.buttonText}>Geçimiş Siparişlerim</Text>
  </TouchableOpacity>
</View>
          </View>   
          <UserUpdate visible={modalUpdateIsVisible} onUpdateUser={UpdateUser} onCancel={endModalUpdate} user={user} />
          <LastOrdersUser visible={modalLastOrdersVisible} onCancel={endModalLastOrders} onRefreshPage={refreshPage} />

      </View>
    :
      <Text>Loading...</Text>  
  );
}

const styles = StyleSheet.create({
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
},
button: {
  backgroundColor: '#007BFF',
  alignSelf: 'center',
  padding: 10,
  borderRadius: 5,
  marginVertical: 10,
  width: '150%',
},
buttonText: {
  color: '#fff',
  textAlign: 'center',
},

});