import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function UserSingUp({visible,onAddUser,onCancel}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [surname, setSurname] = useState("");
    const [telNo, setTelNo] = useState("");
    const validateInput = (email, phone, password, name, username) => {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const nameRegex = /^[A-Za-z\s]+$/;
      const usernameRegex = /^[A-Za-z]+$/;


        // Name validation
        if (!nameRegex.test(name)) {
          return { isValid: false, message: 'Ad Uygun Değil' };
        }
      
        // Username validation
        if (!usernameRegex.test(username)) {
          return { isValid: false, message: 'Soyad Uygun Değil' };
        }
      if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Mail uygun formatta değil' };
      }
    
      // Phone validation
      const phoneRegex = /^\d{10}$/; // Adjust this if you have different requirements for phone number format
      if (!phoneRegex.test(phone)) {
        return { isValid: false, message: 'Telefon numarası uygun fortmatta değil örnek (5365647666)' };
      }

      // Password validation
      if (password.length < 6) {
        return { isValid: false, message: 'Şifre 6 karakterden uzun olmalıdır' };
      }
    
    
    
      return { isValid: true, message: 'All inputs are valid' };
    };
    const refreshHandler = () => {
        setEmail("");
        setName("");
        setPassword("");
        setSurname("");
        setTelNo("");
    };
    const addUserHandler = async() => {
      
      const { isValid, message } = validateInput(email, telNo, password, name, surname);
      
      if(isValid){
        onAddUser(email,name,password,surname,telNo);
        refreshHandler();
        onCancel();
      }
      else{
        alert(message);
      }

    }
  return (
<Modal 
        animationType="slide"
        visible={visible}>
        <View style={styles.inputContainer}>
<TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder='Adınızı Giriniz!'
/>
<TextInput style={styles.textInput} value={surname} onChangeText={setSurname} placeholder='Soyadınızı Giriniz!'/>
<TextInput style={styles.textInput} value={email} onChangeText={setEmail} placeholder='Email Adresinizi Giriniz!'/>
<TextInput style={styles.textInput} value={telNo} onChangeText={setTelNo} placeholder='Telefon Numaranızı Giriniz!'/>
<TextInput style={styles.textInput} value={password} onChangeText={setPassword} placeholder='Şifrenizi Giriniz!'/>

            <View style={styles.buttonContainer}>
<View style={styles.button}>
    <Button title="İptal Et" color="red" onPress={onCancel}/>
</View>
<View style={styles.button} >
    <Button title="Kayıt Ol" color="blue" onPress={addUserHandler}/>
</View>

          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
    inputContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'gray',
      padding:15,
    },
    image:{
      width:150,
      height:150,
      borderRadius:20,
      margin:20,
    },
    textInput:{
borderWidth:1,
width:'100%',
padding:10,
borderRadius:10,
backgroundColor:'yellow',
borderColor:"yellow",
marginVertical:10,
    },
    buttonContainer:{
      flexDirection:'row',
      marginTop:15,
    },
    button:{
    width:100,
    marginHorizontal:8,
    },


})