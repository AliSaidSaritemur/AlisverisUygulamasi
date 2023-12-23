import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import UserService from './UserService';

export default ()=> {
  const [,,getUser] = UserService();
    const setSessionWithId = async (id) => {
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
      

      const getSession = async () => {
        try {
          const userId = await AsyncStorage.getItem('userId');
          console.log("Session alındı:  ",userId);
          return   getUser(userId);
        } catch (e) {
          console.error('Error getting user id:', e);
        }
      };
  return [setSessionWithId,removSessionWithId,getSession]
}

