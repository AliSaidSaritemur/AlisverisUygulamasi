import { Button, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function UserSingUp({visible,onAddUser,onCancel}) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [surname, setSurname] = useState("");
    const [telNo, setTelNo] = useState("");

    const refreshHandler = () => {
        setEmail("");
        setName("");
        setPassword("");
        setSurname("");
        setTelNo("");
    };
    const addUserHandler = () => {
        onAddUser(email,name,password,surname,telNo);
        refreshHandler();
        onCancel();
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
<TextInput style={styles.textInput} value={password} onChangeText={setPassword} placeholder='Şifrenizi Giriniz!'/>
<TextInput style={styles.textInput} value={telNo} onChangeText={setTelNo} placeholder='Telefon Numaranızı Giriniz!'/>

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