import React, { useState,useEffect } from 'react';
import { View, TextInput, Text,TouchableOpacity,Image } from 'react-native';
import UserSingUp from '../components/UserSingUp';
import { ScaledSheet } from 'react-native-size-matters';
import { logIn,addUser } from '../Services/UserService';
import {setSessionWithId,isSessionExist} from '../Services/SessionsService';
//import {YourComponent} from '../util/PushNotifationHelper';
export default function LoginScreeen ({ navigation })  {

  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');

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
      setSessionWithId(loginUser.id);
   //   YourComponent();
      if(loginUser.Role == "admin") {
        navigation.navigate('AdminHome');
      } else {
        navigation.navigate('Home');
      }
    } else {
      alert("Kullanıcı adı veya şifre hatalı");
    }
  };

  const singInUser = (email,name,password, surname, telno,adress ) => {
    endModalSignUp();
    addUser( email, name, password, surname, telno, adress ,"user");
  };

  return (
    
    <View style={styles.container}>
      <Image style={styles.userImage} source={require('../assets/bakkalamca.png')}  />
      <Text style={styles.title}>Bakkal Amca</Text>
      <TextInput
        style={[styles.input,styles.inputText]}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={[styles.input,styles.inputText]}
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


const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius:30,
  },
  button: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  logInButton: {
    borderRadius:30,
    backgroundColor: '#32CD32',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  inputText:{
    textAlign: 'center',
    color: '#000',
    fontSize: 18,
  },
  SignUputton: {
    borderRadius:30,
    backgroundColor: '#1976d2',
  },
  userImage:{
    width:250,
    height:250,
    alignSelf:'center',
    marginTop:20,
    marginBottom:20,
    borderRadius:50,
  }
});
