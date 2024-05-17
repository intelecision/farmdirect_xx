import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    FlatList,
    ImageBackground,
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StepperLarge from './components/StepperLarge'
import * as shoppingCartActions from '../redux/actions/shoppingCartActions'
import * as favouritesActions from '../redux/actions/favouritesActions'
import ProductDescription from './components/ProductDescription'
import { Header, Icon } from '@rneui/themed'
import Animated from 'react-native-reanimated'
import { getProductsByProducer, getFarm } from '../Api/services/productServices'

import ProductCard from './components/ProductCard'
import ProductItemHeader from './Home/components/ProductItemHeader'
import Bookmark from './components/Bookmark'

//const { height, width } = Dimensions.get("window");

const ProductItemScreen = ({
    shoppingCart,
    trolleyActions,
    route,
    navigation,
    ...props
}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const { product } = route.params

    const HEADER_HEIGHT =
        Platform.OS === 'ios' ? 115 : 70 + StatusBar.currentHeight

    const scrollY = new Animated.Value(0)
    const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT)
    const headerY = Animated.interpolateNode(diffClampScrollY, {
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
    })

    //const product = navigation.getParam("product", "Product detail");
    const imageUri =
        'http://otuofarms.com/farmdirect/images/' + product.imageUri

    const idx = shoppingCart.findIndex((p) => p.id === product.id)
    let quantity = 0
    if (idx !== -1) {
        let thisCart = Object.assign({}, shoppingCart[idx])
        quantity = thisCart.quantity
    }

    const [productsByFarmer, setProductsByFarmer] = useState([])
    const [isFavourite, setIsFavourite] = useState(false)
    const { favourites, actions } = props

    useEffect(() => {
        fetchData = async () => {
            const products = await getProductsByProducer(product.farmId)
            if (products) {
                setProductsByFarmer(products)
            }
        }
        fetchData()
        if (favourites?.length === 0) actions.loadFavourites()

        if (favourites) {
            // check if its already
            const found = favourites.find((element) => element.id == product.id)
            if (found) {
                setIsFavourite(true)
            } else {
                setIsFavourite(false)
            }
        }

        return () => {}
    }, [product])

    const handleAddToCart = (product) => {
        const idx = shoppingCart.findIndex((p) => p.id === product.id)
        if (idx === -1) {
            trolleyActions.addItemToCart({
                quantity: 1,
                totalPrice: product.price,
                ...product,
            })
        } else {
            let update = Object.assign({}, shoppingCart[idx])
            update.quantity += 1
            update.totalPrice = update.quantity * update.price

            trolleyActions.updateCartItem({ ...update })
        }
    }
    const handleBookmark = () => {
        if (isFavourite) {
            setIsFavourite(false)
            // remove
            actions.removeFromFavourites(product)
        } else {
            setIsFavourite(true)
            //add
            actions.addToFavourites(product)
        }
    }

    const onNavigate = () => {
        navigation.goBack()
    }

    const handleRemoveFromCart = (product) => {
        const idx = shoppingCart.findIndex((p) => p.id === product.id)
        let toRemove = Object.assign({}, shoppingCart[idx])
        toRemove.quantity -= 1
        if (toRemove.quantity > 0) {
            trolleyActions.updateCartItem({ ...toRemove })
        } else trolleyActions.removeItemFromCart({ ...toRemove })
    }

    const handleProductCard = (product) => {
        navigation.push('ItemDetail', {
            product: product,
            title: product.productName,
        })
    }
    const handleNavigate = (title, data) => {
        navigation.navigate('ProductInfo', {
            data: data,
            title: title,
        })
    }

    const renderProduct = ({ item }) => {
        return (
            <View style={{ margin: 6 }} key={item.id}>
                <TouchableOpacity onPress={() => handleProductCard(item)}>
                    <ProductCard
                        product={item}
                        badgeMessage={item.badgeMessage}
                        OnAddPress={() => handleAddToCart(item.id)}
                        onRemovePress={() => handleRemoveFromCart(item.id)}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const gotoProducer = () => {
        // console.log('Hi', product.farm);
        navigation.navigate('Explore', {
            screen: 'Producer',
            params: { farmId: product.farm?.id, producer: product.farm },
        })
    }
    const renderHeader = (headerText) => {
        return (
            <View style={{ flex: 3, flexDirection: 'row', height: 50 }}>
                <View style={{ flex: 3 }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 22,
                            margin: 10,
                            fontFamily: 'Roboto',
                        }}
                    >
                        {headerText}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ height: 40, marginRight: 10 }}
                    onPress={() => {
                        navigation.navigate('ProducerProduct', {
                            farmId: product.farm?.id,
                            producer: product.farm,
                        })
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Text>View All</Text>
                        <Icon
                            name="chevron-right"
                            type="ionicons"
                            color="red"
                            iconStyle={{ alignSelf: 'flex-end', fontSize: 20 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.fill}>
            <StatusBar translucent barStyle="dark-light" />

            <Animated.View
                style={{
                    position: 'absolute',
                    height: HEADER_HEIGHT,
                    left: 0,
                    right: 0,
                    top: 0,
                    zIndex: 1000,
                    elevation: 1000,
                    transform: [{ translateY: headerY }],
                    overflow: 'hidden',
                    alignItems: 'flex-start',
                    paddingTop: 45,
                    backgroundColor: 'transparent',
                }}
            >
                <View style={{ marginHorizontal: 10, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={1}>
                        <Icon
                            type="ionicon"
                            name="arrow-back-circle"
                            color="lightgray"
                            size={50}
                            onPress={onNavigate}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        paddingRight: 50,
                    }}
                >
                    <Bookmark
                        favourite={isFavourite}
                        onToggle={() => handleBookmark()}
                    />
                </View>
            </Animated.View>
            <Animated.ScrollView
                style={{ flex: 1, marginBottom: 40 }}
                bounces={false}
                scrollEventThrottle={5}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([
                    {
                        nativeEvent: { contentOffset: { y: scrollY } },
                    },
                ])}
            >
                <ProductItemHeader
                    title={product.productName}
                    producer={product.farm.farmName}
                    imageUri={{ uri: imageUri }}
                />
                <View style={{ marginHorizontal: 10 }}>
                    <View style={{ marginBottom: 2 }}>
                        <Text
                            style={{
                                fontStyle: 'italic',
                                fontWeight: '200',
                                color: '#970002',
                            }}
                        >
                            {/*{"Discount 20%"}*/}
                        </Text>
                    </View>

                    <StepperLarge
                        onAdd={() => handleAddToCart(product)}
                        onRemove={() => handleRemoveFromCart(product)}
                        quantity={quantity}
                        price={product.price}
                        isOnSale={product.isOnSale}
                        salePrice={product.salePrice}
                        inStock={product.inStock}
                    />
                    <Text style={{ marginTop: 10 }}>
                        Produced in: {product.farm.district}
                    </Text>
                    <Text style={{ fontWeight: '700' }}>
                        {product.productSize}
                    </Text>
                    <ProductDescription
                        product={product}
                        onPress={() =>
                            handleNavigate(
                                'Storage Information',
                                product.storageInformation
                            )
                        }
                        onCookingTipsPress={() =>
                            handleNavigate('Cooking Tips', product.cookingTips)
                        }
                    />
                </View>

                {renderHeader('More from this producer')}
                <View style={{ margin: 6 }}>
                    <FlatList
                        keyExtractor={(item) => item.id.toString()}
                        data={productsByFarmer}
                        renderItem={renderProduct}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{ height: 40 }} />
            </Animated.ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
        favourites: state.favourites,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(favouritesActions, dispatch),
        trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductItemScreen)

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        //   marginBottom: 30,
        // backgroundColor: "transparent",
        backgroundColor: 'white',
    },

    content: {
        flex: 1,
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        height: 80,
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: 80,
        resizeMode: 'cover',
    },

    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        flexDirection: 'row',
        top: 0,
        left: 0,
        right: 0,
    },

    title: {
        color: 'white',
        fontSize: 20,
    },

    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
