import { View, Text, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Image } from '@rneui/base'
import { getImageSource } from './../../../utils/helpers'

type Props = {
    cardType: string
    paymentMethod: string
    onPress: () => void
}

const WalletItem = ({ paymentMethod, cardType, onPress }: Props) => {
    const [imgUrl, setImgUrl] = useState(null)
    useEffect(() => {
        setImgUrl(getImage())

        return () => {}
    }, [cardType])

    const getImage = () => {
        let paymentType = cardType.toLocaleLowerCase().trim()

        if (paymentType === 'visa') return getImageSource('Visa.png')
        if (paymentType === 'paypal') return getImageSource('PayPal2.png')

        if (paymentType === 'voda') return getImageSource('voda.jpg')
        if (paymentType == 'mtn') return getImageSource('mtn.jpg')
        if (paymentType === 'expresspay')
            return getImageSource('expresspay.jpg')
    }

    return (
        <View>
            <Pressable
                onPress={() => onPress}
                style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                })}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // paddingHorizontal: 20,
                        height: 50,
                        width: '100%',
                        backgroundColor: 'white',
                        //marginBottom: 2,
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            alignItems: 'center',
                            backgroundColor: 'white',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            source={imgUrl}
                            resizeMode="contain"
                            style={{
                                height: 30,
                                width: 70,
                                // alignItems: "center",
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flex: 1,
                            height: 50,
                            borderBottomColor: '#ddd',
                            borderBottomWidth: 0.5,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            //  alignItems:"center"
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'OpenSans',
                                fontSize: 15,
                                marginLeft: 20,
                            }}
                        >
                            {paymentMethod}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderBottomColor: '#ddd',
                            borderBottomWidth: 0.5,
                        }}
                    >
                        <Ionicons
                            name="chevron-forward-sharp"
                            size={25}
                            color="#ddd"
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

export default WalletItem
