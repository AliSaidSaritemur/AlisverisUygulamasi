import { Alert, Button, KeyboardAvoidingView, Modal, ScrollView, StyleSheet, Text, TextInput, View,Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import {storage,ref,put,firebase,uploadBytes,getDownloadURL} from '../fireBase';
import {addProduct} from '../Services/ProductService';
import {uploadImage} from './ProductImage';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddProduct({visible,onCancel}) {

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [uploading, setUploading] = useState(false);
const[base64Image,setBase64Image]=useState(null);
  const uploadImagesToFirebase = async (name) => {
    setUploading(true);

    const uid = await AsyncStorage.getItem("uid");
    try {
      const storageRef = ref(storage, );

      await Promise.all(
        [image].map(async (image, index) => {
          const response = await fetch(image);
          const blob = await response.blob();
      
          const fileRef = ref(storageRef,`${name}.jpg`);
      
          await uploadBytes(fileRef, blob);
          const downloadURL = await getDownloadURL(fileRef);
        })
      );

    } catch (error) {
      console.error("Error uploading images to Firebase:", error);
    }
    setUploading(false);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //uploadImage(result.uri,"gofret");

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image (await convertImageToBase64(image));
      console.log(result.assets[0].uri)
    }
  };
  
  async function convertImageToBase64(imageUri) {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
  
    // The base64 string is in the format of 'data:image/jpeg;base64,{base64}' 
    const base64WithPrefix = `data:image/jpeg;base64,${base64}`;
  
    return base64WithPrefix;
  }
  const UploadProduct = async () => {
    uploadImagesToFirebase(name);
    addProduct(name,price);
  }
const closePage=()=>{
  onCancel();
  setImage(null);
  setName('');
  setPrice(0);

}


  return (
    visible ?
    <Modal
      animationType="slide"
      visible={visible}>
      <View style={styles.container}>
        
        
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <TextInput
            placeholder="Ürün Adını Giriniz"
            style={styles.inputStyle}
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            placeholder="Ürünün Fiyatını Giriniz"
            style={styles.inputStyle}
            value={price}
            onChangeText={text => setPrice(text)}
          />
        <View style={styles.pickBtn}>
          <Button title="Resim Seç"  onPress={pickImage} />
        </View>
        <View style={styles.uploadBtn}>
          <Button title="Yükle" style={styles.uploadBtn} onPress={UploadProduct} disabled={uploading} />
          {uploading && <Text>Yükleniyor...</Text>}
        </View>
        <View style={styles.button}>
          <Button title="Kapat" onPress={closePage} />
        </View>
       </View>

    </Modal>
    : <Text></Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
  },
  button: {
    width: 100,
    marginHorizontal: 8,
    color: 'red',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadBtn: {
    color: 'white',
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  }
});