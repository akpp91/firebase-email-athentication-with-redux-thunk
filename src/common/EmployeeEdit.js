import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Card } from './Card'
import { CardSection } from './CardSection'
import { Button } from './Button'
import EmployeeForm from './EmployeeForm'
import { employeeUpdate } from '../Redux/employeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateEmployeeRecord } from '../Redux/ActionCreater'
import { useIsFocused } from '@react-navigation/native'

const EmployeeEdit = (props) => {
    
    const dispatch=useDispatch();
    const { name, phone, shift } = useSelector((state) => state.employee);

    const item = props.route.params?.item;
    const focus=useIsFocused();
    const db = props.route.params?.db;
    const auth = props.route.params?.auth;

    useEffect(()=>{

            dispatch(employeeUpdate({ prop: 'name', value: item.name }));
            dispatch(employeeUpdate({ prop: 'phone', value: item.phone }));
            dispatch(employeeUpdate({ prop: 'shift', value: item.shift }));
                
       
    },[item]);

    const onNameChange = (text) => {
        dispatch(employeeUpdate({ prop: 'name', value: text }));
      };
    
      const onPhoneChange = (text) => {
        dispatch(employeeUpdate({ prop: 'phone', value: text }));
      };
    
      const onShiftChange = (text) => {
        dispatch(employeeUpdate({ prop: 'shift', value: text }));
      };
    
      const onUpdateEmployee = async () => 
      {
        try 
        {
          const userEmail = auth.currentUser.email;
      
          console.log("User Email:", userEmail);
          
          // Dispatch the updateEmployeeRecord action to update the Firestore record
        dispatch(updateEmployeeRecord(auth, db, 
            {
          id: item.id,
          name: name,
          phone: phone,
          shift: shift,
        })
      );
  
                    console.log('Employee updated');
                    dispatch(employeeUpdate({ prop: 'name', value: '' }));
                    dispatch(employeeUpdate({ prop: 'phone', value: '' }));
                    dispatch(employeeUpdate({ prop: 'shift', value: 'Select Shift' }));
                    props.navigation.navigate('EmployeeList');
          }           
          
          catch (error) 
          {
                 console.log('Error', error);
          }
        }
  return (

            <Card>
                <EmployeeForm
                name={ name}
                phone={ phone}
                shift={ shift}
                onNameChange={onNameChange}
                onPhoneChange={onPhoneChange}
                onShiftChange={onShiftChange}
                />
        <CardSection>
          <Button value="Save changes" onButtonPress={onUpdateEmployee} />
        </CardSection>
      </Card>


  )
}

export default EmployeeEdit

const styles = StyleSheet.create({})