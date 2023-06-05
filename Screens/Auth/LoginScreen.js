import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Image} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, error, isLoading} = useContext(AuthContext);

  return (
    <View style={styles.mainView}>
      <View style={styles.logoView}>
        <Image style={styles.logo} source={require('/home/hafidh/Projects/RealtorsMobileApp/assets/logo.jpeg')}/>
      </View>

      <View style={styles.formView}>

          <TextInput style={styles.textInput}
           placeholder='Email'
           onChangeText={setEmail}
           value={email}
           placeholderTextColor={'#fff'}
           textContentType='emailAddress'
           keyboardType='email-address'
           autoCapitalize='none'
           />

          <TextInput 
          style={styles.textInput} 
          onChangeText={setPassword}
          value={password}
          placeholder='Password'
          placeholderTextColor='#fff' 
          secureTextEntry={true}
          autoCapitalize='none'
          />

          <TouchableOpacity style={styles.button} onPress={() => login(email, password)}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>Log in</Text>
          </TouchableOpacity>
          <View style={styles.query}>
            <Text style={{color: '#fff'}}>Don't have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
            <Text style={{color: '#f5870c', paddingLeft: 10, fontWeight: 'bold'}}>Sign up</Text>
            </TouchableOpacity>
          </View>
          {error && <Text style={{ color: 'red' }}>{error}</Text>}
      
      </View>
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
        marginTop: 20
    },
    formView: {
        width: '100%',
        height: '65%',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
      },
      textInput: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 20,
        height: 65,
        marginTop: 30,
        paddingLeft: 10,
        color: '#fff'
      },
      button: {
        width: '80%',
        backgroundColor: '#f5870c',
        color: '#fff',
        height: 65,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
      },
      query: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 80,
        marginTop: 15,
      },
      logoView: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
       alignItems: 'center',
       display: 'flex',
       marginTop: 30,
       
      },
      logo: {
        width: '100%',
        resizeMode: 'contain',
      }
})

export default LoginScreen