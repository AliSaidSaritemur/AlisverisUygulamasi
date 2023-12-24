import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StyleSheet, Text, View, ToastAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { app, db } from '../fireBase';
import { useEffect,useState } from 'react';
import { getFirestore, collection, addDoc, doc, deleteDoc, updateDoc,query,where,getDocs } from 'firebase/firestore';

const firestore = getFirestore(app);

export default ()=> {
    
    
    const getBasketProductList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "BasketProduct"));
            const productList = querySnapshot.docs.map(doc => doc.data());
            return productList;
        } catch (error) {
            console.error("Error fetching ordered product list: ", error);
        }
    };
    const getBasketProductListWithUserId = async (userId) => {
      try {
          const q = query(collection(db, "BasketProduct"), where("UserId", "==", userId));
          const querySnapshot = await getDocs(q);
          const productList = querySnapshot.docs.map(doc => doc.data());
          return productList;
      } catch (error) {
          console.error("Error fetching ordered product list: ", error);
      }
  };
  const addBasketProduct = async (userId,productId) => {
    const querySnapshot = await getDocs(collection(db, "BasketProduct"));

    const productExists = querySnapshot.empty ?null: await getBasketProductId(productId, userId);
    if (productExists!=null&&!productExists.empty) {

      const productRef = doc(db, "BasketProduct", productExists);
      await updateDoc(productRef, {Count: increment(1),});

    } else{
    try {

        const docRef = await addDoc(collection(db, "BasketProduct"), {
          UserId: userId,
          ProductId: productId,
          Count:1,
          Date: new Date().toLocaleDateString(),
        });
      
        await updateDoc(doc(db, "BasketProduct", docRef.id), {
          BasketProductId: docRef.id,
        });
      
        if(Platform.OS === "android"){
          ToastAndroid.show(`Basket Product added`, ToastAndroid.SHORT); 
        }
      } catch (e) {
        console.error("Error adding document: ", e);
      }}
}
      return [addBasketProduct,getBasketProductList,getBasketProductListWithUserId];
}
export const removeBasketProduct = async (basketProductId) => {
    try {
      const q = query(collection(db, "BasketProduct"), where("BasketProductId", "==", basketProductId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
  
      if(Platform.OS === "android"){
        ToastAndroid.show(`Basket Product removed`, ToastAndroid.SHORT); 
      }
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }
  export const getBasketProductId = async (productId, userId) => {
    console.log("asdadsadasasdasasdquerySnapshot",);
    const q = query(collection(db, "Products"), where("ProductId", "==", productId), where("UserId", "==", userId));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log(`Product with ID ${productId} exists.`);
      return querySnapshot.docs[0].id;
    } else {
      console.log(`No product with ID ${productId} found.`);
      return null;
    }
  }