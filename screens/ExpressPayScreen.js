import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, Alert } from 'react-native'
import { connect, useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { emptyBasket } from '../redux/actions/shoppingCartActions'
import { clearTimeSlot } from '../redux/actions/timeSlotActions'

import { globalStyles } from './../styles/global'

import { WebView } from 'react-native-webview'
import { expressPayApi } from './../Api/services/expressPayApi'
import { useNavigation, useRoute } from '@react-navigation/core'
import { postSalesOrder } from '../redux/actions/salesOrderAction'

const ExpressPayScreen = ({}) => {
    const navigation = useNavigation()
    const route = useRoute()
    const dispatch = useDispatch()
    const { order } = route.params

    const salesOrder = useSelector((state) => state.salesOrder)
    const authorization = useSelector((state) => state.authorization)
    const [retrying, setRetrying] = useState(false)
    const [approvalUrl, setApprovalUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [paidOrder, setPaidOrder] = useState({})
    const [showModal, setShowModal] = useState()
    const [result, setResult] = useState(null)
    const [canDisable, setCanDisable] = useState(false)
    const [apiKey, setApiKey] = useState()
    const [redirectUrl, setRedirectUrl] = useState(
        'http://www.otuofarms.com/farmdirect/api/callback/expresspay'
    )
    const [merchantId, setMerchantId] = useState()
    useEffect(() => {
        setApiKey(expressPayApi.getAuthKey())
        setMerchantId(expressPayApi.getMerchantId())
        console.log('user', authorization.userInfo)
        createOrderCallback()
        // saveOrder();
        setTimeout(() => {
            processPayment()
        }, 2000)
        return () => {}
    }, [])

    const createOrderCallback = useCallback(() => {
        dispatch(postSalesOrder(order))
    }, [order])

    const saveOrder = () => {
        const { emptyBasket, clearTimeSlot } = props
        if (!order) return

        // order wasalready saved
        if (retrying) return

        const tn = Date.now()
        order.paymentMethod = 'ExpressPay'

        order.orderNumber = tn.toString()
        axios
            .post('http://www.otuofarms.com/farmdirect/api/Orders/', order, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(({ data }) => {
                setPaidOrder(data)
                setRetrying(true)
            })

            .catch((err) => {
                Alert.alert(
                    'An Error occurred while processing your order please try again'
                )
                console.log('---ERROR:', err.response)
            })
            .then(() => {
                emptyBasket()
                clearTimeSlot()
            })
    }

    const processPayment = () => {
        const { firstName, lastName, username, phoneNumber } =
            authorization.userInfo
        //get details from authorization.userInfo
        const data = {
            'merchant-id': expressPayApi.getMerchantId(),
            'api-key': expressPayApi.getAuthKey(),
            firstname: firstName,
            'lastname ': lastName,
            email: username,
            phonenumber: phoneNumber,
            currency: 'GHS',
            amount: order.amount,
            'order-id': order.orderNumber,
            'redirect-url': redirectUrl,
        }

        expressPayApi
            .makeExpressPayment(data)
            .then((response) => {
                let newData = JSON.parse(
                    JSON.stringify(response.data).replace('-', '_')
                )
                if (response.data?.status === 1) {
                    let paymentCheckout = expressPayApi.getApprovalUrl(
                        newData.token
                    )
                    console.log('response from express', response.data)
                    setApprovalUrl(paymentCheckout)
                    setShowModal(true)
                } else {
                    Alert.alert(
                        'Error',
                        'Something is wrong with the details entered',
                        [
                            {
                                text: 'Ok',
                                onPress: () => {
                                    console.log(
                                        'Error in Express pay',
                                        response.data
                                    )
                                    // navigation.navigate
                                },
                            },
                        ]
                    )
                }
            })
            .catch((err) => {
                Alert.alert('Error', err)
            })
    }

    const handleRequestClose = () => {
        setShowModal(false)
    }
    const submitPayment = (input) => {
        try {
            saveOrder()
            processPayment(input)
        } catch (error) {
            console.log('submitPayment failed', error)
        }
    }

    const getQueryString = (field, url) => {
        var href = url ? url : window.location.href
        var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i')
        var string = reg.exec(href)
        return string ? string[1] : null
    }
    const responseStateChange = (webViewState) => {
        if (webViewState.url.includes('summaryPage')) {
            // cant close
            setCanDisable(true)
        }
        if (webViewState.url.includes(redirectUrl)) {
            setLoading(false)
            setApprovalUrl(null)

            const order_id = getQueryString('order-id', webViewState.url)
            const token = getQueryString('token', webViewState.url)
            const cancel = getQueryString('cancel', webViewState.url)

            // close the window cancel=true
            setShowModal(false)
            //TODO go to check out complete
            if (!cancel) navigation.navigate('CheckOut')
        }
    }

    return (
        <View style={globalStyles.container}>
            <View style={{ flex: 1, paddingBottom: 2 }}>
                <WebView
                    style={{
                        flex: 1,
                        //marginTop: 20,
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                    }}
                    source={{ uri: approvalUrl }}
                    onNavigationStateChange={(data) =>
                        responseStateChange(data)
                    }
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                    renderLoading={() => <ActivityIndicator />}
                />
            </View>
            {/*</Modal>*/}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        authorization: state.authorization,
        shoppingCart: state.shoppingCart,
    }
}

const mapDispatchToProps = {
    emptyBasket,
    clearTimeSlot,
}
export default connect(mapStateToProps, mapDispatchToProps)(ExpressPayScreen)

const styles = StyleSheet.create({
    errorStyles: {
        marginBottom: 6,
        marginTop: 2,
        marginLeft: 2,
        fontWeight: '400',
        color: 'crimson',
        fontSize: 13,
    },
})
