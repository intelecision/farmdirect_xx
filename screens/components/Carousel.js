import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native'
import slides from '../../constants/slides'
import CarouselItem from './CarouselItem'
import Paginator from './Paginator'

const Carousel = ({ slides, handlePress }) => {
    const scrollX = useRef(new Animated.Value(0)).current
    const slideRef = useRef(null)

    const [currentIndex, setCurrentIndex] = useState(0)
    const viewableItemChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current
    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1 })
        }
    }
    //const handlePress = (item) => {
    //  alert(item.title);
    //  console.log("item", item.title);
    //};
    return (
        <View style={[styles.container]}>
            <View
                style={{
                    flex: 1,
                    paddingTop: 20,
                    marginBottom: 10,
                }}
            >
                <FlatList
                    data={slides}
                    renderItem={({ item }) => (
                        <CarouselItem
                            item={item}
                            onPress={() => handlePress(item)}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={32}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item, idx) => idx.toString()}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    onViewableItemsChanged={viewableItemChanged}
                    viewabilityConfig={viewConfig}
                    ref={slideRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX} />
        </View>
    )
}

export default Carousel

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})
