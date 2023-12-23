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
 
    const addOrderedProduct = (user,product) => {
        try {
          addDoc(collection(db, "OrderedProducts"), {
            UserName: user.Name,
            UserId: user.UserId,
            Adress: user.Adress,
            Price: product.Price,
            ProductName: product.Name,
            Date: new Date().toLocaleDateString(),
          });
          if(Platform.OS === "android"){
            ToastAndroid.show(`Ordered Product added`, ToastAndroid.SHORT); 
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }
    const getOrderedProductList = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "OrderedProducts"));
            const productList = querySnapshot.docs.map(doc => doc.data());
            return productList;
        } catch (error) {
            console.error("Error fetching ordered product list: ", error);
        }
    };
    const getOrderedProductListWithUserId = async (userId) => {
      try {
        console.log("bizim id: ",userId);
          const q = query(collection(db, "OrderedProducts"), where("UserId", "==", userId));
          const querySnapshot = await getDocs(q);
          const productList = querySnapshot.docs.map(doc => doc.data());
          return productList;
      } catch (error) {
          console.error("Error fetching ordered product list: ", error);
      }
  };
      return [addOrderedProduct,getOrderedProductList,getOrderedProductListWithUserId];
}