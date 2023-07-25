// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIa2tMmgK6R9k5kY2y109WSoyegFVOLKo",
  authDomain: "face-strong.firebaseapp.com",
  projectId: "face-strong",
  storageBucket: "face-strong.appspot.com",
  messagingSenderId: "987631937272",
  appId: "1:987631937272:web:680e559a3b47529b1afd0d",
  measurementId: "G-3MDXY982HJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };