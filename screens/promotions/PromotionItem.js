import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { greenTomatoes, lightTomatoes } from '../../constants/colours'
import { useDispatch, useSelector } from 'react-redux'

import {
    removeFromFavourites,
    addToFavourites,
    loadFavourites,
} from '../../redux/actions/favouritesActions'

import { isEmpty } from 'lodash'

import Stepper from './../components/Stepper'
import Bookmark from '../components/Bookmark'

const PromotionItem = ({
    onAddPress,
    onRemovePress,
    onPress,
    product,
    badgeMessage,
    navigation,
    ...props
}) => {
    const [favourite, setFavourite] = useState(false)
    const shoppingCart = useSelector((state) => state.shoppingCart)
    const favourites = useSelector((state) => state.favourites)
    const dispatch = useDispatch()

    useEffect(() => {
        loadAllFavourites()
        return () => {}
    }, [product])

    const loadFavouritesCallback = useCallback(() => {
        dispatch(loadFavourites())
    }, [])

    const loadAllFavourites = () => {
        if (favourites?.length === 0) loadFavouritesCallback()

        if (favourites) {
            // check if its already
            const found = favourites.find((element) => element.id == product.id)
            if (found) {
                setFavourite(true)
            } else {
                setFavourite(false)
            }
        }
    }
    const addToFavouritesCallback = useCallback((item) => {
        dispatch(addToFavourites(item))
    }, [])

    const removeFavouritesCallback = useCallback((item) => {
        dispatch(removeFromFavourites(item))
    }, [])

    const showBadge = !isEmpty(badgeMessage)
    const idx = shoppingCart.findIndex((p) => p.id === product.id)
    let Qty = 0

    if (idx > -1) {
        let thisCart = Object.assign({}, shoppingCart[idx])
        Qty = thisCart.quantity
    }
    const unitPricePerMeasure =
        product.pricePerMeasure.toString() + '/' + product.unitOfMeasure

    const imageSource =
        'http://otuofarms.com/farmdirect/images/' + product.imageUri
    const handleBookmark = () => {
        if (favourite) {
            setFavourite(false)
            removeFavouritesCallback(product)
        } else {
            setFavourite(true)
            //add
            addToFavouritesCallback(product)
        }
    }

    return (
        <View style={styles.container}>
            <View
                style={{
                    flex: 1,
                    height: 160,
                    margin: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: '100%',
                        //margin: 10,
                    }}
                >
                    <View style={{ width: '45%', backgroundColor: 'tomato' }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontFamily: 'Philosopher_BoldItalic',
                                fontSize: 20,
                                marginTop: 10,
                                color: lightTomatoes,
                            }}
                        >
                            20% off
                        </Text>

                        <Text
                            style={{
                                fontSize: 16,
                                fontFamily: 'OpenSansSemiBold',
                                color: 'white',
                                margin: 10,
                            }}
                        >
                            {product.productSize}
                        </Text>

                        <Text
                            style={{
                                fontFamily: 'OpenSans',
                                marginLeft: 10,
                                color: 'white',
                                //  color: '#4c5a23',
                            }}
                        >
                            {product.farm.farmName}
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'OpenSans',
                                marginLeft: 10,
                                color: 'white',
                                //  color: '#4c5a23',
                            }}
                        >
                            {product.productSize}
                        </Text>
                    </View>
                    <ImageBackground
                        style={{
                            flex: 1,
                            resizeMode: 'cover',

                            borderRadius: 12,
                        }}
                        source={{ uri: imageSource }}
                    >
                        <View
                            style={{
                                flex: 1,
                                alignContent: 'flex-end',
                            }}
                        >
                            <Bookmark
                                favourite={favourite}
                                onToggle={handleBookmark}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            {Qty ? (
                                <Text
                                    style={{
                                        fontFamily: 'OpenSansBold',
                                        fontWeight: '600',
                                        color: 'white',
                                    }}
                                >
                                    {Qty} in Basket
                                </Text>
                            ) : null}
                        </View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-start',
                            }}
                        >
                            {showBadge ? (
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignContent: 'flex-start',
                                        backgroundColor: greenTomatoes,
                                        height: 22,
                                        paddingHorizontal: 4,
                                        position: 'absolute',
                                        bottom: 0,
                                    }}
                                >
                                    <Text
                                        style={{
                                            alignSelf: 'auto',
                                            marginLeft: 1,
                                            color: 'white',
                                            fontFamily: 'OpenSans',
                                            color: 'white',
                                        }}
                                    >
                                        {badgeMessage.trim()}
                                    </Text>
                                </View>
                            ) : (
                                <View></View>
                            )}
                        </View>
                    </ImageBackground>
                </View>
            </View>

            <View style={{ height: 90, marginLeft: 10 }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '600',
                        textAlign: 'left',
                        fontFamily: 'OpenSansBold',
                    }}
                >
                    {product.productName}
                </Text>
                {/*<Text style={{ fontFamily: 'OpenSans' }}>{product.farm.farmName}</Text>
        <Text style={{ fontFamily: 'OpenSans', marginTop: 8 }}>
          {product.productSize}
        </Text>*/}

                <View
                    style={{
                        height: 50,
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            marginBottom: 1,
                            paddingVertical: 5,
                        }}
                    >
                        <Stepper
                            onAdd={onAddPress}
                            onRemove={onRemovePress}
                            quantity={Qty}
                            price={product.price}
                            salePrice={product.salePrice}
                            isOnSale={product.isOnSale}
                            inStock={product.inStock}
                            unitPricePerMeasure={unitPricePerMeasure}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
export default PromotionItem

const styles = StyleSheet.create({
    container: {
        height: 300,
        backgroundColor: 'white',
    },
})
