import { app, db } from '../fireBase';

import { getFirestore, collection, addDoc, doc, deleteDoc, getDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';



export const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "Users", userId));
    console.log("User deleted");
  } catch (e) {
    console.error("Error deleting user: ", e);
  }
}
export const addUser = async (email, name, password, surname, telno, adress, role) => {
  try {
    const docRef = await addDoc(collection(db, "Users"), {
      Email: email.trim(),
      Name: name,
      Password: password,
      Surname: surname,
      TelNo: telno,
      Role: role,
      Adress: adress,
    });
    await updateDoc(doc(db, "Users", docRef.id), {
      UserId: docRef.id,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export const updateUser = async (id, email, name, password, surname, telno, address) => {

  try {
    const userRef = doc(db, "Users", id);
    const updatedUser = { Email: email, Name: name, Password: password, Surname: surname, TelNo: telno, Adress: address };
    await updateDoc(userRef, updatedUser);
  } catch (error) {
    console.error("Error updating user: ", error);
  }
}
export const getUser = async (userId) => {
  try {
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such user!");
      return null;
    }
  } catch (e) {
    console.error("Error getting user: ", e);
    throw e;
  }
}

export const logIn = async (email, password) => {
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


export const getAllUsers = async () => {
  const usersRef = collection(db, "Users");
  const snapshot = await getDocs(usersRef);
  const users = snapshot.docs.map(doc => doc.data());

  return users;
}

export const getUserByEmail = async (email) => {
  const usersRef = collection(db, "Users");
  const q = query(usersRef, where("Email", "==", email));
  const snapshot = await getDocs(q);
  const user = snapshot.docs.map(doc => doc.data())[0];

  return user;
}