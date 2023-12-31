import { LogBox, StyleSheet, Text,Button as Butt, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { initializeApp ,} from 'firebase/app';
import { getReactNativePersistence , initializeAuth} from 'firebase/auth';
import {getAuth} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Header } from './common'
import LoginForm from './screens/LoginForm';
import { logoutSuccess, setAuth } from './Redux/AuthSlice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import EmployeeList from './screens/EmployeeList';
import AddEmployee from './screens/AddEmployee';
import { getFirestore } from "firebase/firestore";
import EmployeeEdit from './common/EmployeeEdit';
import { updateEmployeeRecord } from './Redux/ActionCreater';
import { employeeUpdate } from './Redux/employeeSlice';


const AppStack = createNativeStackNavigator();
const EmployeeStack = createNativeStackNavigator();


const AppNavigator = ({ auth ,db}) => {
  return (
    <AppStack.Navigator initialRouteName= 'LoginForm'>
      <AppStack.Screen
        name='LoginForm'
        component={LoginForm}
        initialParams={{ value: 'Log In', auth: auth,db:db  }}
        options={{
          title: 'Authentication',
        }}
      />
    </AppStack.Navigator>
  );
};

const AppNavigator2 = ({ auth, db }) => {
  const nav = useNavigation();
const dispatch=useDispatch();
  return (
    <AppStack.Navigator initialRouteName= 'EmployeeList'>
      
      <AppStack.Screen
        name='LoginForm'
        component={LoginForm}
        initialParams={{ value: 'Log In', auth: auth ,db:db }}
        options={{
          title: 'Authentication',
        }}
      />

      <AppStack.Screen
        name='EmployeeList'
        component={EmployeeList}
        initialParams={{ db:db , auth: auth}}
        options={{
          title: 'EmployeeList',    
          headerBackVisible:false,
          headerRight: () => 
          <Butt title={"Add Employee"} onPress={() => {nav.navigate('AddEmployee')}} 
          />, 
        }}
        
      />

        <AppStack.Screen
        name='AddEmployee'
        component={AddEmployee}
        initialParams={{ value: 'Log In', db:db , auth: auth}}
        options={{
          title: 'Add Employee',
        }}
      />
      
      <AppStack.Screen
        name='EmployeeEdit'
        component={EmployeeEdit}
        initialParams={{ value: 'Log In', db:db , auth: auth}}
        options={{
          title: 'Edit Employee',
          headerLeft: (props) => (
            <Butt
              {...props}
              title='Back'
              onPress={() => {
                dispatch(employeeUpdate({ prop: 'shift', value: 'Select Shift' }));

                nav.navigate('EmployeeList');
              }}
            />
          ),
        }}
      />
      
    </AppStack.Navigator>
  );
};

const App = () => {


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [auth, setAuth] = useState();
  const [db, setDb] = useState();

  const dispatch=useDispatch();

  const stack = createNativeStackNavigator();

  
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(()=>{
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth1 = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

setAuth(auth1);
const db = getFirestore(app);
console.log(db);
setDb(db);

const subscriber = getAuth().onAuthStateChanged(onAuthStateChanged);
return subscriber;

  },[])

  if (initializing) return null;

   
    return (
user ?
<NavigationContainer>
      <AppNavigator2 
      auth={auth} 
      db={db}
      />
    </NavigationContainer>
:
      <NavigationContainer>
      <AppNavigator 
      auth={auth} 
      />
    </NavigationContainer>
          )
        
       
  
}

export default App

const styles = StyleSheet.create({})