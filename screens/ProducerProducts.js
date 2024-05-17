import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    ScrollView,
    VirtualizedList,
} from 'react-native'
import { Header, Image, input } from '@rneui/themed'
//import HeaderLeftArrow from "../../common/HeaderLeftArrow";

import * as productsActions from '../redux/actions/productsActions.js'
import * as shoppingCartActions from '../redux/actions/shoppingCartActions'
import Stepper from './components/Stepper'
import { getFarm, getProductsByProducer } from '../Api/services/productServices'
import { trim } from 'lodash'

const ProducerProducts = (route, navigation, ...props) => {
    const { farmId } = route.params
    const [productsByFarmer, setProductsByFarmer] = useState([])
    const [producer, setProducer] = useState({})

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: 'title' })
    }, [navigation, route])

    useEffect(() => {
        getFarm(2)
            .then((farm) => {
                setProducer(farm)
                getProductsByProducer(farmId)
                    .then((products) => {
                        setProductsByFarmer({ products })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(error)
            })
        return () => {}
    }, [])

    const handleAddToCart = (id) => {
        const { products, shoppingCart, trolleyActions } = props
        const product = products.find((p) => p.id === id)

        const idx = shoppingCart.findIndex((p) => p.id === id)
        if (idx === -1) {
            trolleyActions.addItemToCart({
                quantity: 1,
                totalPrice: product.isOnSale
                    ? product.salePrice
                    : product.price,
                ...product,
            })
        } else {
            let update = Object.assign({}, shoppingCart[idx])
            update.quantity += 1
            let totalPrice = update.quantity * update.price
            update.totalPrice = totalPrice
            trolleyActions.updateCartItem({ ...update })
        }
    }

    const handleRemoveFromCart = (id) => {
        const { shoppingCart, trolleyActions } = props
        const idx = shoppingCart.findIndex((p) => p.id === id)
        let toRemove = Object.assign({}, shoppingCart[idx])
        toRemove.quantity -= 1
        if (toRemove.quantity > 0) {
            let totalPrice = toRemove.quantity * toRemove.price
            toRemove.totalPrice = totalPrice
            trolleyActions.updateCartItem({ ...toRemove })
        } else trolleyActions.removeItemFromCart({ ...toRemove })
    }

    const handleLeftArrow = () => {
        this.props.navigation.goBack()
    }

    const getImageSource = (imageUri) => {
        const source = trim(imageUri)
        return 'http://otuofarms.com/farmdirect/images/' + source
    }
    const renderItems = ({ item }) => {
        const { shoppingCart } = this.props
        const imageSource =
            'http://otuofarms.com/farmdirect/images/' + item.imageUri
        const idx = shoppingCart.findIndex((p) => p.id === item.id)
        let quantity = 0
        if (idx !== -1) {
            let thisCart = Object.assign({}, shoppingCart[idx])
            quantity = thisCart.quantity
        }
        return (
            <TouchableOpacity
                onPress={() =>
                    this.props.navigation.navigate('ItemDetail', {
                        product: item,
                        title: item.productName,
                    })
                }
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        width: '100%',
                        height: 195,
                    }}
                >
                    <Image
                        style={{
                            flex: 1,
                            width: 155,
                            height: null,
                            paddingBottom: 10,
                            resizeMode: 'cover',
                        }}
                        source={{ uri: imageSource }}
                    />
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
                                    marginLeft: 5,
                                    marginTop: 10,
                                }}
                            >
                                {item.productName}
                            </Text>
                            <Text style={{ color: '#204B24' }}>
                                {' '}
                                {item.farm.name}
                            </Text>
                            <Text style={{ marginTop: 10 }}>
                                {' '}
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
                                onAdd={() => this.handleAddToCart(item.id)}
                                onRemove={() =>
                                    this.handleRemoveFromCart(item.id)
                                }
                                quantity={quantity}
                                price={item.price}
                                salePrice={item.salePrice}
                                isOnSale={item.isOnSale}
                                inStock={item.inStock}
                                pricePerMeasure={0}
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
                style={{ height: 4, backgroundColor: '#f8f8fa', width: '100%' }}
            />
        )
    }
    const getFilterProductsByFarmer = (filter) => {
        const { products } = props
        return products.filter((p) => p.farm.id === filter)
    }
    const renderHeader = () => {
        return (
            <View style={{ justifyContent: 'center', height: 40 }}>
                <Text
                    style={{
                        marginLeft: 10,
                        fontSize: 18,
                        fontWeight: '700',
                        backgroundColor: '#f8f8fa',
                    }}
                >
                    Our Produce
                </Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View
                style={{
                    flex: 1,
                }}
            >
                <View style={{ flex: 1, marginTop: 20 }}>
                    <VirtualizedList
                        windowSize={10}
                        ListHeaderComponent={renderHeader}
                        data={productsByFarmer}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItems}
                        ItemSeparatorComponent={itemSeparator}
                        ListHeaderComponentStyle={{
                            backgroundColor: '#f8f8fa',
                        }}
                        getItemCount={(data) => data.length}
                        getItem={(productsByFarmer, index) => {
                            const item = productsByFarmer[index]
                            return {
                                ...item,
                                id: index,
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productsActions, dispatch),
        trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProducerProducts)
