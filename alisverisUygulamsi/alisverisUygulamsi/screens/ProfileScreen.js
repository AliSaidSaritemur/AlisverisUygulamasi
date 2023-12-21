import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Image, Button } from 'react-native';
import SessionsService from '../Services/SessionsService';
import UserService from '../Services/UserService';

export default function ProfileScreen({ navigation }) {
  const [id, setId] = useState('');
  const [,, getSessionWithId] = SessionsService();
  const [,,getUser,] = UserService();
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchId = async () => {
      const id = await getSessionWithId();
      setId(id);
      setUser(await getUser(id));
      console.log(user);
    };

    fetchId();
  }, []);

return (
    <View style={styles.container}>
      <Image style={styles.userImage} source={require('../assets/User.jpg')}  />
      <Text style={styles.userName}>{user.Name}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button title="Profil Bilgilerini güncelle" onPress={() => navigation.navigate('UpdateInf')} />
        <Button title="Geçimiş Siparişlerim" onPress={() => navigation.navigate('Lastorders')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
},
userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
},
userImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
},

});