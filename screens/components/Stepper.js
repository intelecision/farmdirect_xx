import React from 'react'
import PropTypes from 'prop-types'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { greenTomatoes } from '../../constants/colours'

const Stepper = React.memo(
    ({
        quantity,
        onAdd,
        onRemove,
        price,
        salePrice,
        isOnSale,
        unitPricePerMeasure,
        inStock,
    }) => {
        renderAdd = () => {
            return (
                <View style={{ paddingLeft: 10 }}>
                    {inStock ? (
                        <TouchableOpacity
                            style={styles.AddStyle}
                            activeOpacity={0.5}
                            onPress={onAdd}
                        >
                            <Text
                                style={{
                                    textAlignVertical: 'center',
                                    textAlign: 'center',
                                    color: 'white',
                                    marginTop: 5,
                                }}
                            >
                                Add
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                marginRight: 8,
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
                        alignContent: 'flex-end',
                        paddingLeft: 10,
                    }}
                >
                    <TouchableOpacity
                        style={styles.UpDownButtonStyle}
                        activeOpacity={0.5}
                        onPress={onRemove}
                    >
                        <View style={styles.StepperGroupStyle}>
                            <Ionicons
                                name={
                                    quantity == 1 ? 'ios-trash' : 'ios-remove'
                                }
                                color={quantity == 1 ? '#a9a9a9' : 'black'}
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
                                style={{ alignSelf: 'center' }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View style={styles.NumberRowStyle}>
                <View
                    style={{
                        flex: 2,
                        flexDirection: 'column',
                        alignContent: 'space-between',
                    }}
                >
                    {isOnSale ? (
                        <View>
                            <Text
                                style={{
                                    fontWeight: '500',
                                    marginLeft: 10,
                                    color: 'red',
                                }}
                            >
                                GH₵{salePrice}
                            </Text>

                            <Text
                                style={{
                                    fontWeight: '500',
                                    marginLeft: 10,

                                    textDecorationLine: 'line-through',
                                }}
                            >
                                GH₵{price}
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Text
                                style={{
                                    fontWeight: '500',
                                    marginLeft: 5,
                                }}
                            >
                                GH₵{price}
                            </Text>
                            {unitPricePerMeasure > 0 ? (
                                <Text
                                    style={{
                                        fontSize: 12,
                                        marginLeft: 10,
                                    }}
                                >
                                    GH₵{unitPricePerMeasure}
                                </Text>
                            ) : (
                                <View />
                            )}
                        </View>
                    )}
                </View>
                {quantity === 0 ? renderAdd() : renderStepper()}
            </View>
        )
    }
)

export default Stepper

Stepper.propTypes = {
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    unitPricePerMeasure: PropTypes.string,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    NumberRowStyle: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        height: 40,
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
        borderWidth: 0.5,
        borderColor: '#dddddd',
        height: 35,
        width: 80,
        marginRight: 10,
        paddingLeft: 10,
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
