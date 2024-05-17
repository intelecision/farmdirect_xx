import React, { useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'
import { connect } from 'react-redux'
import { loadCategories } from '../redux/actions/categoryActions'
import { categoryImages } from '../utils/imagesArray'
import { Image, Icon } from '@rneui/themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getImageSource } from '../utils/helpers'

const HowWeSourceScreen = ({ ...props }) => {
    const { categories } = props
    const route = useRoute()
    const navigation = useNavigation()

    useEffect(() => {
        // load the prod categories

        if (categories.length === 0) {
            loadCategories().catch((error) => {
                alert('failed to load Categories' + error)
            })
        }
        return () => {}
    }, [])

    const renderItem = ({ item }) => {
        //let categoryImage = categoryImages.find(
        //    (o) => o.name === item.categoryName.trim()
        //)
        imageUri = getImageSource(item.imageSource)
        console.log(imageUri)
        console.log(item)
        return (
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => handleNavigation(item)}
            >
                <View
                    style={{ flex: 1, flexDirection: 'row', marginVertical: 4 }}
                >
                    <Image
                        source={{ uri: imageUri }}
                        PlaceholderContent={<ActivityIndicator />}
                        style={{ height: 60, width: 100, borderRadius: 10 }}
                    />

                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: 10,
                        }}
                    >
                        <Text style={{ fontWeight: '700' }}>
                            {item.categoryName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const itemSeparator = () => {
        return (
            <View
                style={{
                    height: 4,
                    backgroundColor: '#f8f8f8',
                    borderBottomWidth: 0.25,
                }}
            />
        )
    }
    const handleNavigation = (category) => {
        navigation.navigate('HowWeSourceDetails', { category: category })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                barStyle={Platform.OS === 'ios' ? '-content' : 'light-content'}
                translucent={true}
            />

            <View
                style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    backgroundColor: '#f8f8fa',
                }}
            >
                <FlatList
                    data={categories}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={itemSeparator}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
    }
}

const mapDispatchToProps = {
    loadCategories,
}

export default connect(mapStateToProps, mapDispatchToProps)(HowWeSourceScreen)

const styles = StyleSheet.create({})
