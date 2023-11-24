import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from './Card'
import { CardSection } from './CardSection'
import Input from './Input'
import { Picker } from '@react-native-picker/picker'

const EmployeeForm = (props) => {
  return (
    <View>
        <Card>
        <CardSection>
          <Input
            label="Name"
            placeholder="Enter name"
            data={props.name}
            onChange={props.onNameChange}
          />
        </CardSection>
      </Card>

      <Card>
        <CardSection>
          <Input
            label="Phone"
            placeholder="Enter phone number"
            data={props.phone}
            onChange={props.onPhoneChange}
          />
        </CardSection>
      </Card>

      
    </View>
  )
}

export default EmployeeForm

const styles = StyleSheet.create({})