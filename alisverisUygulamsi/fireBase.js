import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBQgde81tV7sOWpE99yGv-SosKebCbugWs",
  authDomain: "alisverisuygulamasi-e0727.firebaseapp.com",
  projectId: "alisverisuygulamasi-e0727",
  storageBucket: "alisverisuygulamasi-e0727.appspot.com",
  messagingSenderId: "901632497117",
  appId: "1:901632497117:web:ce1f3f869bd46a4668d234",
  measurementId: "G-2FS7QV7FHT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Storage ekleniyor

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export { app, db, storage, getDownloadURL, ref }; // storage ve getDownloadURL ekleniyor
