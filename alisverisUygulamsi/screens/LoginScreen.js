import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text,TouchableOpacity } from 'react-native';
import { auth } from '../fireBase';

export default function LoginScreeen ({ navigation })  {

  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).then(userCredentials => {
      const user = userCredentials.user;
      console.log(user.email);
  }).catch(error => alert(error.message));
    console.log('Email:', email);
    console.log('Şifre:', password);

    // if giris true
    navigation.navigate('Products');
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
});
