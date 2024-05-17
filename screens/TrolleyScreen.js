import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native'
import { Button, SearchBar, Icon, ListItem } from '@rneui/themed'
import NetInfo from '@react-native-community/netinfo'
import Dialog from 'react-native-dialog'
import { connect } from 'react-redux'
import {
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
} from './../redux/actions/shoppingCartActions'
import { loadDeliveryAddress } from '../redux/actions/deliveryAddressAction'
import OrderTotal from './components/OrderTotal'
import {
    MINIMUM_ORDER_AMOUNT,
    FREE_DELIVER_SPEND,
} from './../constants/AppConstants'

import {
    loadTimeSlot,
    saveSlot,
    updateTimeSlot,
} from '../redux/actions/timeSlotActions'
import { loadProducts } from '../redux/actions/productsActions'
import ProductSearch from './components/ProductSearch'
import MessageBar from './components/MessageBar'
import CheckoutButton from './components/CheckOutButton'
import DeliverySlot from './components/DeliverySlot'
import TrolleyItem from './components/TrolleyItem'
import { retrieveItem, saveToStore } from './../utils/localStorage'
import { addWeeks, differenceInDays } from 'date-fns'
import { useIsFocused } from '@react-navigation/native'

import { farmDirectApi } from '../Api/services/FarmDirectApi'
import { loadAddresses } from './../redux/actions/addressesAction'
import { updateDeliveryAddress } from './../redux/actions/deliveryAddressAction'
import { lightTomatoes } from './../constants/colours'
import { getImageSource } from '../utils/helpers'
const popularSearchesItems = [
    { id: 1, name: 'Whats new' },
    { id: 2, name: 'Pork' },
    { id: 3, name: 'Chicken' },
    { id: 4, name: 'Goat meat' },
    { id: 5, name: 'Live Animals' },
    { id: 6, name: 'Live Chicken' },
]

