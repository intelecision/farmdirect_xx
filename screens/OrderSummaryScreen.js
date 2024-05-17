import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native'
import Dialog from 'react-native-dialog'
import { saveToStore, retrieveItem } from '../utils/localStorage'
import { getServiceEndpoint } from '../Api/services/servicesApi'
import { loadDeliveryAddress } from '../redux/actions/deliveryAddressAction'
import { connect } from 'react-redux'
import axios from 'axios'
import { Order } from '../Models/Orderings'
import { LogBox } from 'react-native'

import {
    loadTimeSlot,
    saveSlot,
    updateTimeSlot,
} from '../redux/actions/timeSlotActions'
import DeliverySlot from './components/DeliverySlot'
import DeliveryInformation from './components/DeliveryInformation'
import DeliveryInstructions from './components/DeliveryInstructions'
import PaymentDetails from './components/PaymentDetails'
import OrderTotal from './components/OrderTotal'
import CheckoutButton from './components/CheckOutButton'
import {
    createSalesOrder,
    updateOrder,
    postSalesOrder,
} from '../redux/actions/salesOrderAction'
import { farmDirectApi } from './../Api/services/FarmDirectApi'

const OrderSummaryScreen = ({ route, navigation, ...props }) => {
    const [userInfo, setUserInfo] = useState({})
    const [showExpressPay, setShowExpressPay] = useState(false)

    const [discountAmount, setDiscountAmount] = useState(0)
    const [voucherCode, setVoucherCode] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('none')
    const [deliveryCost, setDeliveryCost] = useState(0)
    const [basketTotal, setBasketTotal] = useState(0)
    const [deliveryInstruction, setDeliveryInstruction] = useState(
        'If not available call me for further instructions'
    )
    const [totalAmount, setTotalAmount] = useState(route.params?.discount)
    const {
        authorization,
        timeSlot,
        shoppingCart,
        products,
        removeItemFromCart,
        updateCartItem,
        addItemToCart,
        deliverToAddress,
        updateOrder,
        postSalesOrder,
        defaultDeliveryAddress,
        salesOrder,
    } = props
    const [showDialog, setShowDialog] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        setUserInfo(authorization.userInfo)
        setDiscountAmount(route?.params?.discount)

        loadTimeSlot()
        loadDeliveryAddress()
        getLastPaymentMethod()
        getSummary()
        return () => {}
    }, [discountAmount, timeSlot])

    const onCloseExpressPay = () => {
        setShowExpressPay(false)
    }
    const getLastPaymentMethod = async () => {
        const method = await retrieveItem('PaymentMethod')
        setPaymentMethod(method)
    }
    const handleInstruction = () => {
        navigation.navigate('Modal', {
            screen: 'EditDeliveryInfo',
            params: { onGoBack: (text) => updateDeliveryInstruction(text) },
        })
    }

    const updateDeliveryInstruction = (text) => {
        setDeliveryInstruction(text)
    }
    const handleAddress = () => {
        navigation.navigate('Modal', {
            screen: 'YourAddresses',
        })
    }
    const handleFirstDeliveryAddress = () => {
        navigation.navigate('Modal', {
            screen: 'DeliveryAddress',
        })
    }
    const handleDeliverySlot = () => {
        const { navigate } = navigation
        navigation.navigate('Modal', {
            screen: 'TimeSlot',
            params: { direction: 'Trolley' },
        })
    }
    const handlePayOption = () => {
        const orderData = createOrder()

        navigation.navigate('Modal', {
            screen: 'PaymentOptions',
            params: {
                order: orderData,
                onGoBack: (payOption) => selectedPaymentMethod(payOption),
            },
        })
    }

    const selectedPaymentMethod = (payOption) => {
        setPaymentMethod(payOption)
        saveToStore('PaymentMethod', payOption)
        // console.log('payOption', payOption, paymentMethod);
    }
    const createOrder = () => {
        let order = new Order()
        let thisDay = new Date()
        const tn = Date.now()

        order.userId = userInfo.id
        order.phoneNumber = userInfo.phoneNumber
        order.fullName = `${userInfo.firstName} ${userInfo.lastName}`
        order.discountAmount = discountAmount
        order.voucherValue = discountAmount
        order.voucherCode = voucherCode
        order.mobile = defaultDeliveryAddress.mobile
        order.orderDate = thisDay
        order.paymentDate = thisDay
        order.amount = getGrandTotal() + timeSlot.deliveryCost - discountAmount
        order.subtotal = getTotalPrice()
        order.orderStatus = 'Pending'
        order.paymentStatus = 'Pending'
        order.deliveryCost = timeSlot.deliveryCost
        order.deliveryAddress = addressToString(defaultDeliveryAddress)
        order.deliveryDate = timeSlot.date
        order.deliverySlot = timeSlot.slot
        order.orderItems = getCartItem()
        order.orderNumber = tn.toString()

        // order.id = -1;

        return order
    }
    const getCartItem = () => {
        let orderItems = []
        shoppingCart.forEach((item) => {
            let orderItem = {}
            orderItem.productId = item.id
            orderItem.quantity = item.quantity
            orderItem.unitPrice = item.price
            orderItem.totalPrice = item.totalPrice
            orderItem.discount = item.discount
            orderItems.push(orderItem)
        })

        return orderItems
    }
    function getTotalPrice() {
        let totalPrice = shoppingCart.reduce(function (total, currentValue) {
            return total + currentValue.totalPrice
        }, 0)

        return totalPrice
    }
    const addressToString = (address) => {
        const data = `${address.nickName}, ${address.firstName} ${address.lastName}, ${address.streetName}, ${address.district}, ${address.town}, ${address.region}, ${address.digitalAddress} `
        return data.replace('undefined', '')
    }
    const getGrandTotal = () => {
        let totalPrice = shoppingCart.reduce(function (total, currentValue) {
            return total + currentValue.totalPrice
        }, 0)

        return totalPrice
    }
    const round = (value, decimals) => {
        return Number(
            Math.round(value + 'e' + decimals) + 'e-' + decimals
        ).toFixed(decimals)
    }
    const getSummary = () => {
        const deliveryCost = timeSlot.deliveryCost
        setDeliveryCost(deliveryCost)
        let basketAmount = shoppingCart.reduce(function (total, currentValue) {
            return total + currentValue.totalPrice
        }, 0)

        let totalAmt = round(basketAmount + deliveryCost - discountAmount, 2)

        setTotalAmount(totalAmt)
        setBasketTotal(basketAmount)
    }
    const navigateTo = (screen, param) => {
        navigation.navigate('Payments', {
            screen: screen,
            params: { order: param },
        })
    }
    const handleCheckOut = () => {
        //
        const orderData = createOrder()

        updateOrder({ ...orderData })

        saveToStore('PaymentMethod', paymentMethod)
        switch (paymentMethod) {
            case 'cc':
                navigateTo('', orderData)
                break
            case 'expressPay': {
                navigateTo('MobileMoney', orderData)
                //navigation.navigate('Modal', {
                //  screen: 'ExpressPay',
                //  params: { order: { ...orderData, paymentMethod: 'ExpressPay' } },
                //});

                break
            }
            case 'MobileMoney':
                navigateTo('MobileMoney', orderData)
                break
            case 'PayPal':
                navigateTo('PayPal', orderData)
                break

            default:
                break
        }
    }
    const handleCancel = () => {
        setShowDialog(false)
    }

    const handleRedeem = () => {
        validateVoucher()
    }

    const validateVoucher = () => {
        farmDirectApi
            .redeemVoucher(userInfo.id, voucherCode.toUpperCase())
            .then(({ data }) => {
                setDiscountAmount(data.value)
                setVoucherCode(data.code)
                saveToStore('VOUCHER', data)
                setShowDialog(false)
            })
            .catch((error) => {
                if (error.response.status === 400 && error.response.data) {
                    setDiscountAmount(0)

                    Alert.alert('Sorry', error.response.data.error, [
                        {
                            text: 'Close',
                            style: 'cancel',
                            onPress: () => setShowDialog(false),
                        },
                    ])
                } else {
                    setDiscountAmount(0)
                    Alert.alert(
                        'Sorry',
                        'Something went wrong here. please try again later',
                        [
                            {
                                text: 'Close',
                                style: 'cancel',
                                onPress: () => setShowDialog(false),
                            },
                        ]
                    )
                }
            })
    }
    const _showRedeemDlg = (canShowDialog = false) => {
        return (
            <View
                style={{
                    backgroundColor: 'white',
                    borderRadius: 10,
                }}
            >
                <View style={styles.dlgContainer}>
                    <Dialog.Container
                        visible={canShowDialog}
                        onBackdropPress={handleCancel}
                    >
                        <Dialog.Title>Redeem code</Dialog.Title>

                        <Dialog.Input
                            placeholder=" Enter coupon/voucher code "
                            onChangeText={(text) => {
                                setVoucherCode(text.toUpperCase())
                            }}
                        />

                        <Dialog.Button label="Cancel" onPress={handleCancel} />
                        <Dialog.Button label="Redeem" onPress={handleRedeem} />
                    </Dialog.Container>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#EFEBE8' }}>
            <View style={{ flex: 1 }}>
                <ScrollView
                    scrollEventThrottle={32}
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    <View>
                        <Text style={{ fontSize: 15, margin: 10 }}>
                            Delivery slot
                        </Text>
                        <DeliverySlot
                            timeSlot={timeSlot}
                            onPress={handleDeliverySlot}
                            showTitle={false}
                        />
                    </View>
                    <View
                        style={{
                            // marginTop: 10,
                            borderWidth: 0.25,
                            borderColor: '#EFEBE8',
                        }}
                    >
                        {defaultDeliveryAddress &&
                        defaultDeliveryAddress.nickName ? (
                            <View>
                                <Text
                                    style={{
                                        margin: 10,
                                        fontSize: 15,
                                        fontWeight: 'normal',
                                    }}
                                >
                                    Delivery address
                                </Text>
                                <DeliveryInformation
                                    deliveryTown={defaultDeliveryAddress.town}
                                    deliveryAddress={
                                        defaultDeliveryAddress.streetName
                                    }
                                    digitalAddress={
                                        defaultDeliveryAddress.digitalAddress
                                    }
                                    addressNickName={
                                        defaultDeliveryAddress.nickName
                                    }
                                    onAddressPress={handleAddress}
                                />
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={handleFirstDeliveryAddress}
                            >
                                <View
                                    style={{
                                        marginHorizontal: 10,
                                        height: 40,
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: '700',
                                        }}
                                    >
                                        Add delivery address
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <View
                        style={{
                            height: 80,
                            marginTop: 2,
                            backgroundColor: 'white',
                            marginBottom: 1,
                        }}
                    >
                        <DeliveryInstructions
                            deliveryInstruction={deliveryInstruction}
                            onPress={handleInstruction}
                        />
                    </View>
                    <View style={{ height: 90 }}>
                        <View
                            style={{
                                height: 40,
                                justifyContent: 'center',
                                marginLeft: 10,
                            }}
                        >
                            <Text>Payment method</Text>
                        </View>
                        <PaymentDetails
                            method={paymentMethod}
                            onPress={handlePayOption}
                        />
                    </View>

                    {_showRedeemDlg(showDialog)}

                    <OrderTotal
                        isCheckOut={true}
                        subTotal={basketTotal}
                        deliveryCost={deliveryCost}
                        discountAmount={discountAmount}
                        grandTotal={totalAmount}
                        onRedeem={() => {
                            setShowDialog(true)
                        }}
                    />
                </ScrollView>
            </View>
            <View
                style={{
                    //flex: 0.3,
                    justifyContent: 'flex-end',
                    paddingVertical: 30,
                    backgroundColor: '#fff',
                }}
            >
                <CheckoutButton
                    label={'Pay now'}
                    totalPrice={parseFloat(totalAmount)}
                    totalDiscount={discountAmount}
                    size={60}
                    onPress={handleCheckOut}
                    disabled={totalAmount == 0}
                />
            </View>
            {/*<ExpressPayScreen modalVisible={showExpressPay} onCloseModal={onCloseExpressPay}/>*/}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
        categories: state.categories,
        timeSlot: state.timeSlot,
        authorization: state.authorization,
        defaultDeliveryAddress: state.deliveryAddress,
        salesOrder: state.salesOrder,
    }
}

const mapDispatchToProps = {
    loadTimeSlot,
    loadDeliveryAddress,
    updateOrder,
    createSalesOrder,
    postSalesOrder,
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    dlgContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryScreen)
