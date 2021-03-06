import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyCdea4gBwPQUY2tgwtJRLbqElEh37_O2qg",
//   authDomain: "react-todo-ito.firebaseapp.com",
//   projectId: "react-todo-ito",
//   storageBucket: "react-todo-ito.appspot.com",
//   messagingSenderId: "962131089182",
//   appId: "1:962131089182:web:1ef06da69229056f421b0f",
// });

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMEIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
