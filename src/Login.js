import React, { useState } from 'react';
import { View, Button, Text, TextInput } from 'react-native';
import { styles } from './style';
import { login } from './Redux/ActionCreater';
import { useDispatch } from 'react-redux';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(username, password));
  };

  return (
    <View>
      <TextInput placeholder='Enter username' value={username} onChangeText={ (text) => setUsername(text)} />
      <TextInput placeholder='Enter password' secureTextEntry={true} value={password} onChangeText={ (text) => setPassword(text)} />
      <Button title='Sign In' onPress={handleLogin} />
    </View>
  );
};

export default Login;
