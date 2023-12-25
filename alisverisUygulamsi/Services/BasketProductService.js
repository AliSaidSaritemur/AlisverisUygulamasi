import { app, db } from '../fireBase';
import {getProductPriceById} from '../Services/ProductService';
import { getFirestore, collection, addDoc, doc, deleteDoc, updateDoc,query,where,getDocs,increment,getDoc } from 'firebase/firestore';

const firestore = getFirestore(app);

export const getBasketProductList = async () => {
  try {
      const querySnapshot = await getDocs(collection(db, "BasketProduct"));
      const productList = querySnapshot.docs.map(doc => doc.data());
      return productList;
  } catch (error) {
      console.error("Error fetching ordered product list: ", error);
  }
};

export const getBasketProductListWithUserId = async (userId) => {
try {
    const q = query(collection(db, "BasketProduct"), where("UserId", "==", userId));
    const querySnapshot = await getDocs(q);
    const productList = querySnapshot.docs.map(doc => doc.data());
    return productList;
} catch (error) {
    console.error("Error fetching ordered product list: ", error);
}
};

export const addBasketProduct = async (userId,productId) => {
const querySnapshot = await getDocs(collection(db, "BasketProduct"));

const productExists = querySnapshot.empty ?null: await getBasketProductId(productId, userId);
if (productExists!=null&&!productExists.empty) {

const productRef = doc(db, "BasketProduct", productExists);
await updateDoc(productRef, {Count: increment(1),});

} else{
try {

  const docRef = await addDoc(collection(db, "BasketProduct"), {
    UserId: userId,
    ProductId: productId,
    Count:1,
    Date: new Date().toLocaleDateString(),
  });

  await updateDoc(doc(db, "BasketProduct", docRef.id), {
    BasketProductId: docRef.id,
  });

} catch (e) {
  console.error("Error adding document: ", e);
}}
}
export const removeBasketProduct = async (basketProductId) => {
    try {
      const q = query(collection(db, "BasketProduct"), where("BasketProductId", "==", basketProductId));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
  
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }
  export const getBasketProductId = async (productId, userId) => {
    const productRef = collection(db, "BasketProduct");
    const q = query(productRef, where("ProductId", "==", productId), where("UserId", "==", userId));
    const querySnapshot = await getDocs(q);
    const docSnapshot = querySnapshot.docs[0];

    if (!querySnapshot.empty) {
      console.log(`Product with ID ${productId} exists.`);
      return docSnapshot.id;
    } else {
      console.log(`No product with ID ${productId} found.`);
      return null;
    }
  }
  
  export const decreaseProductCount = async (productId) => {
    console.log(productId);
    const productRef = doc(db, "BasketProduct", productId);
    const productSnap = await getDoc(productRef);
  
    if (productSnap.exists() && productSnap.data().Count > 0) {
      await updateDoc(productRef, {
        Count: productSnap.data().Count - 1,
      });
    } else {
      console.log(`No product with ID ${productId} found or count is already 0.`);
    }
  }

  export const getUserBasketTotalPrice = async (userId) => {
    const basketRef = collection(db, "BasketProduct");
    const q = query(basketRef, where("UserId", "==", userId));
    const querySnapshot = await getDocs(q);
  
    const prices = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const product = doc.data();
      const price = await getProductPriceById(product.ProductId);
      return price * product.Count;
    }));
    const totalPrice = prices.reduce((a, b) => a + b, 0);
  
    return totalPrice;
  };
  export const increaseProductCount = async (productId) => {
    console.log(productId);
    const productRef = doc(db, "BasketProduct", productId);
    const productSnap = await getDoc(productRef);
  
    if (productSnap.exists() && productSnap.data().Count > 0) {
      await updateDoc(productRef, {
        Count: productSnap.data().Count + 1,
      });
    } else {
      console.log(`No product with ID ${productId} found or count is already 0.`);
    }
  }
  export const clearUserBasket = async (userId) => {
    const basketRef = collection(db, "BasketProduct");
    const q = query(basketRef, where("UserId", "==", userId));
    const querySnapshot = await getDocs(q);
  
    await Promise.all(querySnapshot.docs.map((doc) => deleteDoc(doc.ref)));
  };