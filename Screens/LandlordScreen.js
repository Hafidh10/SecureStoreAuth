import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const Landlords = () => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Landlords</Text>
      <Button title='Logout' onPress={logout} />
    </View>
  )
}

export default Landlords