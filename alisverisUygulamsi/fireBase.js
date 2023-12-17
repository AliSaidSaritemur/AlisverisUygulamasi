
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBQgde81tV7sOWpE99yGv-SosKebCbugWs",
  authDomain: "alisverisuygulamasi-e0727.firebaseapp.com",
  projectId: "alisverisuygulamasi-e0727",
  storageBucket: "alisverisuygulamasi-e0727.appspot.com",
  messagingSenderId: "901632497117",
  appId: "1:901632497117:web:ce1f3f869bd46a4668d234",
  measurementId: "G-2FS7QV7FHT"
};



if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

export {auth};