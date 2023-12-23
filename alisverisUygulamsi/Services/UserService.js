import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StyleSheet, Text, View, ToastAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { app, db } from '../fireBase';
import { useEffect,useState } from 'react';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc,query,where,getDocs,updateDoc } from 'firebase/firestore';

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
    const addUser = (email, name, password, surname, telno, adress , role) => {
        try {
          addDoc(collection(db, "Users"), {
            Email: email,
            Name: name,
            Password: password,
            Surname: surname,
            TelNo: telno,
            Role: role,
            Adress: adress,
            UserId: uniqueId,
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
              return docSnap.data(); // return the user data
          } else {
              console.log("No such user!");
              return null; // return null if the user does not exist
          }
      } catch (e) {
          console.error("Error getting user: ", e);
          throw e; // re-throw the error so it can be caught and handled by the caller
      }
  }

    const logIn = async (email, password) => {
      const db = getFirestore();
  
      try {
          const usersRef = collection(db, "Users");
          const q = query(usersRef, where("Email", "==", email), where("Password", "==", password));
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0];
            const user = docSnapshot.data();
            user.id = docSnapshot.id;
            return user;
        } else {
            console.log("Invalid email or password.");
            return null;
        }
      } catch (error) {
          console.error("Error signing in: ", error);
          return null;
      }

  }
  const updateUser = async (id, email, name, password, surname, telno, address) => {

    try {
        const userRef = doc(db, "Users", id);
        const updatedUser = { Email: email, Name: name, Password: password, Surname: surname, TelNo: telno, Adress: address };
        await updateDoc(userRef, updatedUser);
        console.log("User updated successfully.");
    } catch (error) {
        console.error("Error updating user: ", error);
    }
}

  return [addUser, deleteUser, getUser, logIn,updateUser]
}