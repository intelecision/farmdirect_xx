import React, { useState, useEffect } from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
} from 'react-native'
//import OrderTotal from "./components/OrderTotal";
import { connect } from 'react-redux'
import { useAsyncStorage } from './../hooks/useAsyncStorage'
import { bindActionCreators } from 'redux'
//import * as productsActions from "../redux/actions/productsActions";
import * as shoppingCartActions from './../redux/actions/shoppingCartActions'
//import * as categoryActions from "../redux/actions/categoryActions";
import * as timeSlotActions from '../redux/actions/timeSlotActions'
import * as authorizationActions from '../redux/actions/authorizationAction'
import { useNavigation } from '@react-navigation/core'
import TrolleySummary from './components/TrolleySummary'
import { farmDirectApi } from './../Api/services/FarmDirectApi'

function CheckOutScreen({ ...props }) {
    const { timeSlot, authorization, products } = props
    const [displayDate, setDisplayDate] = useState('')
    const [storedValue, setStoredValue] = useAsyncStorage('USER_INFO', '')
    const [userInfo, setUserInfo] = useState({})
    const [orderItems, setOrderItems] = useState([])

    const navigation = useNavigation()
    const { salesOrder } = props
    useEffect(() => {
        // setConfirmedOrder(order);
        // console.log('order check out', salesOrder);

        getOrderItems(salesOrder.id)
        setUserInfo(storedValue)
        //  "deliveryCost": 30,
        //"deliveryDate": "2022-05-04T08:06:43.64Z",

        const displayDate =
            new Date(salesOrder.deliveryCost).toString().slice(0, 10) +
            ' ' +
            salesOrder.deliverySlot
        setDisplayDate(displayDate)

        return () => {}
    }, [])
    const getOrderItems = (orderId) => {
        farmDirectApi
            .loadOrderItemsByOrder(orderId)
            .then(({ data }) => {
                setOrderItems(data)
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleViewAll = () => {}
    const onNavigate = () => {
        navigation.navigate('Tabs', { screen: 'Home' })
    }
    const { width, height } = useWindowDimensions()
    return (
        <View style={styles.container}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.contentStyle}
            >
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={{ uri: getImageSource('fd_van_right.png') }}
                            resizeMode="contain"
                            style={{ height: 200, width }}
                        />
                    </View>
                    <View
                        style={{
                            backgroundColor: '#fff',
                        }}
                    >
                        <View style={{ marginHorizontal: 10 }}>
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontWeight: '700',
                                    marginVertical: 10,
                                }}
                            >
                                Order details
                            </Text>
                            <View>
                                <Text style={styles.paragraph}>
                                    You will receive your order on the date and
                                    times chosen.
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        alignSelf: 'center',
                                        marginVertical: 10,
                                    }}
                                >
                                    {displayDate}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{ height: 10, backgroundColor: '#EFEBE8' }}
                        />
                        <View
                            style={{
                                paddingVertical: 10,
                                backgroundColor: '#fff',
                            }}
                        >
                            <View style={{ marginHorizontal: 10 }}>
                                <Text
                                    style={{
                                        fontSize: 22,
                                        fontWeight: '700',
                                        marginTop: 20,
                                    }}
                                >
                                    Order Summary
                                </Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 10,
                                    }}
                                >
                                    <Text>Trolley total</Text>
                                    <Text>
                                        {' '}
                                        GH¢{salesOrder?.amount?.toFixed(2)}
                                    </Text>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 4,
                                    }}
                                >
                                    <Text>Discount</Text>
                                    <Text>
                                        {' '}
                                        GH¢
                                        {salesOrder?.voucherValue?.toFixed(2)}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 4,
                                    }}
                                >
                                    <Text>Delivery cost</Text>
                                    <Text>
                                        {' '}
                                        GH¢
                                        {salesOrder?.deliveryCost?.toFixed(2)}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginTop: 10,
                                    }}
                                >
                                    <Text style={{ fontWeight: '700' }}>
                                        Total Amount
                                    </Text>
                                    <Text style={{ fontWeight: '700' }}>
                                        GH¢{salesOrder?.amount?.toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{ height: 10, backgroundColor: '#EFEBE8' }}
                        />
                        <TrolleySummary orderItems={orderItems} />
                    </View>
                </View>
            </ScrollView>
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
        salesOrder: state.salesOrder,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
        actionTimeSlot: bindActionCreators(timeSlotActions, dispatch),
        authActions: bindActionCreators(authorizationActions, dispatch),
    }
}
styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEBE8',
    },
    contentStyle: {
        flex: 1,
        paddingHorizontal: 10,
    },
    sponsorStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
    H1: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 20,
    },
    bodyStyle: {
        textAlign: 'center',
    },
    paragraph: {
        marginTop: 10,
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutScreen)
