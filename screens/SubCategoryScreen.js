import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Platform,
    StatusBar,
    FlatList,
    ImageBackground,
} from 'react-native'

import { categoryImages } from './../utils/imagesArray'
import ListItemStrip from './components/ListItemStrip'

import { routes } from './../constants/AppConstants'

const SubCategoryScreen = ({ navigation, route, ...props }) => {
    const { subCategories } = route.params
    const [category, setCategory] = useState({})
    const [filteredSubCategory, setFilteredSubCategory] =
        useState(subCategories)

    const [imageUri, setImageUri] = useState(() => {
        return `${routes.IMAGE_URI}${route.params.selectedCategory.imageSource}`
        //const categoryImage = categoryImages.find(
        //  (o) => o.name === route.params.selectedCategory.categoryName.trim()
        //);
        //return categoryImage.uri;
    })

    //  console.log("route.params.selectedCategory", imageUri)

    const [headerTitle, setHeaderTitle] = useState(() => {
        const { title } = route.params
        return title
    })

    const renderItem = ({ item }) => {
        return (
            <ListItemStrip
                lineTitleText={item.name}
                onPress={() =>
                    navigation.push('FilteredProducts', {
                        subCategory: item,
                        title: item.name,
                    })
                }
            />
        )
    }
    const itemSeparator = () => {
        return (
            <View
                style={{ height: 0.5, backgroundColor: '#ddd', width: '100%' }}
            />
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 0.3 }}>
                <ImageBackground style={{ flex: 1 }} source={{ uri: imageUri }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'baseline',
                            marginBottom: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily:
                                    Platform.OS === 'ios' ? 'Cochin' : 'Roboto',
                                fontSize: 38,
                                fontWeight: '700',
                                color: 'white',
                                alignSelf: 'center',
                            }}
                        >
                            {headerTitle}
                        </Text>
                    </View>
                </ImageBackground>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={filteredSubCategory}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={itemSeparator}
                />
            </View>
        </View>
    )
}

export default SubCategoryScreen
