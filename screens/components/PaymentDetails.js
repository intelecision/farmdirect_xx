import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons/Ionicons'
import { Icon } from '@rneui/themed'
import { getImageSource } from '../../utils/helpers'
function PaymentDetails({ method, onPress }) {
    const [paymentOption, setPaymentOption] = useState(
        'Please select payment method'
    )
    const [imageUri, setImageUri] = useState(getImageSource('wallet.png'))
    const [isSelected, setIsSelected] = useState(false)
    useEffect(() => {
        getPaymentType(method)
        return () => {}
    }, [method])
    //

    const getPaymentType = (type) => {
        switch (type) {
            case 'cc':
                {
                    setPaymentOption('Pay using Credit Card')
                    setImageUri(getImageSource('wallet.png'))
                    setIsSelected(true)
                }
                break
            //case 'expressPay':
            //    {
            //        setPaymentOption('Pay using expressPay')
            //        setImageUri(getImageSource('expresspay.jpg'))
            //        setIsSelected(true)
            //    }
            //    break
            case 'MobileMoney':
                {
                    setPaymentOption('Pay using Mobile Money')
                    setImageUri(getImageSource('mobile_money.png'))
                    setIsSelected(true)
                }
                break
            case 'PayPal':
                {
                    setPaymentOption('Pay using PayPal')
                    setImageUri(getImageSource('wallet.png'))
                    setIsSelected(true)
                }
                break

            default:
                {
                    setPaymentOption('Please select payment method')
                    setImageUri(getImageSource('wallet.png'))
                    setIsSelected(false)
                }
                break
        }
    }

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
            }}
        >
            <TouchableOpacity style={{ height: 50 }} onPress={onPress}>
                <View style={{ flexDirection: 'row' }}>
                    <View
                        style={{
                            flex: 3,
                            flexDirection: 'row',
                            height: 50,
                        }}
                    >
                        <Image
                            resizeMode="cover"
                            source={{ uri: imageUri }}
                            style={{
                                width: 40,
                                height: 40,
                                marginTop: 4,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}
                        />
                        {isSelected ? (
                            <Text
                                style={{
                                    textAlignVertical: 'center',
                                    textAlign: 'center',
                                    margin: 15,
                                }}
                            >
                                {paymentOption}
                            </Text>
                        ) : (
                            <Text
                                style={{
                                    textAlignVertical: 'center',
                                    textAlign: 'center',
                                    margin: 15,
                                    color: 'crimson',
                                }}
                            >
                                {paymentOption}
                            </Text>
                        )}
                    </View>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            margin: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            type="ionicon"
                            name="chevron-forward-outline"
                            color="tomato"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default PaymentDetails

const styles = StyleSheet.create({})
