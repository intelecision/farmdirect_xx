import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

interface SubCategory {
    id: number
    name: string
    image: string
    subcategoryId: number
}
type Props = {
    subcategories: SubCategory[]
}

const LIveAnimals = ({ subcategories }: Props) => {
    return (
        <View>
            <FlatList
                data={subcategories}
                style={{ flex: 1 }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <View></View>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 180,
        width: 195,
        marginLeft: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    imageStyle: {
        flex: 2,
        height: null,
        width: null,
        resizeMode: 'cover',
    },
})
export default LIveAnimals
