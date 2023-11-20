import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  useDispatch } from 'react-redux'

import { initializeApp ,} from 'firebase/app';
import { getReactNativePersistence , initializeAuth} from 'firebase/auth';
import {getAuth} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Header } from './common'
import LoginForm from './LoginForm';
import { logoutSuccess } from './Redux/AuthSlice';


const App = () => {

  const [auth, setAuth] =useState({});
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch=useDispatch();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(()=>{
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

//Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth1 = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

setAuth(auth1);


const subscriber = getAuth().onAuthStateChanged(onAuthStateChanged);
return subscriber;

  },[])

  if (initializing) return null;

  
  if (!user) {
    return (
    <View>
    <Header
      headerText="Authentication"
      />
      <LoginForm
      value="Log In"
      auth={auth}
      />
    </View>
    )
  }

  return (

    <View>
      <Header
      headerText="Authentication"
      />
    <Button
      value="Log Out"
      onButtonPress={() =>{getAuth()
        .signOut()
        .then(() => 
        {
          console.log('User signed out!');
          dispatch(logoutSuccess());
        } 
          )}


      }
      />   
    </View>

  )
}

export default App

const styles = StyleSheet.create({})