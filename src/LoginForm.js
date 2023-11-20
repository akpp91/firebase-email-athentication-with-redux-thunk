import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, CardSection } from './common'
import Input from './common/Input'

import { useDispatch, useSelector } from 'react-redux'

import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { login } from './Redux/ActionCreater'
import { emailChange, passwordChange, setLoading } from './Redux/AuthSlice'


const LoginForm = ({auth}) => {
  
  const { email, password ,loading} = useSelector((state) => state.Auth1);

    const dispatch =useDispatch();

    const [error, setError] = useState('');
    

    const onButtonPress=  ()=>
    
    {
      console.log(email);
      console.log(password);
      console.log(auth);
      console.log("is loading before dispatch ",loading);
      setError(" ");
      dispatch(setLoading(true));  
    
      dispatch(login(auth,email, password));

    }
  return (
   <Card>
    
    <CardSection>
    <Input
        label="Email"
        placeholder="akpp91@gmail.com"
        onChange={(text)=>{dispatch(emailChange(text))} }
        value={email}
        />
    </CardSection>

    <CardSection>
    <Input
        label="Passsword"
        secureTextEntry
        placeholder="password"
        onChange={(text)=>dispatch(passwordChange(text)) }
        value={password}

        />
    </CardSection>

    <CardSection>
        <Button
        value="Log In"
        onButtonPress={onButtonPress}
        email={email}
        password={password}
        />
    </CardSection>

   </Card>
  )
}

export default LoginForm

const styles = StyleSheet.create({})