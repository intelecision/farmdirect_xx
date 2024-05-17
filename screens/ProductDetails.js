import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, ImageBackground } from 'react-native'
import { Icon } from '@rneui/themed'
import { ScrollView } from 'react-native-gesture-handler'
import StepperLarge from './components/StepperLarge'
import ProductDescription from './components/ProductDescription'

const ProductDetails = ({
    navigation,
    product,
    showModal,
    onFavourite,
    onClose,
    onNavigate,
    ...props
}) => {
    const imageUri =
        'http://otuofarms.com/farmdirect/images/' + product.imageUri
    let quantity = 0

    const handleNavigate = (title, data) => {
        navigation.navigate('ProductInfo', {
            data: data,
            title: title,
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Modal
                animationType="slide"
                //transparent
                visible={showModal}
                onRequestClose={onClose}
            >
                <View
                    style={{
                        margin: 0,
                        flex: 1,
                        marginBottom: 0,
                        marginTop: 40,
                    }}
                >
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Icon
                                name="close"
                                color="red"
                                size={25}
                                onPress={onClose}
                            />
                        </View>
                        <View>
                            <Text style={{ textAlign: 'center' }}> HEADER</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <Icon name="bookmark" size={25} onPress={onClose} />
                        </View>
                    </View>

                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.fake_box}>
                            <ImageBackground
                                style={{
                                    flex: 1,
                                    width: null,
                                    height: null,
                                    resizeMode: 'cover',
                                }}
                                // style={{ resizeMode: "cover", height: 300 }}
                                source={{ uri: imageUri }}
                            />
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 200,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 1000,
                                    elevation: 1000,
                                }}
                            >
                                <Text
                                    style={{
                                        marginHorizontal: 10,
                                        fontSize: 34,
                                        fontWeight: '700',
                                        color: 'white',
                                        fontFamily:
                                            Platform.OS === 'ios'
                                                ? 'Cochin'
                                                : 'Roboto',
                                    }}
                                >
                                    {/*{product.productName}*/}
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: '400',
                                        color: 'white',
                                        alignContent: 'center',
                                        marginHorizontal: 10,
                                    }}
                                >
                                    {/*{product.farm.farmName}*/}
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: 10 }}>
                            <View style={{ marginTop: 20, marginBottom: 5 }}>
                                <Text style={{ fontWeight: '700' }}>
                                    {product.productSize}
                                </Text>
                            </View>
                            <View style={{ marginBottom: 20 }}>
                                <Text
                                    style={{
                                        fontStyle: 'italic',
                                        fontWeight: '200',
                                        color: '#970002',
                                    }}
                                >
                                    {/* {"Discount 20%"} */}
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
                                Produced in: product.farm.district
                            </Text>
                            <ProductDescription
                                product={product}
                                onPress={() =>
                                    handleNavigate(
                                        'Storage Information',
                                        product.storageInformation
                                    )
                                }
                                onCookingTipsPress={onNavigate}
                            />
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    fill: {
        flex: 1,
        //   marginBottom: 30,
        backgroundColor: 'transparent',
    },

    content: {
        margin: 0,
        flex: 1,
        marginBottom: 0,
        //marginTop: 50,
        backgroundColor: 'transparent',
    },

    header: {
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopStartRadius: 15,
        borderTopEndRadius: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.75,
        zIndex: 1000,
        elevation: 100,
        //  opacity: 0.1,
    },
    headerRight: {
        //  width: 40,
        paddingRight: 20,
    },
    headerLeft: {
        // width: 40,
        paddingLeft: 20,
        opacity: 1,
        //  backgroundColor: 'gray',
    },
    headerText: {
        // flex: 1,
    },
    fake_box: {
        height: 300,
        marginHorizontal: 1,
        borderRadius: 8,
        marginTop: 16,
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
