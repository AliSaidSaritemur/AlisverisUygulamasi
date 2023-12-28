import { Button, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function UserSingUp({visible,onAddUser,onCancel}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [surname, setSurname] = useState("");
    const [telNo, setTelNo] = useState("");
    const [adress, setAdress] = useState("");
    const validateInput = (email, phone, password, name, username) => {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const nameRegex = /^[A-Za-z\s]+$/;
      const usernameRegex = /^[A-Za-z]+$/;


        if (!nameRegex.test(name)) {
          return { isValid: false, message: 'Ad Uygun Değil' };
        }
      
        if (!usernameRegex.test(username)) {
          return { isValid: false, message: 'Soyad Uygun Değil' };
        }
      if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Mail uygun formatta değil' };
      }
    
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(phone)) {
        return { isValid: false, message: 'Telefon numarası uygun fortmatta değil örnek (5365647666)' };
      }

      if (password.length < 6) {
        return { isValid: false, message: 'Şifre 6 karakterden uzun olmalıdır' };
      }
      if (adress.length < 6) {
        return { isValid: false, message: 'Lütfen geçerli bir Adres giriniz' };
      }
    
    
      return { isValid: true, message: 'All inputs are valid' };
    };
    const refreshHandler = () => {
        setEmail("");
        setName("");
        setPassword("");
        setSurname("");
        setTelNo("");
        setAdress("");
    };
    const addUserHandler = async() => {
      
      const { isValid, message } = validateInput(email, telNo, password, name, surname,adress);
      
      if(isValid){
        onAddUser(email,name,password,surname,telNo,adress);
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
 <ScrollView    contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.inputContainer}>
          <Text style={styles.text}>Kayıt Ol</Text>
          
<TextInput style={styles.textInput} value={name} onChangeText={setName} placeholder='Adınızı Giriniz!'
/>
<TextInput style={styles.textInput} value={surname} onChangeText={setSurname} placeholder='Soyadınızı Giriniz!'/>
<TextInput style={styles.textInput} value={email} onChangeText={setEmail} placeholder='Email Adresinizi Giriniz!'/>
<TextInput style={styles.textInput} value={telNo} onChangeText={setTelNo} placeholder='Telefon Numaranızı Giriniz!'/>
<TextInput style={styles.textInput} value={adress} onChangeText={setAdress} placeholder='Adresinizi Giriniz!'/>
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
        </ScrollView>
      </Modal>
  )
}

const styles = StyleSheet.create({
    inputContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'white',
      padding:15,
    },
    image:{
      width:150,
      height:150,
      borderRadius:20,
      margin:20,
    },
    textInput:{
      width: '90%',
      height: 50,
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 30,
      alignSelf: 'center',
      borderWidth: 2, 
      borderColor: 'black', 
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 5,
    },
    buttonContainer:{
      flexDirection:'row',
      marginTop:15,
    },
    button:{
    width:100,
    marginHorizontal:8,
    },
    scrollViewContent: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    text:{
      textAlign:'center',
      fontSize:26,
      fontWeight: 'bold',
    }

})