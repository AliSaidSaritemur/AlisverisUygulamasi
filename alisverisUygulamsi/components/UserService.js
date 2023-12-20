import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StyleSheet, Text, View, ToastAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { app, db } from '../fireBase';
import { useEffect,useState } from 'react';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc,query,where,getDocs } from 'firebase/firestore';

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

    const addUser = (email,name,password, surname, telno,role ) => {
        console.log("addUser");
        try {
          addDoc(collection(db, "Users"), {
            Email: email,
            Name: name,
            Password: password,
            Surname: surname,
            TelNo: telno,
            Role: role,
            id: uniqueId,
          });
          if(Platform.OS === "android"){
            ToastAndroid.show(`User added`, ToastAndroid.SHORT); 
          }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    const deleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, "Users", userId));
            console.log("User deleted");
        } catch (e) {
            console.error("Error deleting user: ", e);
        }
    }

    const getUser = async (userId) => {
        try {
            const docRef = doc(db, "Users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("User data:", docSnap.data());
            } else {
                console.log("No such user!");
            }
        } catch (e) {
            console.error("Error getting user: ", e);
        }
    }

    const logIn = async (email, password) => {
      const db = getFirestore();
  
      try {
          const usersRef = collection(db, "Users");
          const q = query(usersRef, where("Email", "==", email), where("Password", "==", password));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
              const user = querySnapshot.docs[0].data();
              // setLoginUser(user);
              // console.log("User signed in: ", user);
              return user
          } else {
              console.log("Invalid email or password.");
              return null;
          }
      } catch (error) {
          console.error("Error signing in: ", error);
          return null;
      }
  }

  return [addUser, deleteUser, getUser, logIn]
}