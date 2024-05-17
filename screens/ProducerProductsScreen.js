import React, { useState, useEffect, memo } from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import {
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
} from './../redux/actions/shoppingCartActions'
import {
    getFarm,
    getProductsByProducer,
} from './../Api/services/productServices'
import TrolleyItem from './components/TrolleyItem'

export const ProducerProductsScreen = ({ route, navigation, ...props }) => {
    const [productsByFarmer, setProductsByFarmer] = useState([])
    const { farmId, producer } = route.params

    useEffect(() => {
        getProductsByProducer(farmId)
            .then((products) => {
                setProductsByFarmer(products)
            })
            .catch((error) => {
                console.log(error)
            })

        return () => {}
    }, [farmId])
    console.log('FARM', farmId)

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: producer?.farmName })
    }, [navigation, route])

    const getImageSource = () => {
        const source = producer?.imageUri.trim()
        return 'http://otuofarms.com/farmdirect/images/' + source
    }
    console.log(getImageSource())
    console.log(producer)
    const headerComponent = () => {
        return (
            <View style={{ justifyContent: 'center', margin: 10 }}>
                <Image
                    source={{ uri: getImageSource() }}
                    style={{
                        flex: 1,
                        width: null,
                        height: 240,
                        resizeMode: 'cover',
                    }}
                />
                <View style={{ margin: 5 }}>
                    <Text
                        style={{
                            marginTop: 10,
                            marginBottom: 6,
                            fontSize: 22,
                            fontWeight: '700',
                            textAlign: 'justify',
                        }}
                    >
                        {producer?.farmName}
                    </Text>
                    <Text style={{ textAlign: 'auto' }}>
                        {producer?.narrative}
                    </Text>
                </View>
            </View>
        )
    }

    const handleAddToCart = (product) => {
        const { shoppingCart, addItemToCart, updateCartItem } = props

        const idx = shoppingCart.findIndex((p) => p.id === product.id)
        if (idx === -1) {
            addItemToCart({
                quantity: 1,
                totalPrice: product.isOnSale
                    ? product.salePrice
                    : product.price,
                ...product,
            })
        } else if (idx > -1) {
            let update = Object.assign({}, shoppingCart[idx])
            update.quantity += 1

            let totalPrice = update.isOnSale
                ? update.quantity * update.salePrice
                : update.quantity * update.price
            update.totalPrice = totalPrice
            updateCartItem({ ...update })
        }
    }

    const handleRemoveFromCart = (product) => {
        const { shoppingCart, removeItemFromCart, updateCartItem } = props
        const idx = shoppingCart.findIndex((p) => p.id === product.id)
        let toRemove = Object.assign({}, shoppingCart[idx])
        toRemove.quantity -= 1

        if (toRemove.quantity > 0) {
            let totalPrice = toRemove.quantity * toRemove.price
            toRemove.totalPrice = totalPrice
            updateCartItem({ ...toRemove })
        } else removeItemFromCart({ ...toRemove })
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
                type={1}
                item={item}
                quantity={quantity}
                onPress={() => handleOnPress(item)}
                onAddToTrolley={() => handleAddToCart(item)}
                onRemoveFromTrolley={() => handleRemoveFromCart(item)}
            />
        )
    }
    const itemSeparator = () => {
        return <View style={{ height: 4, width: '100%' }} />
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, marginTop: 2 }}>
                <FlatList
                    ListHeaderComponent={headerComponent}
                    data={productsByFarmer}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={renderItems}
                    ItemSeparatorComponent={itemSeparator}
                    ListHeaderComponentStyle={{ backgroundColor: '#f8f8fa' }}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
    }
}
const mapDispatchToProps = {
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(memo(ProducerProductsScreen))

const styles = StyleSheet.create({})
