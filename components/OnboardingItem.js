import { View, Text, useWindowDimensions, StyleSheet, Image } from 'react-native'
import React from 'react'

const OnboardingItem = ({item}) => {
    const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]} />
      <View style={{ height: '30%' }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: '70%',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#f5870c',
        textAlign: 'center'
    },
    description: {
        fontWeight: '300',
        paddingHorizontal: 64,
        color: '#62656b',
        textAlign: 'center'
    }

})

export default OnboardingItem