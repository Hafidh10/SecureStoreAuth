import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'

const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.headerView}>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff'}}>Create an Account</Text>
      </View>
      <View style={styles.formView}>
          <TextInput style={styles.textInput} placeholder={'Full name'} placeholderTextColor={'#fff'}/>
          <TextInput style={styles.textInput} placeholder={'Email address'} placeholderTextColor={'#fff'}/>
          <TextInput style={styles.textInput} placeholder={'Phone number'} placeholderTextColor={'#fff'}/>
          <TextInput style={styles.textInput} placeholder={'Password'} placeholderTextColor={'#fff'} secureTextEntry={true}/>
          <TextInput style={styles.textInput} placeholder={'Confirm password'} placeholderTextColor={'#fff'} secureTextEntry={true}/>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>Sign up</Text>
          </TouchableOpacity>
          <View style={styles.query}>
            <Text style={{color: '#fff'}}>Already have an account?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
            <Text style={{color: '#f5870c', paddingLeft: 10, fontWeight: 'bold'}}>Log in</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  )
}
 const styles = StyleSheet.create({
    headerView: {
        paddingBottom: 10
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    formView: {
        width: '100%',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
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
        marginTop: 10,
      },
})

export default RegisterScreen