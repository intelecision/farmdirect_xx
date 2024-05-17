import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import PaymentTypes from './components/PaymentTypes'
import { Button, Header, Icon } from '@rneui/base'
import { useRoute, useNavigation } from '@react-navigation/core'
import { getImageSource } from '../utils/helpers'

const options = {
    MOBILE_MONEY: 'mobileMoney',
    PAY_PAL: 'payPal',
    //CREDIT_CARD: "creditCard",
    EXPRESS_PAY: 'ExpressPay',
    //GOOGLE_PAY: "Google Pay",
}
const paymentMethods = [
    {
        id: 1,
        name: 'Mobile Money',
        source: getImageSource('mobile_money.png'),
        option: 'mobileMoney',
        selectedId: false,
    },

    //{
    //    id: 4,
    //    name: 'ExpressPay',
    //    option: 'expressPay',
    //    source: getImageSource('expresspay.jpg'),
    //    checked: false,
    //},
]

const PaymentOptions = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { order } = route.params
    const allowedCardNetwork = ['VISA', 'MASTERCARD']
    const [selectedItem, setSelectedItem] = useState(null)
    const [paymentOption, setPaymentOption] = useState()

    useEffect(() => {
        setPaymentOption(paymentMethods)
        return () => {}
    }, [])

    const handleChoice = () => {
        const option = selectedItem?.option

        switch (option) {
            case 'mobileMoney':
                route.params.onGoBack('MobileMoney')
                navigation.goBack()

                break
            case 'creditCard':
                route.params.onGoBack('creditCard')
                navigation.goBack()
                navigation.navigate('Modal', {
                    screen: 'CardPayment',
                    params: { order: order },
                })
                break
            case 'payPal':
                route.params.onGoBack('payPal')
                navigation.goBack()

                break
            case 'expressPay':
                route.params.onGoBack('expressPay')
                navigation.goBack()
                break
            case 'googlePay':
                //TODO

                handleGooglePay()
                break

            default:
                break
        }
    }

    const handleGooglePay = () => {
        // Check if Google Pay is available
        GooglePay.isReadyToPay(
            allowedCardNetworks,
            allowedCardAuthMethods
        ).then((ready) => {
            if (ready) {
                // Request payment token
                GooglePay.requestPayment(requestData)
                    .then((token) => {
                        // Send a token to your payment gateway
                    })
                    .catch((error) => console.log(error.code, error.message))
            }
        })
    }
    const renderItem = ({ item }) => {
        return (
            <PaymentTypes
                cartType={item.name}
                imageUri={item.source}
                checked={item.checked}
                onPress={() => {
                    handleSelection(item)
                }}
            />
        )
    }
    const itemSeparator = () => {
        return <View style={{ height: 8 }} />
    }
    const handleSelection = (item) => {
        var selected = selectedItem
        setSelectedItem(null)
        if (selected) {
            selectedItem.checked = false
        }

        if (selected === item) {
            setSelectedItem(null)
            item.checked = false
        } else {
            item.checked = true
            setSelectedItem(item)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8fa' }}>
            <View style={{ flex: 1, marginTop: 10 }}>
                <FlatList
                    data={paymentOption}
                    extraData={selectedItem}
                    renderItem={renderItem}
                    ItemSeparatorComponent={itemSeparator}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <View
                style={{
                    justifyContent: 'center',
                    height: 120,
                    backgroundColor: 'white',
                    paddingHorizontal: 20,
                }}
            >
                <Button
                    title="Confirm"
                    onPress={() => handleChoice()}
                    style={{ paddingHorizontal: 30 }}
                    buttonStyle={{
                        height: 50,
                        backgroundColor: 'tomato',
                    }}
                />
            </View>
        </View>
    )
}

export default PaymentOptions

const styles = StyleSheet.create({})
