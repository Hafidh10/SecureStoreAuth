import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
    <DrawerContentScrollView {...props}
    contentContainerStyle={{ 
        backgroundColor: '#f5870c'
     }}>
     <ImageBackground source={require('../assets/bg2.png')} style={{ padding: 20 }}>
     <View style={{ flexDirection: 'row' }}>
     <Image source={require('../assets/avatar.png')} style={{ height: 80, width: 80, borderRadius: 40, margin: 10 }} />
     <Text style={{ fontWeight: '600', fontSize: 20, marginTop: 35}}>Hafidh Marjan</Text>
     </View>
     </ImageBackground>
     <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 10 }}>
        <DrawerItemList {...props}/>
     </View>
    </DrawerContentScrollView>
   </View>
  )
}

export default CustomDrawer