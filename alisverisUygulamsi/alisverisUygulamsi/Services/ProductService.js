import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StyleSheet, Text, View, ToastAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { app, db } from '../fireBase';
import { useEffect,useState } from 'react';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc,query,where,getDocs } from 'firebase/firestore';

const firestore = getFirestore(app);

export default ()=> {
    const [uniqueId,setUniqueId] = useState("");
    useEffect(() => {
        generateId();
      }, [uniqueId])
    const generateId = async() => {
        try {
          const id = await AsyncStorage.getItem('id')
          if(id !== null) {
            setUniqueId(id);
          }
          else{
            const newId = Math.random().toString();
            setUniqueId(newId);
            await AsyncStorage.setItem('id', uniqueId);
          }
        } catch(e) {
          console.log(e);
        }
    }

    const addProduct = (name,price,salesCount ) => {
        console.log("addProduct");
        try {SHORT
          addDoc(collection(db, "Products"), {
            Name: name,
            Price: price,
            SalesCount: salesCount,
            id: uniqueId
          });
          if(Platform.OS === "android"){
            ToastAndroid.show(`Product added`, ToastAndroid.SHORT); 
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }
    const getProductList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Products"));
            const productList = querySnapshot.docs.map(doc => doc.data());
            return productList;
        } catch (error) {
            console.error("Error fetching product list: ", error);
        }
    };
      return [addProduct,getProductList];
}