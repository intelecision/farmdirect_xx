import React from 'react'
import PropTypes from 'prop-types'

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { greenTomatoes } from '../../constants/colours'

const { height, width } = Dimensions.get('window')
const StepperLarge = ({
    quantity,
    onAdd,
    onRemove,
    price,
    salePrice,
    isOnSale,
    inStock,
}) => {
    renderAdd = () => {
        return (
            <View>
                {inStock ? (
                    <TouchableOpacity
                        style={styles.AddStyle}
                        activeOpacity={0.5}
                        onPress={onAdd}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            {isOnSale ? (
                                <View style={{ flexDirection: 'row' }}>
                                    <Text
                                        style={{
                                            // fontSize: 18,
                                            fontWeight: '600',
                                            color: 'white',
                                            marginLeft: 10,
                                            textDecorationLine: 'line-through',
                                        }}
                                    >
                                        ₵{price}
                                    </Text>

                                    <Text
                                        style={{
                                            marginLeft: 20,
                                            color: 'white',
                                            //fontSize: 18,
                                            fontWeight: '600',
                                            textDecorationLine: 'none',
                                        }}
                                    >
                                        ₵{salePrice}
                                    </Text>
                                </View>
                            ) : (
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        color: 'white',
                                        //fontSize: 18,
                                        fontWeight: '600',
                                    }}
                                >
                                    ₵{price}
                                </Text>
                            )}
                        </View>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 18,
                                fontWeight: '600',
                                color: 'white',
                                marginRight: 20,
                            }}
                        >
                            Add to basket
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '700',
                            alignSelf: 'flex-end',
                            marginRight: 10,
                            color: greenTomatoes,
                        }}
                    >
                        BACK SOON
                    </Text>
                )}
            </View>
        )
    }
    renderStepper = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    // paddingLeft: 20,
                    borderWidth: 0.5,
                    borderColor: '#dddddd',
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        {isOnSale ? (
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        //fontSize: 18,
                                        fontWeight: '600',
                                        marginLeft: 10,
                                        textDecorationLine: 'line-through',
                                    }}
                                >
                                    ₵{price}
                                </Text>
                                <Text
                                    style={{
                                        marginLeft: 20,
                                        color: 'red',
                                        // fontSize: 18,
                                        fontWeight: '600',
                                    }}
                                >
                                    ₵{price}
                                </Text>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                <Text
                                    style={{
                                        marginLeft: 10,
                                        color:
                                            quantity === 0 ? 'white' : 'black',
                                        //fontSize: 18,
                                        fontWeight: '600',
                                    }}
                                >
                                    ₵{price}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                        paddingRight: 20,
                        justifyContent: 'flex-end',
                    }}
                >
                    <Text style={{ alignSelf: 'center' }}>Qty</Text>
                    <TouchableOpacity
                        style={styles.UpDownButtonStyle}
                        activeOpacity={0.5}
                        onPress={onRemove}
                    >
                        <View style={styles.StepperGroupStyle}>
                            <Ionicons
                                name="ios-remove"
                                size={25}
                                margin={5}
                                style={{ alignSelf: 'center' }}
                            />
                        </View>
                    </TouchableOpacity>

                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ width: 20, textAlign: 'center' }}>
                            {quantity}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.UpDownButtonStyle}
                        onPress={onAdd}
                        activeOpacity={0.5}
                    >
                        <View style={styles.StepperGroupStyle}>
                            <Ionicons
                                name="ios-add"
                                size={25}
                                margin={5}
                                style={{ alignSelf: 'center' }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return <View>{quantity === 0 ? renderAdd() : renderStepper()}</View>
}

export default StepperLarge

StepperLarge.propTypes = {
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    inStock: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        margin: 10,
    },
    StepperGroupStyle: {
        flex: 1,
        paddingLeft: 4,
    },
    NumberRowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderWidth: 0.5,
        borderColor: '#dddddd',
        width: width - 20,
        //margin: 5
    },
    UpDownButtonStyle: {
        backgroundColor: '#f2e4e1',
        borderWidth: 0.5,
        borderColor: '#eb4a2a',
        height: 35,
        width: 35,
        margin: 5,
    },
    AddStyle: {
        backgroundColor: 'tomato',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        width: width - 40,
        //margin: 5,
        //  paddingLeft: 20,
        paddingRight: 20,
    },

    TextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginRight: 20,
    },
    SeparatorLine: {
        backgroundColor: '#fff',
        width: 1,
        height: 40,
    },
})
