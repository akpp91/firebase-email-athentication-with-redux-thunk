// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCW-q-XhnY7VJcijBTwNCsbmavCR6AWSqk",
  authDomain: "react-native-course-99927.firebaseapp.com",
  projectId: "react-native-course-99927",
  storageBucket: "react-native-course-99927.appspot.com",
  messagingSenderId: "86450240555",
  appId: "1:86450240555:web:8aeb33a5192540a8a8fe6e",
  measurementId: "G-WH5YYDQW2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)