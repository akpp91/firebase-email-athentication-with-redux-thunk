import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import Input from '../common/Input';
import { employeeUpdate } from '../Redux/employeeSlice';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, doc } from 'firebase/firestore';
import EmployeeForm from '../common/EmployeeForm';
import { useIsFocused } from '@react-navigation/native';

const AddEmployee = ({route, navigation}) => {
  const { user } = useSelector((state) => state.Auth1);
  const dispatch = useDispatch();
  const { name, phone, shift } = useSelector((state) => state.employee);
  const db = route.params?.db;
  const auth = route.params?.auth;
  const [selectedShift, setSelectedShift] = useState(shift);
  const focus=useIsFocused();

  useEffect(()=>{
    if (focus) 
      {
    dispatch(employeeUpdate({ prop: 'name', value: '' }));
    dispatch(employeeUpdate({ prop: 'phone', value: '' }));
     dispatch(employeeUpdate({ prop: 'shift', value: 'Select Shift' }));
      }
  },[focus]);

  const onNameChange = (text) => {
    dispatch(employeeUpdate({ prop: 'name', value: text }));
  };

  const onPhoneChange = (text) => {
    dispatch(employeeUpdate({ prop: 'phone', value: text }));
  };

  const onShiftChange = (text) => {
    setSelectedShift(text);
  };

  const onAddEmployee = async () => {
  try {
    const userEmail = auth.currentUser.email;

    const userDocRef = doc(collection(db, "users"), userEmail);

    await addDoc(collection(userDocRef, "employees"), {
      name: name,
      phone: phone,
      shift: selectedShift,
      
    });

    console.log("Employee added");
    dispatch(employeeUpdate({ prop: 'name', value: '' }));
    dispatch(employeeUpdate({ prop: 'phone', value: '' }));
    dispatch(employeeUpdate({ prop: 'shift', value: 'Select Shift' }));
    navigation.navigate('EmployeeList');  
  } catch (error) {
    console.log("Error", error);
  }
};

  
  return (
    <View>
    
<EmployeeForm
name={ name}
phone={ phone}
selectedShift={ selectedShift}
onNameChange={onNameChange}
onPhoneChange={onPhoneChange}
onShiftChange={onShiftChange}
/>
      <Card>
        <CardSection>
          <Button value="Add" onButtonPress={onAddEmployee} />
        </CardSection>
      </Card>
    </View>
  );
};

export default AddEmployee;

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row'
    }
});
