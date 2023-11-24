import { Button, FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeData } from '../Redux/ActionCreater'
import { useIsFocused } from '@react-navigation/native'
import { Card, CardSection } from '../common'
import { employeeUpdate } from '../Redux/employeeSlice'
import { getAuth } from 'firebase/auth'


const EmployeeList = ({route, navigation}) => {
  const dispatch=useDispatch();
  const db = route.params?.db;
  const auth = getAuth().currentUser;
  const focus=useIsFocused();
  const { empList } = useSelector((state) => state.employee);

  useEffect(()=>{
    dispatch(fetchEmployeeData(auth, db));


  },[focus])

  const onNav=(item)=>{
    dispatch(employeeUpdate({ prop: 'shift', value: item.shift }));
    navigation.navigate('EmployeeEdit',{item:item})
  }
  return (
    <View>
      
      <FlatList
        data={empList}
        renderItem={({ item }) => (
          <Card>
            <CardSection>
              <TouchableNativeFeedback onPress={()=>onNav(item)}>
            <Text style={styles.labelStyle}>
            {item.name}
            </Text>
            </TouchableNativeFeedback>
            </CardSection>
            </Card>
        )}
        keyExtractor={(item) => item.id} // Assuming there is an 'id' field in your data
      />
       <Button
  
          title='Log Out'
      onPress={() =>{
        dispatch(employeeUpdate({ prop: 'empList', value: null }));

        getAuth()
        .signOut()
        .then(() => console.log('User signed out!'))
        }

      }/>
    </View>
  )
}

export default EmployeeList

const styles = StyleSheet.create({

  labelStyle:{
    fontSize:22,
    paddingTop:2,
    paddingLeft:10,
    flex:1
      }
})