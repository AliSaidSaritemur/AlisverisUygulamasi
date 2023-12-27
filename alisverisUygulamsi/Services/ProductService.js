import { StyleSheet, Text, View, ToastAndroid, Platform } from 'react-native'
import { app, db } from '../fireBase';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc,query,where,getDocs,updateDoc,increment } from 'firebase/firestore';

const firestore = getFirestore(app);

export const addProduct = async (name,price ) => {
  try {
    const docRef =await addDoc(collection(db, "Products"), {
      Name: name,
      Price: price,
      SalesCount: 0,
    });
    await updateDoc(doc(db, "Products", docRef.id), {
      ProductId: docRef.id,
    });
    if(Platform.OS === "android"){
      ToastAndroid.show(`Product added`, ToastAndroid.SHORT); 
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export const getProductList = async () => {
  try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const productList = querySnapshot.docs.map(doc => doc.data());
      return productList;
  } catch (error) {
      console.error("Error fetching product list: ", error);
  }
};
export const getIdByName = async (name) => {
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

export const getProductWithId = async (id) => {
  try {
    const q = query(collection(db, "Products"), where("ProductId", "==", id));
    const querySnapshot = await getDocs(q);
    let product = null;
    if (!querySnapshot.empty) {
      const product = querySnapshot.docs[0].data();
      return product;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
  }
}

export const getProductPriceById= async (id) =>{
  try {
    const q = query(collection(db, "Products"), where("ProductId", "==", id));

    const querySnapshot = await getDocs(q);
    let product = null;
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().Price;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching product: ", error);
  }

}

export const incrementSalesCount = async (name,incCount) => {
  try {
    const id = await getIdByName(name); 
    const productRef = doc(db, "Products", id);
    await updateDoc(productRef, { SalesCount: increment(incCount) });
    console.log("SalesCount incremented successfully.");
  } catch (error) {
    console.error("Error incrementing SalesCount: ", error);
  }
}
export const updateProduct = async (id, name, price) => {
  try {
    const productRef = doc(db, "Products", id);
    await updateDoc(productRef, { Name: name, Price: price });
    if(Platform.OS === "android"){
      ToastAndroid.show(`Product updated`, ToastAndroid.SHORT); 
    }
  } catch (e) {
    console.error("Error updating document: ", e);
  }
}