import { app, db } from '../fireBase';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs } from 'firebase/firestore';

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
export const addOrderedProductPackage = (user, price, date) => {
  try {
    addDoc(collection(db, "OrderedProductPackage"), {
      UserName: user.Name,
      UserId: user.UserId,
      Adress: user.Adress,
      TotalPrice: price,
      Date: date,
    });
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
export const getTotalRevenue = async () => {
  try {
    const q = query(collection(db, "OrderedProductPackage"));
    const querySnapshot = await getDocs(q);
    const totalRevenue = querySnapshot.docs.reduce((total, doc) => total + doc.data().TotalPrice, 0);
    return totalRevenue;
  } catch (error) {
    console.error("Error fetching ordered product list: ", error);
  }
};
