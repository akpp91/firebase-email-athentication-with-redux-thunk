import { FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeData } from '../Redux/ActionCreater'
import { useIsFocused } from '@react-navigation/native'
import { Card, CardSection } from '../common'


const EmployeeList = ({route, navigation}) => {
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
      
      <FlatList
        data={empList}
        renderItem={({ item }) => (
          <Card>
            <CardSection>
              <TouchableNativeFeedback onPress={()=>navigation.navigate('EmployeeEdit',{item:item})}>
            <Text style={styles.labelStyle}>
            {item.name}
            </Text>
            </TouchableNativeFeedback>
            </CardSection>
            </Card>
        )}
        keyExtractor={(item) => item.id} // Assuming there is an 'id' field in your data
      />
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