import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';


export default function LoginScreeen ({ navigation })  {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    console.log('Kullanıcı Adı:', username);
    console.log('Şifre:', password);

    // if giris true
    navigation.navigate('Products');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alışveriş Uygulaması</Text>
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Giriş Yap" onPress={handleLogin} />
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
});
