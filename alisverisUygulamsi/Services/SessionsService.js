import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from './UserService';

export const setSessionWithId = async (id) => {
  try {
    await AsyncStorage.setItem('userId', id);
    console.log("Session kaydedildi");
  } catch (e) {
    console.error('Error saving user id:', e);
  }
};

export const removSession = async () => {
  try {
    await AsyncStorage.removeItem('userId');
  } catch (e) {
    console.error('Error removing user id:', e);
  }
};
export const getSession = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return   getUser(userId);
  } catch (e) {
    console.error('Error getting user id:', e);
  }
};
export const isSessionExist = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');

    return userId !== null;
  } catch (e) {
    console.error('Error checking session:', e);
    return false;
  }
};