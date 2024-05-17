import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    useWindowDimensions,
} from 'react-native'
import { farmDirectApi } from '../Api/services/FarmDirectApi'
import { Image } from '@rneui/themed'
import { categoryImages } from './../utils/imagesArray'
import { getImageSource } from '../utils/helpers'

const HowWeSourceDetails = ({ navigation, route, ...props }) => {
    const { category } = route.params
    const [details, setDetails] = useState({})
    const [imageUri, setImageUri] = useState()
    const window = useWindowDimensions()
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: category.categoryName })
    }, [navigation, route])

    useEffect(() => {
        farmDirectApi.LoadHowWeSourceById(category.id).then((response) => {
            setDetails(response.data)
            setImageUri(getImage(category))
        })
        return () => {}
    }, [category])

    const getImage = (ca) => {
        return getImageSource(ca.imageSource)
    }

    return (
        <ScrollView style={{ flex: 1, paddingBottom: 20 }}>
            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        backgroundColor: 'white',
                        minHeight: window.height - 200,
                    }}
                >
                    <Text
                        style={{
                            fontWeight: '700',
                            fontSize: 28,
                            marginTop: 10,
                        }}
                    >
                        {category.categoryName}
                    </Text>
                    <Image
                        source={{ uri: imageUri }}
                        style={{ height: 200, borderRadius: 10, marginTop: 10 }}
                    />

                    <View style={{ flex: 1 }}>
                        <Text style={{ marginTop: 20 }}>
                            {details.narrative}
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default HowWeSourceDetails

const styles = StyleSheet.create({})
