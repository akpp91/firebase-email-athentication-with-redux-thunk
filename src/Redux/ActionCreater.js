import { emailChange, loginSuccess, passwordChange, setLoadingFalse } from "./AuthSlice";
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { Alert } from "react-native";


export function login(auth,email, password, navigation) {


    return async function loginThunk(dispatch, getState) {

      try {
        // Attempt to sign in
console.log("signInWithEmailAndPassword");
        const user = await signInWithEmailAndPassword(auth, email, password );
        console.log("after signInWithEmailAndPassword");
        // If successful, you can proceed with any post-login logic
        function loginS(user)
        {
          console.log("action creater:");
            dispatch(loginSuccess(user.user));
            navigation.navigate('EmployeeList');
        }

        loginS(user);
      } 
      catch (signInError) {
        // If signing in fails, try to create a new account
        try {
          console.log("createUserWithEmailAndPassword");
            const user=  await createUserWithEmailAndPassword(auth, email, password);
          // If account creation is successful, you can proceed with post-creation logic
         
          loginS()

        } 
        catch (createError) 
        {
          
          AuthenticationFails(createError);

          // Handle account creation failure here
        }
      }
      function AuthenticationFails(createError) {
       
       dispatch(setLoadingFalse(false))
        console.log("Error creating account:", createError);
        
        if (createError.code === 'auth/weak-password') {
            Alert.alert('Error', 'Password should be at least 6 characters');
        } 
        else if (createError.code === 'auth/email-already-in-use') {
            Alert.alert('Error', 'email-already-in-use');
        }

        else if (createError.code === 'auth/invalid-email') {
          Alert.alert('Error', 'invalid-email');
        }
        else if (createError.code === 'auth/missing-password') {
          Alert.alert('Error', 'missing-password');
        }
        else if (createError.code === 'auth/missing-email') {
            Alert.alert('Error', 'missing-email');
        }
        else{
            Alert.alert('Error', createError.message);
        }
      }

    }
  }
  