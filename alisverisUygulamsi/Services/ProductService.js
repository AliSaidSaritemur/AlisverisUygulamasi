import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StyleSheet, Text, View, ToastAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { app, db } from '../fireBase';
import { useEffect,useState } from 'react';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc,query,where,getDocs,updateDoc,increment } from 'firebase/firestore';

const firestore = getFirestore(app);

export default ()=> {

    const addProduct = (name,price,salesCount ) => {
        console.log("addProduct");
        try {
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
    const incrementSalesCount = async (name) => {
      try {
        const id = await getIdByName(name); // add await here
        const productRef = doc(db, "Products", id);
        await updateDoc(productRef, { SalesCount: increment(1) });
        console.log("SalesCount incremented successfully.");
      } catch (error) {
        console.error("Error incrementing SalesCount: ", error);
      }
    }
  const getIdByName = async (name) => {
    try {
        const q = query(collection(db, "Products"), where("Name", "==", name));
        const querySnapshot = await getDocs(q);
        let id = null;
        querySnapshot.forEach((doc) => {
            id = doc.id;
        });
        console.log("ID fetched successfully: ", id);
        return id;
    } catch (error) {
        console.error("Error fetching ID: ", error);
    }
}
      return [addProduct,getProductList,incrementSalesCount];
}