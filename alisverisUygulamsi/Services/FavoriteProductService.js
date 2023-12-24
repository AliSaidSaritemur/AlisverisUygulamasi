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
    const getFavoriteProductList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "FavoriteProduct"));
            const productList = querySnapshot.docs.map(doc => doc.data());
            return productList;
        } catch (error) {
            console.error("Error fetching ordered product list: ", error);
        }
    };
    const getFavoriteProductListWithUserId = async (userId) => {
      try {
        console.log("bizim id: ",userId);
          const q = query(collection(db, "FavoriteProduct"), where("UserId", "==", userId));
          const querySnapshot = await getDocs(q);
          const productList = querySnapshot.docs.map(doc => doc.data());
          return productList;
      } catch (error) {
          console.error("Error fetching ordered product list: ", error);
      }
  };
  const addFavoriteProduct = (userId,productId) => {
    try {
      addDoc(collection(db, "FavoriteProduct"), {

        UserId: userId,
        ProductId:productId,
        FavoriteProductId: uniqueId,
        Date: new Date().toLocaleDateString(),
      });
      if(Platform.OS === "android"){
        ToastAndroid.show(`Favorite Product added`, ToastAndroid.SHORT); 
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}
const removeFavoriteProduct = async (userId, productId) => {
    try {
      const q = query(collection(db, "FavoriteProduct"), where("UserId", "==", userId), where("ProductId", "==", productId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
  
      if(Platform.OS === "android"){
        ToastAndroid.show(`Favorite Product removed`, ToastAndroid.SHORT); 
      }
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }
  const changeFavoriteStatus = async (userId, productId) => {
    try {
      const docRef = doc(db, "FavoriteProduct", `${userId}_${productId}`);
      const docSnap = await getDoc(docRef);
  
      if (await getFavoriteStatus(userId,productId)) {
        await removeFavoriteProduct(userId, productId);
      } else {
        addFavoriteProduct(userId, productId);
      }
    } catch (e) {
      console.error("Error changing favorite status: ", e);
    }
  }
  const getFavoriteStatus = async (userId, productId) => {
    try {
      const q = query(collection(db, "FavoriteProduct"), where("UserId", "==", userId), where("ProductId", "==", productId));
      const querySnapshot = await getDocs(q);
  
      return !querySnapshot.empty;
    } catch (e) {
      console.error("Error getting favorite status: ", e);
      return false;
    }
  }
      return [changeFavoriteStatus,getFavoriteStatus,getFavoriteProductList,getFavoriteProductListWithUserId];
}