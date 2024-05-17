import {
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Alert,
    StatusBar,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Header } from '@rneui/themed'
import { loadProducts } from '../redux/actions/productsActions'
import {
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
} from '../redux/actions/shoppingCartActions'
import axios from 'axios'
import { loadCategories } from '../redux/actions/categoryActions'
import Stepper from './components/Stepper'
import HeaderLeftArrow from '../components/HeaderLeftArrow'
import CantFindProduct from './components/CantFindProduct'
import { windowBackground } from './../constants/colours'
import { SafeAreaView } from 'react-native-safe-area-context'
//import SubCategoryScreen from "./SubCategoryScreen";
//import ShoppingCartItem from "./../screens/components/ShoppingCartItem";
import TrolleyItem from './components/TrolleyItem'

//
const FilteredProductsScreen = ({ navigation, route, ...props }) => {
    //getParams = () => {
    const [suggestedText, onChangeSuggestedText] = useState('')
    const { products, shoppingCart, addItemToCart, updateCartItem } = props
    const [subCategory, setSubCategory] = useState(() => {
        return route.params.subCategory
    })

    const [title, setTitle] = useState(() => {
        const { title } = route.params
        return title
    })
    const [filteredProducts, setFilteredProducts] = useState(null)
    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: title })
    }, [navigation, route])
    useEffect(() => {
        const { subCategory } = route.params

        if (subCategory && products) {
            let filtered = products.filter(
                (p) => p.subCategoryId === subCategory.id
            )
            setFilteredProducts(filtered)
        }
        return () => {
            // cleanup;
        }
    }, [])

    const handleAddToCart = (id) => {
        const product = products.find((p) => p.id === id)

        const idx = shoppingCart.findIndex((p) => p.id === id)
        if (idx === -1) {
            addItemToCart({
                quantity: 1,
                totalPrice: product.isOnSale
                    ? product.salePrice
                    : product.price,
                ...product,
            })
        } else {
            let update = Object.assign({}, shoppingCart[idx])
            update.quantity += 1
            let totalPrice = update.isOnSale
                ? update.quantity * update.salePrice
                : update.quantity * update.price
            update.totalPrice = totalPrice
            updateCartItem({ ...update })
        }
    }

    const handleRemoveFromCart = (id) => {
        const { shoppingCart, removeItemFromCart, updateCartItem } = props
        const idx = shoppingCart.findIndex((p) => p.id === id)
        let toRemove = Object.assign({}, shoppingCart[idx])
        toRemove.quantity -= 1
        if (toRemove.quantity > 0) {
            let totalPrice = toRemove.quantity * toRemove.price
            toRemove.totalPrice = totalPrice
            updateCartItem({ ...toRemove })
        } else
            removeItemFromCart({
                ...toRemove,
            })
    }
    const handleOnPress = (item) => {
        navigation.push('ItemDetail', {
            product: item,
            title: item.productName,
        })
    }
    const renderItems = ({ item }) => {
        const { shoppingCart } = props
        const idx = shoppingCart.findIndex((p) => p.id === item.id)
        let quantity = 0

        if (idx !== -1) {
            let thisCart = Object.assign({}, shoppingCart[idx])
            quantity = thisCart.quantity
        }
        return (
            <TrolleyItem
                item={item}
                quantity={quantity}
                onPress={() => handleOnPress(item)}
                onAddToTrolley={() => handleAddToCart(item.id)}
                onRemoveFromTrolley={() => handleRemoveFromCart(item.id)}
            />
        )
    }
    const renderItems333 = ({ item }) => {
        const { shoppingCart } = props
        const imageSource =
            'http://otuofarms.com/farmdirect/images/' + item.imageUri
        ///item.imageLocation === 1 ? item.imageUri : { uri: item.imageUri };

        const idx = shoppingCart.findIndex((p) => p.id === item.id)
        let quantity = 0

        if (idx !== -1) {
            let thisCart = Object.assign({}, shoppingCart[idx])
            quantity = thisCart.quantity
        }

        return (
            <TouchableOpacity onPress={() => handleOnPress(item)}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        width: '100%',
                        height: 190,
                    }}
                >
                    <View>
                        <Image
                            style={{
                                flex: 1,
                                width: 150,
                                height: null,
                                paddingBottom: 10,
                                resizeMode: 'cover',
                            }}
                            source={{
                                uri: imageSource,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 2,
                            flexDirection: 'column',
                            paddingLeft: 10,
                        }}
                    >
                        <View style={{ flex: 3 }}>
                            <Text
                                style={{
                                    textAlign: 'left',
                                    fontSize: 16,
                                    fontWeight: '700',
                                    //  marginLeft: 5,
                                    marginTop: 10,
                                }}
                            >
                                {item.productName}
                            </Text>
                            <Text
                                style={{
                                    color: '#204B24',
                                }}
                            >
                                {item.farm.farmName}
                            </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                {item.productSize}
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingBottom: 10,
                                paddingRight: 10,
                                alignContent: 'flex-end',
                            }}
                        >
                            <Stepper
                                onAdd={() => handleAddToCart(item.id)}
                                onRemove={() => handleRemoveFromCart(item.id)}
                                quantity={quantity}
                                price={item.price}
                                salePrice={item.salePrice}
                                isOnSale={item.isOnSale}
                                pricePerMeasure={item.pricePerMeasure}
                                inStock={item.inStock}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const itemSeparator = () => {
        return (
            <View
                style={{
                    height: 6,
                    backgroundColor: '#dddddd',
                    width: '100%',
                }}
            />
        )
    }
    const handleGoBack = () => {
        props.navigation.goBack()
    }

    const handleSuggestion = () => {
        const { authorization } = props

        if (authorization && authorization.userInfo) {
            axios
                .post(
                    'http://www.otuofarms.com/farmdirect/api/SuggestedItems/',
                    {
                        itemName: suggestedText,
                        userId: authorization.userInfo.id,
                        email: authorization.userInfo.username,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                .then((response) => {
                    if (response && response.status === 200) {
                        Alert.alert(
                            'Thanks for suggesting!',
                            'Farm Direct will notify you soon as the item becomes available in stock',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => console.log('OK Pressed'),
                                },
                            ]
                        )
                    }
                })
                .catch((err) => {
                    console.log(err)
                    //  throw err;
                })
        }
        //lear after suggestion
        onChangeSuggestedText('')
    }

    const handleChange = (text) => {
        setSuggestedText(text)
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: windowBackground,
            }}
        >
            {/*<View>
        <Header
          style={{ height: 150 }}
          containerStyle={{ height: 150 }}
          statusBarProps={{ barStyle: "light-dark" }}
          leftComponent={
            <HeaderLeftArrow onNavigate={() => navigation.goBack()} />
          }
          statusBarProps={{
            barStyle: "dark-content",
          }}
          centerComponent={{
            text: title,
            style: {
              fontSize: 18,
              fontWeight: "600",
            },
          }}
          containerStyle={{
            backgroundColor: "white",
            borderBottomColor: "white",
            justifyContent: "space-around",
            height: 80,
          }}
        />
      </View>*/}
            {filteredProducts && filteredProducts.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={renderItems}
                        ItemSeparatorComponent={itemSeparator}
                    />
                </View>
            ) : (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: '600',
                            }}
                        >
                            Nothing in this categories
                        </Text>

                        <CantFindProduct
                            suggestion={suggestedText}
                            suggestionChange={(text) =>
                                onChangeSuggestedText(text)
                            }
                            onSuggest={() => handleSuggestion()}
                        />
                    </View>
                </KeyboardAvoidingView>
            )}
        </View>
    )
}

FilteredProductsScreen.navigationOptions = (screenProps) => ({
    title: screenProps.navigation.getParam('title'),
    header: null,
})

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
        categories: state.categories,
        authorization: state.authorization,
    }
}

const mapDispatchToProps = {
    loadProducts,
    loadCategories,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilteredProductsScreen)
