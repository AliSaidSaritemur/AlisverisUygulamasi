import { StyleSheet, Text, View, ToastAndroid, Platform } from 'react-native'
import { app, db } from '../fireBase';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc,query,where,getDocs } from 'firebase/firestore';

const firestore = getFirestore(app);

export const getOrderedProductPackageList = async () => {
  try {
      const querySnapshot = await getDocs(collection(db, "OrderedProductPackage"));
      const productList = querySnapshot.docs.map(doc => doc.data());
      return productList;
  } catch (error) {
      console.error("Error fetching ordered product list: ", error);
  }
};
export const addOrderedProductPackage = (user,price,date) => {
  try {
    addDoc(collection(db, "OrderedProductPackage"), {
      UserName: user.Name,
      UserId: user.UserId,
      Adress: user.Adress,
      TotalPrice: price,
      Date: date,
    });
    if(Platform.OS === "android"){
      ToastAndroid.show(`Ordered Product added`, ToastAndroid.SHORT); 
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export const getOrderedProducPackagetListWithUserId = async (userId) => {
  try {
      const q = query(collection(db, "OrderedProductPackage"), where("UserId", "==", userId));
      const querySnapshot = await getDocs(q);
      const productList = querySnapshot.docs.map(doc => doc.data());
      return productList;
  } catch (error) {
      console.error("Error fetching ordered product  list: ", error);
  }
};

