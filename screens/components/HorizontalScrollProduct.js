import React from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import ProductCard from './ProductCard'
import { Icon } from '@rneui/themed'
import * as productsActions from '../../redux/actions/productsActions'
import * as shoppingCartActions from '../../redux/actions/shoppingCartActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const HorizontalScrollProduct = ({
    headerText,
    listOfProducts,
    headerPress,
    productCardPress,
    ...props
}) => {
    const handleSelectedItem = (product) => {
        props.navigation.push('ItemDetail', {
            product: product,
            title: product.productName,
        })
    }
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
            update.totalPrice = update.isOnSale
                ? update.quantity * update.salePrice
                : update.quantity * update.price

            trolleyActions.updateCartItem({ ...update })
        }
    }
    const handleRemoveFromCart = (id) => {
        const { shoppingCart, trolleyActions } = props
        const idx = shoppingCart.findIndex((p) => p.id === id)
        let toRemove = Object.assign({}, shoppingCart[idx])
        toRemove.quantity -= 1
        if (toRemove.quantity > 0) {
            trolleyActions.updateCartItem({ ...toRemove })
        } else trolleyActions.removeItemFromCart({ ...toRemove })
    }

    return (
        <View style={{ flex: 1, marginBottom: 10 }}>
            {headerText ? (
                <View style={{ flex: 3, flexDirection: 'row', height: 50 }}>
                    <View style={{ flex: 3 }}>
                        <Text
                            style={{
                                fontWeight: '600',
                                fontSize: 22,
                                margin: 10,
                            }}
                        >
                            {headerText}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ height: 40, marginRight: 10 }}
                        onPress={headerPress}
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
                                iconStyle={{
                                    alignSelf: 'flex-end',
                                    fontSize: 20,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <View />
            )}

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {listOfProducts.map((product) => (
                    <View style={{ margin: 6 }} key={product.id}>
                        <TouchableOpacity
                            onPress={() => productCardPress(product)}
                        >
                            <ProductCard
                                product={product}
                                badgeMessage={product.badgeMessage}
                                OnAddPress={() => handleAddToCart(product.id)}
                                onRemovePress={() =>
                                    handleRemoveFromCart(product.id)
                                }
                            />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
        //categories: state.categories,
        //timeSlot: state.timeSlot,
        //authorization: state.authorization,
        //subCategories: state.subCategories,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productsActions, dispatch),
        trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
        // actionsCategory: bindActionCreators(categoryActions, dispatch),
        // actionsSubCategory: bindActionCreators(subCategoryActions, dispatch),
        // actionTimeSlot: bindActionCreators(timeSlotActions, dispatch),
        // authActions: bindActionCreators(authorizationActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HorizontalScrollProduct)

const styles = StyleSheet.create({
    container: {
        flex: 1,

        margin: 10,
    },
})
