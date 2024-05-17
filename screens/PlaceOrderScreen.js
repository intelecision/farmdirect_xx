import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { Header, Icon, Button } from '@rneui/themed'
import CheckoutButton from './components/CheckOutButton'
import Dialog from 'react-native-dialog'
import OrderTotal from './components/OrderTotal'
import { connect } from 'react-redux'
import { loadDeliveryAddress } from '../redux/actions/deliveryAddressAction'
import DeliveryInformation from './components/DeliveryInformation'
import DeliveryInstructions from './components/DeliveryInstructions'
import { loadTimeSlot } from '../redux/actions/timeSlotActions'
import { getDefaultAddresses } from '../utils/addressRepository'
import PaymentTypes from './components/PaymentTypes'
import { Asset } from 'expo-asset'
import { saveToStore, retrieveItem } from '../utils/localStorage'
import { getServiceEndpoint } from '../Api/services/servicesApi'
import axios from 'axios'
import { Order } from './../Models/Orderings'
import { LogBox } from 'react-native'

import { getImageSource } from '../utils/helpers'
import { routes } from './../constants/AppConstants'
LogBox.ignoreLogs([
    'Non-serializable values     were found in the navigation state',
])

const paymentMethods = [
    {
        id: 1,
        title: 'Mobile Money',
        imageUri: getImageSource('mobile_money.png'),
    },
    //{
    //  id: 2,
    //  title: "Debits and Credit Cards",
    //  imageUri: getImageSource('master_card.png"),
    //},
    //{
    //  id: 3,
    //  title: "Pay Pal (Pay in $USD/£GBP/ЄEur  only",
    //  imageUri: getImageSource('paypal.png"),
    //},
]
const options = {
    MOBILE_MONEY: 'mobileMoney',
    PAY_PAL: 'payPal',
    CREDIT_CARD: 'creditCard',
    EXPRESS_PAY: 'ExpressPay',
}
class PlaceOrderScreen extends Component {
    state = {
        userInfo: {},
        modalVisible: false,
        momoChecked: false,
        payPalChecked: false,
        ccChecked: false,
        isVisible: false,
        response: undefined,
        expressPay: false,
        deliveryInstruction:
            'If not available call me for further instructions',
        paymentOption: undefined,
        optionSelected: undefined,
        optionImage: undefined,
        discountAmount: 0,
        showDialog: false,
        voucherCode: undefined,
        voucher: undefined,
        errorDialogVisible: false,
        errorMessage: '',
    }

    async componentDidMount() {
        const { timeSlot, defaultDeliveryAddress } = this.props
        this._loadAssetsAsync()
        //discountAmount
        const { discount } = this.props.route.params
        const discountAmount = discount
        const userInfo = await retrieveItem('USER_INFO')
        this.setState({ discountAmount, userInfo })
        loadDeliveryAddress()
        this.getLastPaymentMethod()
        if (!timeSlot) {
            loadTimeSlot()
        }
    }

    loadAddress = () => {
        const { userInfo } = this.state
        const { authorization } = this.props
        const today = new Date()

        if (authorization.isAuthorized) {
            axios
                .get(
                    getServiceEndpoint(
                        `address/GetAddressByUserId/${authorization.userInfo.id}`
                    ),
                    {
                        headers: {
                            Authorization: `Bearer ${authorization.userInfo.token}`,
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        saveToStore('ADDRESSES_KEY', response.data)
                        this.setState({ IsAddressLoaded: true })
                    }
                })
                .catch((error) => {
                    console.log('ERROR', error.response.data.error)
                })
        }
    }

    getLastPaymentMethod = async () => {
        // const { optionSelected, momoChecked } = this.state;
        const method = await retrieveItem('PaymentMethod')

        this.setState({
            paymentOption: 'Pay with Mobile  Money',
            optionSelected: true,
            momoChecked: true,
            optionImage: getImageSource('mobile_money.png'),
            modalVisible: false,
        })
    }

    getTotalPrice = () => {
        let totalPrice = this.props.shoppingCart.reduce(function (
            total,
            currentValue
        ) {
            return total + currentValue.totalPrice
        },
        0)

        return totalPrice
    }

    getGrandTotal = () => {
        let totalPrice = this.props.shoppingCart.reduce(function (
            total,
            currentValue
        ) {
            return total + currentValue.totalPrice
        },
        0)

        return totalPrice
    }
    goBack = () => {
        this.props.navigation.goBack()
    }

