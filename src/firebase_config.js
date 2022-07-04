//import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDd3SEzPq3Eel-WXNk6CRY41id6V_fKuA",
  authDomain: "todoapp-158a6.firebaseapp.com",
  projectId: "todoapp-158a6",
  storageBucket: "todoapp-158a6.appspot.com",
  messagingSenderId: "1091865175944",
  appId: "1:1091865175944:web:73b726d55954e3196bfc3d",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db }; //ovo radimo da bi importirali ovo u bilo koji file i koristili ovu funkciju
