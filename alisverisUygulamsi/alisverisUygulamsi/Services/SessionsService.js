import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'

export default ()=> {

    const setSessionWithId = async (id) => {
      console.log("id kaydediliyor :",id);
        try {
          await AsyncStorage.setItem('userId', id);
          console.log("Session kaydedildi");
        } catch (e) {
          console.error('Error saving user id:', e);
        }
      };

      const removSessionWithId = async () => {
        try {
          await AsyncStorage.removeItem('userId');
        } catch (e) {
          console.error('Error removing user id:', e);
        }
      };
      

      const getSessionWithId = async () => {
        try {
          const userEmail = await AsyncStorage.getItem('userId');
          console.log("id getirildi :",userEmail);
          return userEmail;
        } catch (e) {
          console.error('Error getting user id:', e);
        }
      };
  return [setSessionWithId,removSessionWithId,getSessionWithId]
}

