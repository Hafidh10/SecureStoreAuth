import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react'
import axiosConfig from '../helpers/axiosConfig';
import Card from '../components/Card';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const func = async () => {

      // const myVar = await SecureStore.getItemAsync('token') 
      const myData = await SecureStore.getItemAsync('data')

      const obj = JSON.parse(myData)
  
  
      console.log(obj.code)
      setData(obj)
      
      axiosConfig.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${myData.token}`;
      axiosConfig.get(`${obj.code}/properties`)
        .then(response => {
        //  console.log('Ali', response.data)
          
        })
        .catch(error => {
          console.log(error);
          setIsLoading(false);
        });
  
  
    }
  
    func()
  }, [])

  return (
    <View style={styles.mainView}>
    <ScrollView>
      <TouchableOpacity>
        <Card>
          <Text>{data.name}</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity>
        <Card>
          <Text>HomeScreen2</Text>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity>
        <Card>
          <Text>HomeScreen</Text>
        </Card>
      </TouchableOpacity>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
},
})

export default HomeScreen