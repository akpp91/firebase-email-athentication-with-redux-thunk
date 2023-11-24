
import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card } from './Card'
import { CardSection } from './CardSection'
import { Button } from './Button'
import EmployeeForm from './EmployeeForm'
import { employeeUpdate } from '../Redux/employeeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteEmployeeRecord, updateEmployeeRecord } from '../Redux/ActionCreater'
import { CommonActions, useIsFocused } from '@react-navigation/native'
import SendSMS from 'react-native-sms'
import { Picker } from '@react-native-picker/picker'


const EmployeeEdit = (props) => {
    
    const dispatch=useDispatch();
    const { name, phone, shift } = useSelector((state) => state.employee);

    const item = props.route.params?.item;
    const focus=useIsFocused();
    const db = props.route.params?.db;
    const auth = props.route.params?.auth;
    const [selectedShift, setSelectedShift] = useState(shift);

    useEffect( ()=>{
      console.log("shift value in useeffect edit"+" "+shift);
      if (focus) 
      {
        dispatch(employeeUpdate({ prop: 'name', value: item.name }));
            dispatch(employeeUpdate({ prop: 'phone', value: item.phone }));
             dispatch(employeeUpdate({ prop: 'shift', value: item.shift }));
             
      } 
      else 
      {
        dispatch(employeeUpdate({ prop: 'name', value: '' }));
        dispatch(employeeUpdate({ prop: 'phone', value: '' }));
         dispatch(employeeUpdate({ prop: 'shift', value: '' }));
      }
            
    },[focus]);

    const onNameChange = (text) => {
        dispatch(employeeUpdate({ prop: 'name', value: text }));
      };
    
      const onPhoneChange = (text) => {
        dispatch(employeeUpdate({ prop: 'phone', value: text }));
      };
    
      const OnFire = () => {
        Alert.alert(
          'Alert Title',
          `Are you sure you want to fire ${name}`,
          [
           
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'OK', 
              onPress: () => {
                onDeleteEmployee();
                props.navigation.navigate('EmployeeList');
                }
            },
          ],
          {cancelable: false},
        );
      };

      const onDeleteEmployee = async () => {
        try {
          // Dispatch the deleteEmployeeRecord action to delete the Firestore record
          dispatch(deleteEmployeeRecord(auth, db, item.id));
    
          // After successful deletion, navigate to the employee list or perform other actions
          props.navigation.navigate('EmployeeList');
        } catch (error) {
          console.error('Error deleting employee:', error);
          // Handle errors if necessary
        }
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
          shift: selectedShift,
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
                
                />
                
                <Card>
        <CardSection style={styles.container}>
            
        <Picker
            selectedValue={selectedShift}
            onValueChange={(itemValue, itemIndex) => setSelectedShift(itemValue)}

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
        <CardSection>
          <Button value="Save changes" onButtonPress={onUpdateEmployee} />
        </CardSection>
        <CardSection>
  <Button 
  value="Message Schedule" 
  onButtonPress={() => SendSMS.send({
    body: `your shift is sheduled on ${shift}`,
    recipients: [`${phone}`],
    successTypes: ['sent', 'queued'],
    allowAndroidSendWithoutReadPermission: true
}, (completed, cancelled, error) => {

    console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

})} 
  />
</CardSection>

<CardSection>
<Button 
  value="Fire Employee" 
  onButtonPress={OnFire}
/>
</CardSection>
      </Card>


  )
}

export default EmployeeEdit

const styles = StyleSheet.create({})