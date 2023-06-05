import { View, Text, StyleSheet, FlatList, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import slides from '../slides'
import OnboardingItem from './OnboardingItem'
import Paginator from './Paginator'
import NextButton from './NextButton'




const Onboarding = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({viewableItems}) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

    const slideRef = useRef(null);

  return (
    <View style={styles.main}>
    <View style={{ flex: 3 }}>
      <FlatList
      data={slides}
      renderItem={({item}) => <OnboardingItem item={item}/>}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      bounces={false}
      keyExtractor={(item) => item.id}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],
      {
        useNativeDriver: false,
      })}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={viewConfig}
      scrollEventThrottle={32}
      ref={slideRef}
       />
       </View>

       <Paginator data={slides} scrollX={scrollX}/>
       <NextButton percentage={(currentIndex + 1) * (100 / slides.length)}/>
    </View>
  )
}

const styles = StyleSheet.create({
main : {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
}
})

export default Onboarding