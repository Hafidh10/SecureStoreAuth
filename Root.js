import 'react-native-gesture-handler';
import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LandlordScreen from './Screens/LandlordScreen';
import { AuthContext, AuthProvider } from './context/AuthProvider';
import RegisterScreen from './Screens/Auth/RegisterScreen';
import LoginScreen from './Screens/Auth/LoginScreen';
import * as SecureStore from 'expo-secure-store';
import CustomDrawer from './components/CustomDrawer';
import { Ionicons } from '@expo/vector-icons';
import Onboarding from './components/Onboarding';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackNavigator = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen name={'Dashboard'} component={HomeScreen} options={{headerShown:false}}/>
      </Stack.Navigator> 
  );
}

const OnBoardingStackNavigator = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen name={'Onboarding'} component={Onboarding} options={{headerShown:false}}/>
      </Stack.Navigator> 
  );
}

const AuthStackNavigator = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false, headerBackTitleVisible: false}}>
      <Stack.Screen name={'Login'} component={LoginScreen} options={{headerShown:false}}/>
      <Stack.Screen name={'Register'} component={RegisterScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  ); 
}

export default function App() {

    const [isLoading, setIsLoading] = useState(true);
    const {user, setUser} = useContext(AuthContext);
    const {proceed, setProceed} = useContext(AuthContext);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      //Check if user is logged in or not
      //Check SecureStore for user object/token
      SecureStore.getItemAsync('user')
      .then(userString => {
        if(userString){
          setUser(JSON.parse(userString));
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false)
      })
      
    }, []);

    if (isLoading) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color='#fff'/>
            </View>
        );
    }

  return (
    <>
    { user ? (

    <NavigationContainer>
    <Drawer.Navigator
    drawerContent={props => <CustomDrawer{...props}/>}
     screenOptions={{
        drawerActiveBackgroundColor: '#f5870c',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {marginLeft: -23},
        drawerStyle: {backgroundColor: '#000',},  }}
     initialRouteName='Dashboard'>
      <Drawer.Screen name='Dashboard' component={HomeStackNavigator} 
        options={{ 
          drawerIcon: ({color}) => (
           <Ionicons name='home-outline' size={22} color={color}/> 
          )
         }}
      />
      <Drawer.Screen name='Landlords' component={LandlordScreen} 
        options={{ 
          drawerIcon: ({color}) => (
           <Ionicons name='home-outline' size={22} color={color}/> 
          )
         }}
      />
      <Drawer.Screen name='Properties' component={HomeStackNavigator} 
        options={{ 
          drawerIcon: ({color}) => (
           <Ionicons name='home-outline' size={22} color={color}/> 
          )
         }}
      />
      <Drawer.Screen name='Tenants' component={HomeStackNavigator} 
        options={{ 
          drawerIcon: ({color}) => (
           <Ionicons name='home-outline' size={22} color={color}/> 
          )
         }}
      />
      <Drawer.Screen name='Communication' component={HomeStackNavigator} 
        options={{ 
          drawerIcon: ({color}) => (
           <Ionicons name='home-outline' size={22} color={color}/> 
          )
         }}
      />
      <Drawer.Screen name='Maintenance' component={HomeStackNavigator} 
        options={{ 
          drawerIcon: ({color}) => (
           <Ionicons name='home-outline' size={22} color={color}/> 
          )
         }}
      />
      <Drawer.Screen name='Banking' component={HomeStackNavigator} 
        options={{ 
          drawerIcon: ({color}) => (
           <Ionicons name='home-outline' size={22} color={color}/> 
          )
         }}
      />
      <Drawer.Screen name='Documents' component={HomeStackNavigator} 
        options={{ 
          drawerIcon: ({color}) => (
           <Ionicons name='home-outline' size={22} color={color}/> 
          )
         }}
      />
      
    </Drawer.Navigator> 
    </NavigationContainer>
    ): (
      proceed?(
        <NavigationContainer>
          <AuthStackNavigator/>
        </NavigationContainer>
      ) :(
        <NavigationContainer>
        <OnBoardingStackNavigator/>
        </NavigationContainer>
      )
        
        
    )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
