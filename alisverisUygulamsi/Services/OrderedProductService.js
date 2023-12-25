import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StyleSheet, Text, View, ToastAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { app, db } from '../fireBase';
import { useEffect,useState } from 'react';
import moment from 'moment';
import {addOrderedProductPackage} from '../Services/OrderedProductPackageService';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc,query,where,getDocs } from 'firebase/firestore';

const firestore = getFirestore(app);



export const addOrderedProduct = (user,product) => {
  const date= moment().format('YYYY-MM-DD HH:mm:ss')
    try {
      addDoc(collection(db, "OrderedProducts"), {
        UserName: user.Name,
        UserId: user.UserId,
        Adress: user.Adress,
        Count:1,
        ProductId: product.ProductId,
        Date:  date,
      });
      addOrderedProductPackage(user,product.Price,date);
      if(Platform.OS === "android"){
        ToastAndroid.show(`Ordered Product added`, ToastAndroid.SHORT); 
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}
export const getOrderedProductList = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "OrderedProducts"));
        const productList = querySnapshot.docs.map(doc => doc.data());
        return productList;
    } catch (error) {
        console.error("Error fetching ordered product list: ", error);
    }
};

export const getOrderedProductListWithUserId = async (userId,date) => {
  try {
      const q = query(collection(db, "OrderedProducts"), where("UserId", "==", userId),where("Date", "==", date));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map(doc => doc.data());
      return productList;
  } catch (error) {
      console.error("Error fetching ordered product list: ", error);
  }
};
export const addOrderedProducts = async (user, products,totalPrice) => {
  const date= moment().format('YYYY-MM-DD HH:mm:ss')
  try {
    await Promise.all(products.map(product => 
      addDoc(collection(db, "OrderedProducts"), {
        UserName: user.Name,
        UserId: user.UserId,
        Adress: user.Adress,
        ProductId: product.ProductId,
        Count: product.Count,
        Date: date,
      })
    ));
    addOrderedProductPackage(user,totalPrice,date);
    if(Platform.OS === "android"){
      ToastAndroid.show(`Ordered Products added`, ToastAndroid.SHORT); 
    }
  } catch (e) {
    console.error("Error adding documents: ", e);
  }
}
export const getTotalOrderedProductPrice = async (userId,date) => {
  try {
    const q = query(
      collection(db, "OrderedProducts"),
      where("UserId", "==", userId),
      where("Date", "==", date)
    );

    const querySnapshot = await getDocs(q);
    let totalCount = 0;

    querySnapshot.forEach((doc) => {
      totalCount += doc.data().Count*doc.data().Price;
    });

    return totalCount;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};