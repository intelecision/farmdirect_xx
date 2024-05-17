import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import CategoryItem from './CategoryItem'
import { ASSERTS_IMAGES } from '../../constants/AppConstants'
import { useNavigation } from '@react-navigation/native'

const ShopByCategory = ({ categories, subCategories }) => {
    const navigation = useNavigation()
    const handlePress = (category) => {
        const result = subCategories.filter((x) => x.categoryId === category.id)
        console.log(result)
        navigation.navigate('EXPLORE', {
            screen: 'Sub_Category',
            params: {
                subCategories: result,
                selectedCategory: category,
                title: category.categoryName,
            },
        })
    }

    renderItem = ({ item }) => {
        imageUri = `${ASSERTS_IMAGES}${item.imageSource}`

        return (
            <TouchableOpacity
                activeOpacity={0.95}
                onPress={() => handlePress(item)}
            >
                <CategoryItem name={item.categoryName} image={imageUri} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={categories}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <View style={{ height: 40, margin: 10 }}>
                        <Text
                            style={{
                                fontFamily: 'Philosopher',
                                fontSize: 24,
                                fontWeight: '700',
                            }}
                        >
                            Shop by category
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

export default ShopByCategory

const styles = StyleSheet.create({})
