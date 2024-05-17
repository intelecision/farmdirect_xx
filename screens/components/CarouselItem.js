import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    ImageBackground,
    Pressable,
} from 'react-native'

const CarouselItem = ({ item, onPress }) => {
    const { width } = useWindowDimensions()
    const imageSource = `http://otuofarms.com/farmdirect/images/${item.image}`
    return (
        <Pressable onPress={onPress}>
            <View style={[styles.container, { width: width - 25 }]}>
                <ImageBackground
                    style={[styles.image, { resizeMode: 'contain' }]}
                    source={{ uri: imageSource }}
                />
                <Text style={{ marginLeft: 10, marginTop: 10 }}>
                    {item?.tag}
                </Text>
                <View style={styles.narrative}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={[styles.story]}>
                        {item.description?.trim()}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default CarouselItem

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        height: 400,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        fontFamily: 'Philosopher',
    },
    story: {
        marginVertical: 10,
        fontSize: 16,
        textAlign: 'auto',
        fontFamily: 'Roboto',
    },
    narrative: {
        //flex: 0.45,
        height: 150,
        backgroundColor: 'white',
        padding: 10,
    },
    image: {
        flex: 1,
        height: 250,
    },
})
