import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native'
import { Image, Input, Button } from '@rneui/themed'
import { connect } from 'react-redux'
import axios from 'axios'
import { emptyBasket } from '../redux/actions/shoppingCartActions'
import { clearTimeSlot } from '../redux/actions/timeSlotActions'
import { postSalesOrder, updateOrder } from '../redux/actions/salesOrderAction'
import { payByMobileMoney } from '../Api/services/mobileMoneyServices'

import { Order } from '../Models/Orderings'
import { farmDirectApi } from './../Api/services/FarmDirectApi'
import { getImageSource } from '../utils/helpers'

const HMAC_SECRET_KEY =
    '8101af7bcee7c2f9c09fff8b24cf5a2e73e50788a81fa2a72566c40391b7d9f8'
const HMAC_CLIENT_KEY = '85f5c0ff05c8db0c900af62e20edc037ba79eedf'
const callback_url = 'http://otuofarms.com/farmdirect/api/callback'

const MobileMoneyScreen = ({ route, navigation, ...props }) => {
    const [isBusy, setIsBusy] = useState(false)
    const [mobileChoice, setMobileChoice] = useState('Select Network')
    const [mobileNumber, setMobileNumber] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [responseText, setResponseText] = useState('')
    const [enablePayButton, setEnablePayButton] = useState(false)
    const [order, setOrder] = useState(undefined)
    const [networkSelected, setNetworkSelected] = useState(false)
    const [buttonTitle, setButtonTitle] = useState('Make Payment')
    const [network_code, setNetwork_code] = useState(undefined)
    const [paymentSuccess, setPaymentSuccess] = useState(false)
    const [orderId, setOrderId] = useState(-1)
    const [savedOrder, setSavedOrder] = useState(new Order())

    const { postSalesOrder, updateOrder, salesOrder } = props

    useEffect(() => {
        const { order: paramOrder } = route.params
        setOrder(paramOrder)
        setButtonTitle(`Pay Gh₵${paramOrder.amount}`)
        return () => {}
    }, [])

    const handleNetwork = (id) => {
        if (id === 1) {
            setNetwork_code('MTN')
            setMobileChoice('MTN Momo')
            setNetworkSelected(true)
        } else if (id === 2) {
            setNetwork_code('VOD')
            setMobileChoice('Vodafone Cash')
            setNetworkSelected(true)
        } else if (id === 3) {
            setNetwork_code('AIR')
            setMobileChoice('AirTel')
            setNetworkSelected(true)
        } else if (id === 4) {
            setNetwork_code('TIG')
            setMobileChoice('TIGO')
            setNetworkSelected(true)
        } else {
            // do nothing
            setNetwork_code('')
            setMobileChoice('')
            setNetworkSelected(false)
        }
    }

    const handleChangeText = (text) => {
        setMobileNumber(text)
        setEnablePayButton(text.length >= 10)
    }
    const getPayload = () => {
        const tn = Date.now()
        return {
            amount: order.amount,
            callback_url: callback_url,
            customer_number: mobileNumber,
            network_code: network_code,
            transaction_id: tn.toString(),
        }
    }

    const completeOrder = () => {
        //  const { order } = route.params;
        let payDetails = getPayload()
        let thisOrder = new Order()
        thisOrder = { ...salesOrder }

        thisOrder.orderNumber = payDetails.transaction_id
        thisOrder.paymentMethod = 'Mobile Money'
        thisOrder.paymentReference = `${network_code} ${mobileNumber}`
        thisOrder.currency = 'GHS'

        farmDirectApi
            .postSalesOrder(thisOrder)
            .then(({ data }) => {
                updateOrder({ ...data })
                takePayment({
                    amount: data.amount,
                    callback_url: callback_url,
                    customer_number: mobileNumber,
                    network_code: network_code,
                    transaction_id: data.orderNumber,
                })
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    const errorHandlerMgs = (msg) => {
        Alert.alert('Something went wrong', msg)
    }

    const handleMobileMoney = () => {
        setIsBusy(true)
        completeOrder()
    }
    const takePayment = (payDetails) => {
        try {
            const { emptyBasket, clearTimeSlot, authorization } = props

            setIsBusy(true)

            payByMobileMoney(authorization.userInfo.token, payDetails)
                .then((response) => {
                    if (response.data.success) {
                        setIsBusy(false)

                        setPaymentSuccess(true)
                        acknowledgePayment()
                    }
                })
                .catch((error) => {
                    setIsBusy(false)
                    errorHandlerMgs('Network error, please try again')
                })
                .then(() => {
                    emptyBasket()
                })
                .then(() => {
                    emptyBasket()
                    clearTimeSlot()
                })
        } catch (error) {
            console.log('there was and error:', error)
        }
    }

    const acknowledgePayment = () => {
        Alert.alert(
            'Thank you',
            'You will be prompted to enter your PIN to confirm the transaction',
            [
                {
                    text: 'OK',
                    onPress: () => closeDialog(),
                },
            ]
        )
    }
    const closeDialog = () => {
        const { emptyBasket, clearTimeSlot } = props
        emptyBasket()
        clearTimeSlot()
        // check for call back!!
        navigation.navigate('Modal', {
            screen: 'CheckOut',
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8fa' }}>
            <View>
                <View style={{ justifyContent: 'center', paddingVertical: 20 }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontFamily: 'OpenSans',
                            fontSize: 22,
                            fontWeight: '700',
                        }}
                    >
                        Which network are you paying with
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => handleNetwork(1)}
                    >
                        <Image
                            source={{ uri: getImageSource('mtn_2.png') }}
                            style={styles.imageStyle}
                            PlaceholderContent={<ActivityIndicator />}
                            transition
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => handleNetwork(2)}
                    >
                        <Image
                            source={{ uri: getImageSource('voda.jpg') }}
                            style={styles.imageStyle}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => handleNetwork(3)}
                    >
                        <Image
                            source={{ uri: getImageSource('airtel.jpg') }}
                            style={styles.imageStyle}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => handleNetwork(4)}
                    >
                        <Image
                            source={{ uri: getImageSource('tigo.jpg') }}
                            style={styles.imageStyle}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            marginVertical: 10,
                            fontSize: 18,
                            fontWeight: '700',
                            textAlign: 'center',
                        }}
                    >
                        {mobileChoice}
                    </Text>
                    {networkSelected ? (
                        <Input
                            placeholder="Mobile number"
                            value={mobileNumber}
                            maxLength={10}
                            keyboardType="phone-pad"
                            returnKeyType="done"
                            style={{ marginTop: 8, height: 30 }}
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'mobile',
                                size: 26,
                                marginLeft: 1,
                            }}
                            inputStyle={{
                                paddingLeft: 8,
                                fontSize: 20,
                                fontWeight: '700',
                            }}
                            onChangeText={(text) => {
                                handleChangeText(text)
                            }}
                        />
                    ) : (
                        <View />
                    )}

                    <View style={{ paddingVertical: 40 }}>
                        <Button
                            onPress={() => handleMobileMoney()}
                            title={buttonTitle}
                            loading={isBusy}
                            disabled={!enablePayButton}
                            buttonStyle={{ backgroundColor: 'tomato' }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        authorization: state.authorization,
        shoppingCart: state.shoppingCart,
        salesOrder: state.salesOrder,
    }
}

const mapDispatchToProps = {
    emptyBasket,
    clearTimeSlot,
    postSalesOrder,
    updateOrder,
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileMoneyScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8fa',
    },
    imageStyle: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
    },
    buttonStyle: {
        margin: 10,
    },
})
