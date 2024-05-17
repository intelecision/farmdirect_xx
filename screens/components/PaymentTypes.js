import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { CheckBox, Image } from '@rneui/themed'

const PaymentTypes = ({ cartType, checked, imageUri, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    backgroundColor: 'white',
                    height: 50,
                    borderRadius: 8,
                }}
            >
                <View
                    style={{
                        width: 40,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}
                >
                    <CheckBox
                        size={20}
                        checkedColor="tomato"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={checked}
                        onPress={onPress}
                    />
                </View>

                <View
                    style={{
                        flex: 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Image
                        resizeMode="cover"
                        source={{ uri: imageUri }}
                        style={{ width: 50, height: 30, margin: 10 }}
                    />
                    <Text style={{ marginLeft: 10, alignSelf: 'center' }}>
                        {cartType}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default PaymentTypes
