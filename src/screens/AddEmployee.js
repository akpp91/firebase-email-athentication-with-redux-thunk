import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardSection, Button } from '../common';
import Input from '../common/Input';
import { employeeUpdate } from '../Redux/employeeSlice';
import { Picker } from '@react-native-picker/picker';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const { name, phone, shift } = useSelector((state) => state.employee);

  const onNameChange = (text) => {
    dispatch(employeeUpdate({ prop: 'name', value: text }));
  };

  const onPhoneChange = (text) => {
    dispatch(employeeUpdate({ prop: 'phone', value: text }));
  };

  const onShiftChange = (text) => {
    dispatch(employeeUpdate({ prop: 'shift', value: text }));
  };

  const onAddEmployee = () => {
    // Dispatch an action to add the employee to the store or perform any other necessary logic.
    // You may want to create another action and reducer to handle adding employees to the store.
    console.log('Add employee:', { name, phone, shift });
  };

  return (
    <View>
      <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Enter name"
            value={name}
            onChange={onNameChange}
          />
        </CardSection>
      </Card>

      <Card>
        <CardSection>
          <Input
            label="Phone"
            placeholder="Enter phone number"
            value={phone}
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
