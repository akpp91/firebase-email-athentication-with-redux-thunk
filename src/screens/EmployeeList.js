import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeData } from '../Redux/ActionCreater'
import { useIsFocused } from '@react-navigation/native'
import { Card, CardSection } from '../common'

const EmployeeList = ({route}) => {
  const dispatch=useDispatch();
  const auth = route.params?.auth;
  const db = route.params?.db;
  const focus=useIsFocused();
  const { empList } = useSelector((state) => state.employee);

  useEffect(()=>{
    dispatch(fetchEmployeeData(auth, db));
    
  },[focus])

  return (
    <View>
      <Text>EmployeeList</Text>
      <FlatList
        data={empList}
        renderItem={({ item }) => (
          <Card>
            <CardSection>
            <Text>{item.name}</Text>
            </CardSection>
            </Card>
        )}
        keyExtractor={(item) => item.id} // Assuming there is an 'id' field in your data
      />
    </View>
  )
}

export default EmployeeList

const styles = StyleSheet.create({})