    handleCheckBox = (kind) => {
        //const check = this.state.momoChecked;
        if (kind === 'momo') {
            this.setState({
                momoChecked: !this.state.momoChecked,
                payPalChecked: false,
                ccChecked: false,
            })
        } else if (kind === 'paypal') {
            this.setState({
                payPalChecked: !this.state.payPalChecked,
                ccChecked: false,
                momoChecked: false,
            })
        } else if (kind === 'ccc') {
            this.setState({
                momoChecked: false,
                payPalChecked: false,
                ccChecked: !this.state.ccChecked,
            })
        }
    }
    renderItem = (item) => {
        return (
            <View style={{ flex: 3, flexDirection: 'row', margin: 10 }}>
                <Text>{item.quantity}x</Text>
                <Text>{item.productName}</Text>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text>{item.totalPrice}</Text>
                </View>
            </View>
        )
    }

    updateDefaultAddress = (address) => {
        //this.setState({
        //  defaultDeliveryAddress: address,
        //});
    }
    handleInstruction = () => {
        this.props.navigation.navigate('EditDeliveryInfo', {
            onGoBack: (text) => this.updateDeliveryInstruction(text),
        })
    }

    updateDeliveryInstruction = (text) => {
        this.setState({ deliveryInstruction: text })
    }

