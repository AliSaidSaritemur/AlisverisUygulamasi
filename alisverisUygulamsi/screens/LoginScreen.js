import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { auth } from '../fireBase';
import UserSingUp from '../components/UserSingUp';
import ProductService from '../Services/ProductService';
import UserService from '../Services/UserService';


export default function LoginScreeen ({ navigation })  {

  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');
  const [addUser, deleteUser, getUser, logIn] =UserService();

  const [modalSignUpIsVisible, setmodalSignUpIsVisible] = useState(false)   
  const startModalSignUp = () => {
    setmodalSignUpIsVisible(true)
  }; 
  const endModalSignUp=()=>{
    setmodalSignUpIsVisible(false)
  }
  const handleLogin = async () => {
    const loginUser =await logIn(email, password);

    if(loginUser != null) {
      if(loginUser.Role == "admin") {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Home');
      }
      console.log("Giriş başarılı");
    } else {
      alert("Kullanıcı adı veya şifre hatalı");
    }
    console.log(loginUser);
  };
  
  const singInUser = (email,name,password, surname, telno ) => {
    endModalSignUp();
    addUser(email,name,password, surname, telno,"user");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alışveriş Uygulaması</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
 <TouchableOpacity  onPress={handleLogin} style={[styles.button, styles.logInButton]}><Text style={styles.buttonText}>Giriş Yap</Text></TouchableOpacity>
 <TouchableOpacity  onPress={startModalSignUp} style={[styles.button, styles.SignUputton]}><Text style={styles.buttonText}>Kayıt Ol</Text></TouchableOpacity>
 <UserSingUp visible={modalSignUpIsVisible} onAddUser={singInUser} onCancel={endModalSignUp}/>
    </View>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  logInButton: {
    backgroundColor: '#1976d2',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  SignUputton: {
    backgroundColor: '#1976d2',
  },
});
