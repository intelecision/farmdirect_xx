import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ImageBackground } from 'react-native'
import { Icon } from '@rneui/themed'
import { greenTomatoes } from '../../constants/colours'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as favouritesActions from '../../redux/actions/favouritesActions'
import Stepper from './Stepper'
import { isEmpty, isArray } from 'lodash'
import { Text } from '../../components/Themed'
import Bookmark from './Bookmark'

const ProductCard = ({
    OnAddPress,
    onRemovePress,
    onPress,
    product,
    shoppingCart,
    badgeMessage,
    navigation,
    ...props
}) => {
    const { favourites, actions } = props
    const [favourite, setFavourite] = useState(false)

    useEffect(() => {
        loadFavourites()
        return () => {}
    }, [product])

    const addToFavouriteItems = async (item) => {
        //get all from list and add new
        actions.addToFavourites(item)
        setFavourite(true)
    }
    const removeFavourites = async (item) => {
        actions.removeFromFavourites(item)

        setFavourite(false)
    }

    const loadFavourites = () => {
        if (favourites?.length === 0) favouritesActions.loadFavourites()

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
            // remove
            actions.removeFromFavourites(product)
        } else {
            setFavourite(true)
            //add
            actions.addToFavourites(product)
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ height: 160 }}>
                <ImageBackground
                    style={{ flex: 1, resizeMode: 'cover' }}
                    source={{ uri: imageSource }}
                    borderRadius={10}
                >
                    <View
                        style={{
                            flex: 1,
                            width: '100%',
                        }}
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
                                        fontWeight: '600',
                                        color: 'white',
                                    }}
                                >
                                    {Qty} in Basket
                                </Text>
                            ) : (
                                <Text></Text>
                            )}
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
                                        }}
                                    >
                                        {badgeMessage.trim()}
                                    </Text>
                                </View>
                            ) : (
                                <View></View>
                            )}
                        </View>
                    </View>
                </ImageBackground>
            </View>

            <View style={{ flex: 1, margin: 4 }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '600',
                        textAlign: 'left',
                    }}
                >
                    {product.productName}
                </Text>
                <Text>{product.farm.farmName}</Text>
                <Text style={{ marginTop: 8 }}>{product.productSize}</Text>

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
                            onAdd={OnAddPress}
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

const mapStateToProps = (state) => ({
    shoppingCart: state.shoppingCart,
    favourites: state.favourites,
})
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(favouritesActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
const styles = StyleSheet.create({
    container: {
        height: 340,
        width: 210,
        backgroundColor: 'white',
    },
})
