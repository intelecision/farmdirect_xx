import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import Bookmark from './Bookmark'
import Stepper from './Stepper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as favouritesActions from '../../redux/actions/favouritesActions'

// starts here
const TrolleyItem = React.memo(
    ({
        type,
        item,
        quantity,
        onPress,
        onAddToTrolley,
        onRemoveFromTrolley,
        ...props
    }) => {
        const imageSource =
            'http://otuofarms.com/farmdirect/images/' + item.imageUri
        const [isFavourite, setIsFavourite] = useState(false)
        const { favourites, actions } = props
        useEffect(() => {
            if (favourites?.length === 0) actions.loadFavourites()

            if (favourites) {
                // check if its already
                const found = favourites.find(
                    (element) => element.id == item.id
                )
                if (found) {
                    setIsFavourite(true)
                } else {
                    setIsFavourite(false)
                }
            }
            return () => {}
        }, [item])

        const handleBookmark = () => {
            if (isFavourite) {
                setIsFavourite(false)
                // remove
                actions.removeFromFavourites(item)
            } else {
                setIsFavourite(true)
                //add
                actions.addToFavourites(item)
            }
        }
        return (
            <TouchableOpacity onPress={onPress}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        width: '100%',
                        height: type === 1 ? 125 : 150,
                        backgroundColor: '#fff',
                    }}
                >
                    <View>
                        <ImageBackground
                            style={{
                                flex: 1,
                                width: type === 1 ? 100 : 130,
                                height: null,
                                paddingBottom: 10,
                                resizeMode: 'cover',
                            }}
                            borderRadius={10}
                            source={{
                                uri: imageSource,
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                }}
                            >
                                <Bookmark
                                    favourite={isFavourite}
                                    onToggle={handleBookmark}
                                />
                            </View>
                        </ImageBackground>
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
                                marginBottom: 10,
                                paddingBottom: 10,
                                paddingRight: 10,
                                alignContent: 'flex-end',
                            }}
                        >
                            <Stepper
                                onAdd={onAddToTrolley}
                                onRemove={onRemoveFromTrolley}
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
)

const mapStateToProps = (state) => ({
    shoppingCart: state.shoppingCart,
    favourites: state.favourites,
})
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(favouritesActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TrolleyItem)

const styles = StyleSheet.create({})
