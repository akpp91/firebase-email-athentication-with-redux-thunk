// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6qKKIFNIqpSDGvf_Payzc0meZqviN8uI",
  authDomain: "manager-react-native-58a13.firebaseapp.com",
  projectId: "manager-react-native-58a13",
  storageBucket: "manager-react-native-58a13.appspot.com",
  messagingSenderId: "215624673153",
  appId: "1:215624673153:web:c546da40cbcf924ac86a80",
  measurementId: "G-VJKLC51JBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)