
import { app, db } from '../fireBase';
import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';

const firestore = getFirestore(app);

export const getFavoriteProductList = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "FavoriteProduct"));
    const productList = querySnapshot.docs.map(doc => doc.data());
    return productList;
  } catch (error) {
    console.error("Error fetching ordered product list: ", error);
  }
};


export const getFavoriteProductListWithUserId = async (userId) => {
  try {
    const q = query(collection(db, "FavoriteProduct"), where("UserId", "==", userId));
    const querySnapshot = await getDocs(q);
    const productList = querySnapshot.docs.map(doc => doc.data());
    return productList;
  } catch (error) {
    console.error("Error fetching ordered product list: ", error);
  }
};

export const addFavoriteProduct = async (userId, productId) => {
  try {
    const docRef = await addDoc(collection(db, "FavoriteProduct"), {
      UserId: userId,
      ProductId: productId,
      Date: new Date().toLocaleDateString(),
    });

    await updateDoc(doc(db, "FavoriteProduct", docRef.id), {
      FavoriteProductId: docRef.id,
    });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
};


export const removeFavoriteProduct = async (userId, productId) => {
  try {
    const q = query(collection(db, "FavoriteProduct"), where("UserId", "==", userId), where("ProductId", "==", productId));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });

  } catch (e) {
    console.error("Error removing document: ", e);
  }
}

export const changeFavoriteStatus = async (userId, productId) => {
  try {
    const docRef = doc(db, "FavoriteProduct", `${userId}_${productId}`);
    const docSnap = await getDoc(docRef);
    if (await getFavoriteStatus(userId, productId)) {
      await removeFavoriteProduct(userId, productId);
    } else {
      addFavoriteProduct(userId, productId);
    }
  } catch (e) {
    console.error("Error changing favorite status: ", e);
  }
}

export const getFavoriteStatus = async (userId, productId) => {
  try {
    const q = query(collection(db, "FavoriteProduct"), where("UserId", "==", userId), where("ProductId", "==", productId));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  } catch (e) {
    console.error("Error getting favorite status: ", e);
    return false;
  }
}