let unsubscribe = null
const TrolleyScreen = ({ route, navigation, ...props }) => {
    const [userInfo, setUserInfo] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isConnected, setIsConnected] = useState(false)
    const [voucherCode, setVoucherCode] = useState(null)
    const [deliveryCost, setDeliveryCost] = useState(0)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const [showDialog, setShowDialog] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [headerShown, setHeaderShown] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const [search, setSearch] = useState('')
    const [isFiltering, setIsFiltering] = useState(false)
    const [popularSearches, setPopularSearches] = useState(popularSearchesItems)
    const [miniMumOrder, setMiniMumOrder] = useState(MINIMUM_ORDER_AMOUNT)
    const [freeDeliveryOrders, setFreeDeliveryOrders] =
        useState(FREE_DELIVER_SPEND)
    const [basketTotal, setBasketTotal] = useState(0)
    const [errorDialogVisible, setErrorDialogVisible] = useState(false)
    const [date, setDate] = useState(new Date())
    const isFocused = useIsFocused()
    const {
        authorization,
        timeSlot,
        shoppingCart,
        products,
        removeItemFromCart,
        updateCartItem,
        addItemToCart,
        deliverToAddress,
        addressesList,
    } = props

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: headerShown,
            headerRight: () => (
                <View style={styles.search_icon_box}>
                    <Icon
                        name="search"
                        size={30}
                        color="#000000"
                        onPress={() => {
                            setIsSearching(true)
                            setHeaderShown(false)
                        }}
                    />
                </View>
            ),
        })
    }, [navigation, route, headerShown])

    useEffect(() => {
        unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected)
        })
        setUserInfo(authorization.userInfo)
        let basket = shoppingCart.reduce(function (total, currentValue) {
            return total + currentValue.totalPrice
        }, 0)
        setBasketTotal(basket)
        loadTimeSlot()
        loadAddress()
        loadDeliveryAddress()
        if (timeSlot) {
            const slotDate = new Date(timeSlot.date)
            const today = new Date()
            setDeliveryCost(timeSlot.deliveryCost)
            const dayDiff = getDateDifference(slotDate, today)
            if (dayDiff < 1) {
                updateTimeSlot({
                    date: new Date(),
                    slot: '12:00pm - 4:00pm',
                    deliveryCost: 0,
                })
            }
        }
        setDeliveryCost(getDeliveryCost())

        setTotalAmount(round(basket + deliveryCost - discountAmount, 2))
        calculateTrolleySummary()
        return () => {
            if (unsubscribe != null) unsubscribe()
        }
    }, [shoppingCart, deliveryCost])

    const getDeliveryCost = () => {
        return timeSlot.deliveryCost
    }
    const _bootstrapAsync = async () => {
        const user = await retrieveItem('USER_INFO')
        if (user) {
            //check token expiry
            const tokenExpiry = new Date(user.tokenExpiry)
            const today = new Date()
            if (tokenExpiry.getTime() < today.getTime()) {
                setIsLoggedIn(false)
            } else {
                setIsLoggedIn(true)
                setUserInfo(user)
            }
        } else {
            navigation.push('SignIn')
        }
    }

    const handleNextWeek = () => {
        const nextWeek = addWeeks(date, 1)

        // no more than 2 weeks from today.
        const today = new Date()
        const diff = differenceInDays(today, nextWeek)

        setDate(nextWeek)
    }
    const handlePrevWeek = () => {
        const prevWeek = addWeeks(date, -1)
        // no more than 2 weeks from today.
        const today = new Date()
        const diff = differenceInDays(today, prevWeek)

        setDate(prevWeek)
    }
    const updateSearch = (searchText) => {
        setSearch(searchText)
        setIsFiltering(searchText.length > 2)
        setIsSearching(true)
    }
    const handleSearchCancel = () => {
        setHeaderShown(true)
        setSearch('')
        setIsFiltering(false)
        setIsSearching(false)
    }

    const handleFocus = () => {
        setIsSearching(true)
    }

    const handleCancelError = () => {
        setErrorDialogVisible(false)
    }
    // from here
    const renderEmptyTrolley = () => {
        return (
            <View style={{ flex: 1, alignContent: 'center' }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 24,
                        fontWeight: '700',
                    }}
                >
                    Your trolley is empty
                </Text>
                <Image
                    style={{
                        flex: 1,
                        height: null,
                        width: null,
                        resizeMode: 'cover',
                        width: 60,
                        height: 60,
                    }}
                    source={{ uri: getImageSource('Cart-empty.png') }}
                />
                <Text>
                    Browse through our selected produce and add them to your
                    trolly
                </Text>
            </View>
        )
    }
    const round = (value, decimals) => {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals)
    }

    const handleDeliverySlot = () => {
        const { navigate } = navigation
        navigation.navigate('Modal', {
            screen: 'TimeSlot',
            params: { direction: 'TROLLEY' },
        })

        //navigate("TimeSlot", { params: { direction: "Trolley" } });
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

    const renderHeader = () => {
        const { shoppingCart } = props
        let len = shoppingCart.reduce(function (total, currentValue) {
            return total + currentValue.quantity
        }, 0)

        const headerText =
            len === 1 ? len + ' item in basket' : len + ' items in basket'
        return (
            <View style={{ justifyContent: 'center', height: 40 }}>
                <Text style={{ marginLeft: 10, color: 'gray' }}>
                    {headerText}
                </Text>
            </View>
        )
    }

    const handleCheckOut = async () => {
        if (authorization.isAuthorized) {
            if (timeSlot?.slot === undefined || timeSlot?.slot === '') {
                navigation.navigate('Modal', {
                    screen: 'TimeSlot',
                    params: { direction: 'PlaceOrder' },
                })
            } else if (!deliverToAddress) {
                navigation.navigate('DeliveryAddress')
            } else {
                navigation.navigate('Payments', {
                    screen: 'PlaceOrder',
                    params: { discount: discountAmount },
                })
            }
        } else {
            navigation.navigate('Auth', { screen: 'SignIn' })
        }
    }
    const getDateDifference = (d, d1) => {
        const diffTime = d.getTime() - d1.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }
    const handleClose = () => {
        // setModalVisible(false);
    }
    const handleCancelModal = () => {
        setModalVisible(false)
    }
    //  handleCancelError = () => {
    //    setState({ errorDialogVisible: false });
    //  };
    const renderNetworkError = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <View style={{ alignItems: 'center', margin: 20 }}>
                    <Image
                        source={{ uri: getImageSource('network_error2.png') }}
                        size={60}
                        style={{
                            width: 130,
                            height: 130,
                            backgroundColor: '#fff',
                        }}
                    />
                    <Text style={{ marginTop: 20, textAlign: 'center' }}>
                        No network connection,.Please check your Mobile data and
                        network settings and retry
                    </Text>

                    <Button block danger style={{ marginTop: 20 }}>
                        <Text style={{ fontWeight: '700', color: '#fff' }}>
                            Try again
                        </Text>
                    </Button>
                </View>
            </View>
        )
    }

    const handleCancel = () => {
        setShowDialog(false)
    }

    const handleRedeem = () => {
        if (authorization.isAuthorized) {
            validateVoucher()
        } else {
            navigation.navigate('Auth', { screen: 'SignIn' })
        }
    }

    const loadAddress = () => {
        const { authorization, addressesList } = props

        if (authorization.isAuthorized) {
            loadAddresses(
                authorization.userInfo.id,
                authorization.userInfo.token
            )

            if (addressesList) {
                const defaultAddress = addressesList.find((a) => {
                    return a.isDefaultAddress === true
                })
                if (defaultAddress) {
                    updateDeliveryAddress(defaultAddress)
                } else if (addressesList.length > 0) {
                    updateDeliveryAddress(addressesList[0])
                }
            }
        }
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
                setVoucherCode('')
                if (error.response.status === 400 && error.response.data) {
                    setDiscountAmount(0)

                    Alert.alert('Sorry', error.response.data.error, [
                        { text: 'Close', style: 'cancel' },
                    ])
                } else {
                    setDiscountAmount(0)
                    Alert.alert(
                        'Sorry',
                        'Something went wrong here. please try again later',
                        [{ text: 'Close', style: 'cancel' }]
                    )
                }
            })
    }

    const calculateTrolleySummary = () => {}

    const rightComponent = () => {
        return (
            <Icon
                name="search"
                color="tomato"
                size={30}
                onPress={() =>
                    setState({ headerHeight: 40, isSearching: true })
                }
            />
        )
    }

    const handleAddToCart = (id) => {
        const product = products.find((p) => p.id === id)
        const idx = shoppingCart.findIndex((p) => p.id === id)
        if (idx === -1) {
            addItemToCart({
                quantity: 1,
                totalPrice: product.isOnSale
                    ? product.salePrice
                    : product.price,
                ...product,
            })
        } else if (idx > -1) {
            let update = Object.assign({}, shoppingCart[idx])
            update.quantity += 1

            let totalPrice = update.isOnSale
                ? update.quantity * update.salePrice
                : update.quantity * update.price
            update.totalPrice = totalPrice
            updateCartItem({ ...update })
        }
        calculateTrolleySummary()
    }

    const handleRemoveFromCart = (id) => {
        //  const { shoppingCart, removeItemFromCart, updateCartItem } = props;
        const idx = shoppingCart.findIndex((p) => p.id === id)
        let toRemove = Object.assign({}, shoppingCart[idx])
        toRemove.quantity -= 1

        if (toRemove.quantity > 0) {
            let totalPrice = toRemove.quantity * toRemove.price
            toRemove.totalPrice = totalPrice
            updateCartItem({ ...toRemove })
        } else removeItemFromCart({ ...toRemove })
        calculateTrolleySummary()
    }

    const handleOnPress = (item) => {
        navigation.navigate('ItemDetail', {
            product: item,
            title: item.productName,
        })
    }

    const renderItems = ({ item }) => {
        const { shoppingCart } = props
        const idx = shoppingCart.findIndex((p) => p.id === item.id)
        let quantity = 0

        if (idx !== -1) {
            let thisCart = Object.assign({}, shoppingCart[idx])
            quantity = thisCart.quantity
        }
        return (
            <TrolleyItem
                type={1}
                item={item}
                quantity={quantity}
                onPress={() => handleOnPress(item)}
                onAddToTrolley={() => handleAddToCart(item.id)}
                onRemoveFromTrolley={() => handleRemoveFromCart(item.id)}
            />
        )
    }
    const itemSeparator = () => {
        return (
            <View
                style={{
                    height: 2,
                    marginTop: 6,
                    backgroundColor: '#f8f8fa',
                    width: '100%',
                }}
            />
        )
    }

    const length = shoppingCart.length

    const msgBarText =
        basketTotal > miniMumOrder
            ? 'Spend GH₵' +
              freeDeliveryOrders +
              ' or more and get free delivery'
            : 'Minimum order amount of GH₵' + miniMumOrder + ' not met'
    const canShowWarning = basketTotal < miniMumOrder ? true : false
    return (
        <View style={{ flex: 1, backgroundColor: '#f8f8fa' }}>
            {!headerShown ? (
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <SearchBar
                            ref={(search) => (search = search)}
                            lightTheme
                            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                            placeholder="Try pork, beef, chicken, Tomatoes..."
                            showCancel
                            onChangeText={(text) => updateSearch(text)}
                            onFocus={handleFocus}
                            onCancel={() => handleSearchCancel()}
                            value={search.toLowerCase()}
                            cancelButtonTitle="Cancel"
                            containerStyle={{
                                borderBottomWidth: 0.5,
                                borderBottomColor: '#ddd',
                                backgroundColor: 'transparent',
                                marginLeft: 10,
                            }}
                        />
                    </View>
                    {isSearching ? (
                        isFiltering ? (
                            <ProductSearch query={search} />
                        ) : (
                            popularSearches.map((item, i) => (
                                <ListItem
                                    containerStyle={{ height: 45 }}
                                    key={i}
                                    bottomDivider
                                    onPress={() => {
                                        setSearch(item.name)
                                        setIsFiltering(true)
                                    }}
                                >
                                    <ListItem.Content>
                                        <ListItem.Title>
                                            {item.name}
                                        </ListItem.Title>
                                    </ListItem.Content>
                                    <ListItem.Chevron />
                                </ListItem>
                            ))
                        )
                    ) : (
                        <View />
                    )}
                    <View />
                </View>
            ) : (
                <View
                    style={{
                        flex: 1,
                        marginBottom: 20,
                        backgroundColor: '#f8f8fa',
                    }}
                >
                    <DeliverySlot
                        timeSlot={timeSlot}
                        onPress={handleDeliverySlot}
                    />
                    {length === 0 ? (
                        <View
                            style={{
                                flex: 1,
                                margin: 10,
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 24,
                                    fontWeight: '700',
                                }}
                            >
                                Your basket is empty
                            </Text>
                            <Icon
                                name="ios-basket"
                                type="ionicon"
                                color="gray"
                                size={120}
                            />

                            <Text style={{ textAlign: 'center', margin: 10 }}>
                                Browse through our selected produce and add them
                                to your basket
                            </Text>
                        </View>
                    ) : (
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={shoppingCart}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={renderItems}
                                    ListHeaderComponent={renderHeader}
                                    ListHeaderComponentStyle={{
                                        backgroundColor: '#f8f8fa',
                                    }}
                                    ListEmptyComponent={() => (
                                        <View
                                            style={{
                                                flex: 1,
                                                margin: 10,
                                                justifyContent: 'center',
                                                backgroundColor: lightTomatoes,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    fontSize: 24,
                                                    fontWeight: '700',
                                                }}
                                            >
                                                Your basket is empty
                                            </Text>
                                            <Icon
                                                name="ios-basket"
                                                type="ionicon"
                                                color="gray"
                                                size={120}
                                            />

                                            <Text
                                                style={{
                                                    textAlign: 'center',
                                                    margin: 10,
                                                }}
                                            >
                                                Browse through our selected
                                                produce and add them to your
                                                basket
                                            </Text>
                                        </View>
                                    )}
                                    ItemSeparatorComponent={itemSeparator}
                                    ListFooterComponent={
                                        <View style={{ paddingVertical: 20 }}>
                                            <OrderTotal
                                                isCheckOut={false}
                                                subTotal={basketTotal}
                                                deliveryCost={deliveryCost}
                                                discountAmount={discountAmount}
                                                grandTotal={parseFloat(
                                                    totalAmount
                                                )}
                                                onRedeem={() => {
                                                    setShowDialog(true)
                                                }}
                                            />
                                        </View>
                                    }
                                />
                                <View
                                    style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                    }}
                                ></View>
                                {_showRedeemDlg(showDialog)}
                                <View style={styles.container}>
                                    <Dialog.Container
                                        visible={errorDialogVisible}
                                    >
                                        <Dialog.Title>Error</Dialog.Title>
                                        <Dialog.Description>
                                            {errorMessage}
                                        </Dialog.Description>
                                        <Dialog.Button
                                            label="Ok"
                                            onPress={handleCancelError}
                                        />
                                    </Dialog.Container>
                                </View>
                                {/** Popup component */}
                            </View>
                            <View style={{ margin: 10 }}>
                                <CheckoutButton
                                    label={'Checkout'}
                                    disabled={canShowWarning}
                                    totalPrice={parseFloat(totalAmount)}
                                    totalDiscount={discountAmount}
                                    onPress={handleCheckOut}
                                />
                            </View>
                            <MessageBar
                                messageText={msgBarText}
                                isWarning={canShowWarning}
                            />
                        </View>
                    )}
                </View>
            )}
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
        deliverToAddress: state.deliveryAddress,
        addressesList: state.addresses,
    }
}

const mapDispatchToProps = {
    loadProducts,
    addItemToCart,
    updateCartItem,
    removeItemFromCart,
    loadTimeSlot,
    saveSlot,
    loadDeliveryAddress,
    loadAddresses,
    updateDeliveryAddress,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrolleyScreen)

const styles = StyleSheet.create({
    header: {
        // position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 115,
        paddingVertical: 40,
        borderWidth: null,
        borderColor: 'white',
        zIndex: 1000,
        elevation: 1000,
    },
    search_icon_box: {
        flexDirection: 'row',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    dlgContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