    round = (value, decimals) => {
        return Number(
            Math.round(value + 'e' + decimals) + 'e-' + decimals
        ).toFixed(decimals)
    }
    handleAddress = () => {
        this.props.navigation.navigate('Modal', {
            screen: 'YourAddresses',
        })
    }
    handleFirstDeliveryAddress = () => {
        this.props.navigation.navigate('Modal', {
            screen: 'DeliveryAddress',
        })
    }
    handleCheckOut = () => {
        //
        const { payPalChecked, momoChecked, ccChecked } = this.state
        const { navigation } = this.props
        const orderData = this.createOrder()

        const assignedObject = Object.assign({}, orderData)

        if (payPalChecked) {
            saveToStore('PaymentMethod', 'PayPalPayment')
            navigation.navigate('PayPalPayment', { order: orderData })
        } else if (momoChecked) {
            saveToStore('PaymentMethod', 'MobileMoney')
            navigation.navigate('Payments', {
                screen: 'MobileMoney',
                params: { order: assignedObject },
            })
        } else if (ccChecked) {
            saveToStore('PaymentMethod', 'CreditCardPayment')

            navigation.navigate('Payments', {
                screen: 'CardPayment',
                params: { order: orderData },
            })
        } else if (expressPay) {
            saveToStore('PaymentMethod', 'expressPay')

            navigation.navigate('Payments', {
                screen: 'expressPay',
                params: { order: orderData },
            })
        }
    }
    addressToString(address) {
        return `${address.nickName}, ${address.firstName} ${address.lastName}, ${address.streetName}, ${address.district}, ${address.town}, ${address.region}, ${address.digitalAddress} `
    }
    createOrder = () => {
        const { timeSlot, defaultDeliveryAddress } = this.props
        let order = new Order()
        let thisDay = new Date()
        order.userId = this.state.userInfo.id
        order.discountAmount = this.state.discountAmount
        order.voucherValue = this.state.discountAmount
        order.voucherCode = this.state.voucherCode
        order.mobile = defaultDeliveryAddress.mobile
        order.orderDate = thisDay
        order.paymentDate = thisDay
        order.amount =
            this.getGrandTotal() +
            timeSlot.deliveryCost -
            this.state.discountAmount
        order.subtotal = this.getTotalPrice()
        order.orderStatus = 'Pending'
        order.paymentStatus = 'Pending'
        order.deliveryCost = timeSlot.deliveryCost
        order.deliveryAddress = this.addressToString(defaultDeliveryAddress)
        order.deliveryDate = timeSlot.date
        order.deliverySlot = timeSlot.slot
        order.orderItems = this.getCartItem()

        return order
    }
    getCartItem = () => {
        const { shoppingCart } = this.props
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

    showErrorDialog = (errorMessage) => {
        this.setState({ errorDialogVisible: true, errorMessage })
    }

    handleRedeem = () => {
        this.setState({ showDialog: false })

        this.getVoucher(this.state.voucherCode)
    }
    getVoucher = (voucher) => {
        const { userInfo } = this.state
        this.setState({ showDialog: false })

        let url =
            'http://www.otuofarms.com/farmdirect/api/voucher/Redeem?code=' +
            `${voucher.toUpperCase()}&userId=${userInfo.id}`

        axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                //Authorization: `Bearer ${userInfo.token.trim()}`,
            },
            url: url.trim(),
        })
            .then((response) => {
                this.setState({
                    discountAmount: response.data.value,
                    voucherCode: response.data.code,
                    voucher: response.data,
                })
                saveToStore('VOUCHER', response.data)
            })

            .catch((error) => {
                console.log(error)

                if (error.response.status === 400) {
                    this.setState({
                        errorDialogVisible: true,
                        errorMessage: error.response.data.error,
                        discountAmount: 0,
                    })
                } else {
                    this.setState({
                        errorDialogVisible: true,
                        errorMessage:
                            'Something went wrong with. try it again later',
                        discountAmount: 0,
                    })
                }
            })
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible })
    }
    setDlgVisible(visible) {
        this.setState({ showDialog: visible })
    }

    handleChoice = (choice) => {
        if (options.PAY_PAL === choice) {
            this.setState({
                momoChecked: false,
                payPalChecked: true,
                ccChecked: false,
                paymentOption: 'Pay with PayPal',
                optionSelected: choice,
                optionImage: routes.BASE_URL + 'paypal.png',
                modalVisible: false,
            })
        } else if (options.MOBILE_MONEY === choice) {
            this.setState({
                momoChecked: true,
                payPalChecked: false,
                ccChecked: false,
                paymentOption: 'Pay with Mobile  Money',
                optionSelected: choice,
                optionImage: routes.BASE_URL + 'mobile_money.png',
                modalVisible: false,
            })
        } else if (options.CREDIT_CARD === choice) {
            this.setState({
                momoChecked: false,
                payPalChecked: false,
                ccChecked: true,
                paymentOption: 'pay with Visa/Master Card',
                optionSelected: choice,
                optionImage: routes.BASE_URL + 'master_card.png',
                modalVisible: false,
            })
        } else if (options.EXPRESS_PAY === choice) {
            this.setState({
                momoChecked: false,
                payPalChecked: false,
                expressPay: false,
                paymentOption: 'ExpressPay',
                optionSelected: choice,
                optionImage: routes.BASE_URL + 'expresspay.jpg',
                modalVisible: false,
            })
        }
    }
    handleClose = () => {
        const { payPalChecked, ccChecked, momoChecked } = this.state
        // options selected
        if (payPalChecked) {
            this.setState({
                paymentOption: 'Pay with PayPal',
                optionSelected: choice,
                optionImage: routes.BASE_URL + 'paypal.png',
                modalVisible: false,
            })
        } else if (momoChecked) {
            this.setState({
                paymentOption: 'Pay with Mobile  Money',
                optionSelected: momoChecked,
                optionImage: routes.BASE_URL + 'mobile_money.png',
                modalVisible: false,
            })
        } else if (ccChecked) {
            this.setState({
                paymentOption: 'pay with Visa/Master Card',
                optionSelected: ccChecked,
                optionImage: routes.BASE_URL + 'master_card.png',
                modalVisible: false,
            })
        }
    }
    renderPayOption = () => {
        const { optionSelected } = this.state
        if (optionSelected) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        margin: 5,
                        height: 60,
                    }}
                >
                    <Image
                        resizeMode="cover"
                        source={this.state.optionImage}
                        style={{
                            width: 70,
                            height: 50,
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                        }}
                    />
                    <Text
                        style={{
                            flex: 3,
                            textAlign: 'center',
                            fontWeight: '700',
                            color: 'tomato',
                            alignSelf: 'center',
                        }}
                    >
                        {this.state.paymentOption}
                    </Text>
                    <View
                        style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            type="ionicon"
                            name="chevron-forward-sharp"
                            color="tomato"
                        />
                    </View>
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 60,
                    }}
                >
                    <View
                        style={{
                            alignItems: 'flex-start',
                            marginTop: 10,
                        }}
                    >
                        <Icon type="ionicon" name="ios-wallet" />
                    </View>
                    <View
                        style={{
                            flex: 3,
                            justifyContent: 'center',
                            margin: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '700',
                                color: 'tomato',
                                textAlign: 'center',
                            }}
                        >
                            Please select payment method
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'flex-end',
                        }}
                    >
                        <Icon
                            type="ionicon"
                            name="chevron-forward-outline"
                            color="tomato"
                        />
                    </View>
                </View>
            )
        }
    }
    handleCancel = () => {
        //
        this.setModalVisible(false)
    }

    handleCancel = () => {
        this.setState({ showDialog: false })
    }
    handleCancelError = () => {
        this.setState({ errorDialogVisible: false })
    }
    _showErrorDialog = (errorMessage) => {
        return (
            <View style={styles.dlgContainer}>
                <Dialog.Container visible={this.state.errorDialogVisible}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Description>{errorMessage}</Dialog.Description>
                    <Dialog.Button
                        label="Ok"
                        onPress={this.handleCancelError}
                    />
                </Dialog.Container>
            </View>
        )
    }
    _showVoucherDialog = () => {
        return (
            <View>
                <Dialog.Container
                    visible={this.state.showDialog}
                    onBackdropPress={this.handleCancel}
                >
                    <Dialog.Title>Redeem code</Dialog.Title>

                    <Dialog.Input
                        placeholder=" Enter coupon/voucher code "
                        onChangeText={(text) => {
                            this.setState({
                                voucherCode: text.toUpperCase(),
                            })
                        }}
                    />

                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    <Dialog.Button label="Redeem" onPress={this.handleRedeem} />
                </Dialog.Container>
            </View>
        )
    }
    handlePayOption = () => {
        const orderData = this.createOrder()

        // const assignedObject = Object.assign({}, orderData);

        this.props.navigation.navigate('Modal', {
            screen: 'PaymentOptions',
            params: { order: orderData },
        })
    }
    render() {
        const { shoppingCart, timeSlot, defaultDeliveryAddress } = this.props
        const {
            deliveryInstruction,
            discountAmount,
            modalVisible,
            errorMessage,
            // errorDialogVisible,
        } = this.state

        const deliveryCost = timeSlot.deliveryCost

        let basketTotal = shoppingCart.reduce(function (total, currentValue) {
            return total + currentValue.totalPrice
        }, 0)
        // let grandTotal = this.round(this.getGrandTotal(), 2);
        let totalAmount = this.round(
            basketTotal + deliveryCost - discountAmount,
            2
        )

        return (
            <View style={{ flex: 1, backgroundColor: '#EFEBE8' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        style={{ flex: 1 }}
                    >
                        <View style={{ marginBottom: 10 }}>
                            {defaultDeliveryAddress &&
                            defaultDeliveryAddress.nickName ? (
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
                                    onAddressPress={this.handleAddress}
                                />
                            ) : (
                                <TouchableOpacity
                                    onPress={this.handleFirstDeliveryAddress}
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
                        <View style={{ marginBottom: 10 }}>
                            <DeliveryInstructions
                                deliveryInstruction={deliveryInstruction}
                                onPress={this.handleInstruction}
                            />
                        </View>
                        <View style={{ backgroundColor: 'white' }}>
                            <View
                                style={{
                                    flex: 1,
                                    height: 50,
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: '#dddddd',
                                }}
                            >
                                <Text style={{ margin: 10, fontSize: 18 }}>
                                    Payment Method
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    height: 60,
                                    flexDirection: 'row',
                                    paddingHorizontal: 10,
                                    justifyContent: 'center',
                                }}
                            >
                                <TouchableOpacity
                                    style={{ flex: 1, height: 50 }}
                                    onPress={this.handlePayOption}
                                >
                                    {this.renderPayOption()}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this._showVoucherDialog()}
                        {this._showErrorDialog(errorMessage)}
                        <OrderTotal
                            isCheckOut={true}
                            subTotal={basketTotal}
                            deliveryCost={deliveryCost}
                            discountAmount={discountAmount}
                            grandTotal={totalAmount}
                            onRedeem={() => {
                                this.setDlgVisible(true)
                            }}
                        />
                    </ScrollView>
                </View>
                <View
                    style={{
                        height: 90,
                        alignContent: 'flex-start',
                        backgroundColor: '#fff',
                    }}
                >
                    <CheckoutButton
                        label={'Place Order'}
                        totalPrice={parseFloat(totalAmount)}
                        totalDiscount={discountAmount}
                        size={50}
                        onPress={this.handleCheckOut}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                    }}
                >
                    <Modal
                        style={{ flex: 1 }}
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={this.handleClose}
                    >
                        <View
                            style={{
                                flex: 1,
                                borderRadius: 10,
                                backgroundColor: '#d3d3d3',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: 'white',
                                    marginTop: 50,
                                    borderRadius: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        borderBottomWidth: 0.5,
                                        borderBottomColor: '#d3d3d3',
                                        //  backgroundColor: "tomato",
                                        justifyContent: 'space-between',
                                        alignContent: 'center',
                                        height: 50,
                                    }}
                                >
                                    <View style={{ margin: 10 }}>
                                        <Icon
                                            name="close"
                                            style={{
                                                color: 'tomato',
                                                fontSize: 30,
                                            }}
                                            onPress={this.handleCancel}
                                        />
                                    </View>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignContent: 'center',
                                        }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            Options
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            alignItems: 'flex-end',
                                            margin: 1,
                                        }}
                                    >
                                        <Button
                                            type="clear"
                                            title="Done"
                                            onPress={this.handleClose}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <PaymentTypes
                                        cartType={'Mobile Money'}
                                        imageUri={getImageSource(
                                            'mobile_money.png'
                                        )}
                                        checked={this.state.momoChecked}
                                        onPress={() => {
                                            this.handleChoice(
                                                options.MOBILE_MONEY
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                            {/*</View>*/}
                        </View>
                    </Modal>
                </View>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
        categories: state.categories,
        timeSlot: state.timeSlot,
        authorization: state.authorization,
        defaultDeliveryAddress: state.deliveryAddress,
    }
}

const mapDispatchToProps = {
    loadTimeSlot,
    loadDeliveryAddress,
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
export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderScreen)
