import 'react-native-gesture-handler';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useEffect, useRef, useContext } from 'react'
import Svg, { Circle, G } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';
import LoginScreen from '../Screens/Auth/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, AuthProvider } from '../context/AuthProvider';
const Stack = createNativeStackNavigator();



const NextButton = ({percentage, navigation}) => {
    const {proceed, setProceed} = useContext(AuthContext);

    const size = 128;
    const strokeWidth = 2;
    const center = size / 2;
    const radius = size / 2 - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);

    const animation = (toValue) => {
        return  Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true
           }).start();
          
        
    };

    useEffect(() => {
        animation(percentage);
    },[percentage]);

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
            
            if(progressRef?.current){
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        },[percentage]);
    });

    const AuthStackNavigator = () => {
        return(
          <Stack.Navigator screenOptions={{headerShown: false, headerBackTitleVisible: false}}>
            <Stack.Screen name={'Login'} component={LoginScreen} options={{headerShown:false}}/>
            <Stack.Screen name={'Register'} component={RegisterScreen} options={{headerShown:false}}/>
          </Stack.Navigator>
        ); 
      }
  return (
    <View style={styles.container}>
    {/* <Svg width={size} height={size}>
    <G rotation='-90' origin={center}>
        <Circle 
        ref={progressRef}
        stroke='#E6E7E8' 
        cx={center} 
        cy={center} 
        r={radius} 
        strokeWidth={strokeWidth}

        />
        <Circle 
        stroke='#f5870c' 
        cx={center} 
        cy={center} 
        r={radius} 
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        
        
        />
        </G>
    </Svg> */}
    <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => setProceed(true)}>
    <View style={styles.skip}>
    <Text style={styles.skipText}>Skip</Text>
    <AntDesign name='arrowright' size={32} color='#fff'/>
    </View>
    
    </TouchableOpacity>
    </View>

  )
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
button: {
    position: 'absolute',
    backgroundColor: '#f5870c',
    borderRadius: 100,
    padding: 20
},
skip: {
    flexDirection: 'row'
},
skipText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
    marginRight: 10
}
})

export default NextButton