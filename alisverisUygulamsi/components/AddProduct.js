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
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';


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
    const base64WithPrefix = `data:image/jpeg;base64,${base64}`;
  
    return base64WithPrefix;
  }
  const UploadProduct = async () => {
    if (!name || !price ||!image) {
      alert('Ürün adı, fiyat veya resim eksik. Lütfen kontrol edip tekrar deneyiniz.');
      return;
    }
    uploadImagesToFirebase(name);
    addProduct(name,price);
  }
const closePage=()=>{
  onCancel();
  setImage(null);
  setName('');
  setPrice(0);
  setBase64Image(null);
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
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Resim Seç</Text>
          </TouchableOpacity> 
        </View>
        <View style={styles.uploadBtn}>
          <TouchableOpacity  onPress={UploadProduct} disabled={uploading} >
          <Text style={styles.buttonText}> Ürün Ekle</Text>
          {uploading && <Text>Yükleniyor...</Text>}
          </TouchableOpacity> 
        </View>
        <View style={styles.closeBttn}>
          <TouchableOpacity  onPress={closePage}>
            <Ionicons name='close-circle-outline' size={scale(50)} color='#000' />
          </TouchableOpacity>
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
    borderWidth: 2, 
    borderColor: 'black', 
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 5,
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
    backgroundColor: '#32CD32',
  },
  uploadBtn: {
    color: 'white',
    backgroundColor: '#40E0D0',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  closeBttn:{
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText:{
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  }
});