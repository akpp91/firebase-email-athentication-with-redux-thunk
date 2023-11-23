import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import Input from '../common/Input';
import { employeeUpdate } from '../Redux/employeeSlice';
import { Picker } from '@react-native-picker/picker';
import { collection, addDoc, doc } from 'firebase/firestore';

const AddEmployee = ({route, navigation}) => {
  const { user } = useSelector((state) => state.Auth1);
  const dispatch = useDispatch();
  const { name, phone, shift } = useSelector((state) => state.employee);
  const db = route.params?.db;
  const auth = route.params?.auth;

  const onNameChange = (text) => {
    dispatch(employeeUpdate({ prop: 'name', value: text }));
  };

  const onPhoneChange = (text) => {
    dispatch(employeeUpdate({ prop: 'phone', value: text }));
  };

  const onShiftChange = (text) => {
    dispatch(employeeUpdate({ prop: 'shift', value: text }));
  };

  const onAddEmployee = async () => {
  try {
    const userEmail = auth.currentUser.email;

    console.log("User Email:", userEmail);
    const userDocRef = doc(collection(db, "users"), userEmail);

    await addDoc(collection(userDocRef, "employees"), {
      name: name,
      phone: phone,
      shift: shift,
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
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Enter name"
            data={name}
            onChange={onNameChange}
          />
        </CardSection>
      </Card>

      <Card>
        <CardSection>
          <Input
            label="Phone"
            placeholder="Enter phone number"
            data={phone}
            onChange={onPhoneChange}
          />
        </CardSection>
      </Card>

      <Card>
        <CardSection style={styles.container}>
            
        <Picker
            selectedValue={shift}
            onValueChange={onShiftChange}
          >
            <Picker.Item label="Select Shift" value="" />
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
          </Picker>
        </CardSection>
      </Card>

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
