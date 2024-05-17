import React, { useState, useEffect } from 'react'
import {
    TouchableHighlight,
    Platform,
    Text,
    View,
    Linking,
    TouchableOpacity,
    StyleSheet,
    Pressable,
} from 'react-native'

//import { Button, ButtonGroup, Icon as E_Icons } from '@rneui/base';

import { retrieveItem } from './../utils/localStorage'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderTitle from './../screens/components/HeaderTitle'
import ListItemView from './../screens/components/ListItemView'

import * as shoppingCartActions from './../redux/actions/shoppingCartActions'
import * as productsActions from './../redux/actions/productsActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authorizationActions from './../redux/actions/authorizationAction'
import ProductCard from './../screens/components/ProductCard'
import WelcomeScreen from './WelcomeScreen'
import Welcome from './components/Welcome'
import Logout from './components/Logout'
import { StatusBar } from 'expo-status-bar'
import { useNavigation, useRoute } from '@react-navigation/core'
import { expo } from '../app.json'

import * as WebBrowser from 'expo-web-browser'
import { Ionicons } from '@expo/vector-icons'

orderAction = [
    {
        title: 'Pending',
        id: 1,
        icon: 'information-outline',
        subtitle: '',
        screen: 'Pending',
    },
    {
        title: 'Deliveries',
        id: 2,
        icon: 'flight-takeoff',
        subtitle: '',
        screen: 'Deliveries',
    },
    {
        title: 'In dispute',
        id: 3,
        icon: 'av-timer',
        subtitle: '',
        screen: 'DisputeScreen',
    },
]
const helpActionList = [
    {
        id: 1,
        title: 'Questions frequently asked',
        subtitle: 'Frequently asked questions',
        icon: 'help-circle-outline',
    },
    {
        id: 2,
        title: 'WhatsApp us',
        subtitle: 'we will respond under 12 hours',
        icon: 'logo-whatsapp',
    },
    {
        id: 3,
        title: 'Give us a call',
        subtitle: '0209791607 our lines are opened 7am-7pm everyday',
        icon: 'call-outline',
    },
]

const aboutUsActionList = [
    {
        id: 1,
        title: 'How we work',
        subtitle: '',
        icon: '',
    },
    {
        id: 2,
        title: 'Where we source',
        subtitle: '',
        icon: '',
    },
    {
        id: 3,
        title: 'Private policy',
        subtitle: '',
        icon: '',
    },
    {
        id: 4,
        title: `App Version ${expo.version}`,
        subtitle: '',
        icon: '',
    },
]

const AccountScreen = ({ ...props }) => {
    const {
        actions,
        products,
        shoppingCart,
        trolleyActions,
        authActions,
        authorization,
    } = props

    const navigation = useNavigation()
    const route = useRoute()
    const [favouriteItems, setFavouriteItems] = useState([])
    const [accountName, setAccountName] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [userId, setUserId] = useState('')
    const [isLoggedIn, setIsloggedIn] = useState(false)
    const [infoState, setInfoState] = useState({})
    const [helpActions, setHelpActions] = useState(helpActionList)
    const [aboutUsActions, setAboutUsActions] = useState(aboutUsActionList)
    const [messageCount, setMessageCount] = useState(0)
    useEffect(() => {
        ;(async () => {
            loadFavourites()
            const aUserInfo = await retrieveItem('USER_INFO')
            if (aUserInfo) {
                setAccountName(aUserInfo.firstName)
                setUserId(aUserInfo.id)

                setInfoState({
                    firstName: aUserInfo.firstName,
                    phoneNumber: aUserInfo.phoneNumber,
                    lastName: aUserInfo.lastName,
                    email: aUserInfo.username,
                })
            }
            if (products.length === 0) {
                actions.loadProducts().catch((error) => {
                    logErrors(
                        'failed to load products,HomeScreen.js line 89',
                        error
                    )
                })
            }
            if (aUserInfo) {
                const tokenExpiry = new Date(aUserInfo.tokenExpiry)
                const today = new Date()

                if (tokenExpiry.getTime() < today.getTime()) {
                    setIsloggedIn(false)
                } else {
                    setIsloggedIn(userInfo)
                }
            }
            setUserInfo({ aUserInfo })
        })()

        return () => {}
    }, [])

    const handleOrders = (id) => {
        if (id === 3) {
            navigation.navigate('FriendsAndFamily', {
                user: userInfo,
            })
        }
    }
    const loadFavourites = async () => {
        const myFavouriteItems = await retrieveItem('FAVOURITES_KEY')
        setFavouriteItems(myFavouriteItems)
    }

    const handleLogIn = () => {
        navigation.navigate('Auth', { screen: 'SignIn' })
    }
    const onCallHelpLine = () => {
        const phoneNumber = '+233247367435'
        Linking.openURL(`tel:${phoneNumber}`)
    }
    const tryNavigateTo = (screen) => {
        navigation.push(screen)
    }
    const handleHelp = (id) => {
        if (id === 1) {
            navigation.navigate('FAQ')
        }
        if (id === 2) {
            Linking.openURL('whatsapp://send?text=hello&phone=+233247367435')
        }

        if (id === 3) {
            onCallHelpLine()
        }
    }
    const onOrdersTabbed = () => {
        navigation.navigate('Deliveries', {
            userId: userInfo.userId,
            filterType: 'pending',
            title: 'Previous Orders',
        })
    }
    const handleAboutUs = (id) => {
        if (id === 1) {
            navigation.navigate('HowWeWork')
        } else if (id === 2) {
            navigation.navigate('HowWeSource')
        } else if (id === 3) {
            WebBrowser.openBrowserAsync(
                'http://otuofarms.com/farmdirect/privacy'
            )
        } else if (id === 4) {
            //Platform.OS === 'ios';
            //Linking.openURL(
            //  'https://play.google.com/store/apps/details?id=com.farmdirect.farmdirectgh'
            //);
        }
    }

    const _bootstrapAsync = async () => {
        const aUserInfo = await retrieveItem('USER_INFO')

        setUserInfo({ aUserInfo })
        if (userInfo) {
            const tokenExpiry = new Date(aUserInfo.tokenExpiry)
            const today = new Date()

            if (tokenExpiry.getTime() < today.getTime()) {
                setIsloggedIn(false)
            } else {
                setIsloggedIn(userInfo)
            }
        }
    }

    const handleEssential = (product) => {
        navigation.push('ItemDetail', {
            product: product,
            title: product.productName,
        })
    }
    const handleAddToCart = (id) => {
        const product = products.find((p) => p.id === id)

        const idx = shoppingCart.findIndex((p) => p.id === id)
        if (idx === -1) {
            trolleyActions.addItemToCart({
                quantity: 1,
                totalPrice: product.isOnSale
                    ? product.salePrice
                    : product.price,
                ...product,
            })
        } else {
            let update = Object.assign({}, shoppingCart[idx])
            update.quantity += 1
            update.totalPrice = update.isOnSale
                ? update.quantity * update.salePrice
                : update.quantity * update.price

            trolleyActions.updateCartItem({ ...update })
        }
    }

    const _orderFunctions = () => {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                    alignContent: 'center',
                    //paddingHorizontal: 20,
                    flexDirection: 'row',
                    height: 110,
                }}
            >
                <View style={{ alignContent: 'center' }}>
                    <Ionicons
                        name="wallet-outline"
                        type="ionicon"
                        color="tomato"
                        size={35}
                        onPress={() => {
                            navigation.navigate('Deliveries', {
                                userId: userId,
                                filterType: 'unpaid',
                                title: 'Unpaid Orders',
                            })
                        }}
                    />
                    <Text style={{ margin: 4 }}>Unpaid</Text>
                </View>
                <View style={{ alignContent: 'center' }}>
                    <Ionicons
                        name="bus-outline"
                        type="ionicon"
                        color="tomato"
                        size={35}
                        onPress={() => {
                            navigation.navigate('Deliveries', {
                                userId: userId,
                                filterType: 'delivered',
                                title: 'Previous Orders',
                            })
                        }}
                    />
                    <Text style={{ margin: 4 }}>Previous Orders</Text>
                </View>
                <View style={{ alignContent: 'center' }}>
                    <Ionicons
                        name="alarm-outline"
                        type="ionicon"
                        color="tomato"
                        size={35}
                        onPress={() => {
                            navigation.navigate('Deliveries', {
                                userId: userId,
                                filterType: 'pending',
                                title: 'Pending Orders',
                            })
                        }}
                    />
                    <Text style={{ margin: 4 }}>Pending Delivery</Text>
                </View>
            </View>
        )
    }

    const handleRegisterPress = () => {
        navigation.navigate('Auth', { screen: 'NewUserInfo' })
    }

    const productCardPress = (product) => {
        navigation.push('ItemDetail', {
            product: product,
            title: product.productName,
        })
    }
    const handleLogout = () => {
        authActions.logOut().then(() => {
            navigation.navigate('FARM')
        })
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'tomato' }}>
            <StatusBar backgroundColor="red" barStyle="light-content" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'tomato',
                    }}
                >
                    {/*header goes here*/}
                    <View style={{ height: 160, backgroundColor: 'tomato' }}>
                        {authorization.isAuthorized ? (
                            <View style={{ margin: 20, paddingVertical: 30 }}>
                                <Text
                                    style={{
                                        fontSize: 32,
                                        fontWeight: '700',
                                        fontFamily:
                                            Platform.OS === 'ios'
                                                ? 'Cochin'
                                                : 'Roboto',
                                        color: 'white',
                                    }}
                                >
                                    Hi {accountName}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginTop: 10,
                                    }}
                                >
                                    <Ionicons
                                        name="call-outline"
                                        size={15}
                                        color="white"
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 12,
                                            color: 'white',
                                        }}
                                    >
                                        {infoState.phoneNumber}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Ionicons
                                        name="mail-outline"
                                        size={15}
                                        color="white"
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 12,
                                            color: 'white',
                                        }}
                                    >
                                        {infoState.email}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <Ionicons
                                            name="location-outline"
                                            size={15}
                                            color="white"
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 12,
                                                color: 'white',
                                            }}
                                        >
                                            {infoState.town ? (
                                                infoState.town
                                            ) : (
                                                <Text>enter details </Text>
                                            )}
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={() =>
                                            navigation.navigate(
                                                'AccountDetail',
                                                {
                                                    params: { user: infoState },
                                                }
                                            )
                                        }
                                        style={({ pressed }) => ({
                                            opacity: pressed ? 0.5 : 1,
                                        })}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 15,
                                                color: 'white',
                                            }}
                                        >
                                            View details
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        ) : (
                            <View style={{ margin: 20 }}>
                                <Text
                                    style={{
                                        marginTop: 40,
                                        // textAlignVertical: "center",
                                        textAlign: 'center',
                                        fontSize: 32,
                                        fontWeight: '700',
                                        fontFamily:
                                            Platform.OS === 'ios'
                                                ? 'Cochin'
                                                : 'Roboto',
                                        color: 'white',
                                    }}
                                >
                                    You're welcome
                                </Text>
                            </View>
                        )}
                    </View>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#f8f8f8',
                            //  borderTopLeftRadius: 20,
                            //  borderTopRightRadius: 20,
                            paddingVertical: 40,
                        }}
                    >
                        {!authorization.isAuthorized ? (
                            <WelcomeScreen
                                onPress={handleLogIn}
                                onRegister={handleRegisterPress}
                            />
                        ) : (
                            <View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 20,
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate('Messages')
                                        }
                                    >
                                        <View style={styles.button}>
                                            <Ionicons
                                                name="mail-outline"
                                                size={25}
                                            />
                                            <Text style={styles.buttonText}>
                                                Messages
                                            </Text>
                                            {messageCount > 0 && (
                                                <View
                                                    style={{
                                                        backgroundColor: 'red',
                                                        height: 18,
                                                        width: 'auto',
                                                        minWidth: 18,
                                                        borderRadius: 12,
                                                        top: 10,
                                                        //  right: 34,
                                                        left: 40,
                                                        position: 'absolute',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                        flexGrow: 2,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            color: 'white',
                                                            fontSize: 10,
                                                            fontWeight: '700',
                                                        }}
                                                    >
                                                        {messageCount}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={true}
                                        onPress={() =>
                                            navigation.navigate('Wallet')
                                        }
                                    >
                                        <View style={styles.button}>
                                            <Ionicons
                                                name="wallet-outline"
                                                size={25}
                                            />
                                            <Text style={styles.buttonText}>
                                                Wallet
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => onOrdersTabbed()}
                                    >
                                        <View style={styles.button}>
                                            <Ionicons
                                                name="receipt-outline"
                                                size={25}
                                            />
                                            <Text style={styles.buttonText}>
                                                Orders
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                {favouriteItems && favouriteItems.length > 0 ? (
                                    <View>
                                        <HeaderTitle
                                            title={'My favourites'}
                                            rightText="View All"
                                            onPress={() =>
                                                navigation.navigate(
                                                    'Favourites'
                                                )
                                            }
                                        />
                                        <ScrollView
                                            horizontal={true}
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                        >
                                            {favouriteItems.map(
                                                (product, id) => (
                                                    <View
                                                        style={{ margin: 6 }}
                                                        key={id}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                productCardPress(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            <ProductCard
                                                                product={
                                                                    product
                                                                }
                                                                inStock={
                                                                    product.inStock
                                                                }
                                                                badgeMessage={
                                                                    product.badgeMessage
                                                                }
                                                                onPressCard={() =>
                                                                    productCardPress(
                                                                        product
                                                                    )
                                                                }
                                                                OnAddPress={() =>
                                                                    handleAddToCart(
                                                                        product.id
                                                                    )
                                                                }
                                                                onRemovePress={() =>
                                                                    handleRemoveFromCart(
                                                                        product.id
                                                                    )
                                                                }
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            )}
                                        </ScrollView>
                                    </View>
                                ) : null}
                            </View>
                        )}
                        {authorization.isAuthorized ? (
                            <HeaderTitle
                                title={'Invite a friend Get GH₵30'}
                                rightText="Lear more"
                                onPress={() =>
                                    navigation.navigate('FriendsAndFamily', {
                                        user: userInfo,
                                    })
                                }
                            />
                        ) : null}
                        <View style={{ flex: 1 }}>
                            <HeaderTitle
                                title={'How can we help?'}
                                rightText="View All"
                                showRightComponent={false}
                            />
                            <ListItemView
                                list={helpActions}
                                onPress={handleHelp}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <HeaderTitle
                                title={'About Farm Direct'}
                                rightText="View All"
                                showRightComponent={false}
                            />
                            <ListItemView
                                list={aboutUsActions}
                                onPress={handleAboutUs}
                            />
                        </View>

                        <View>
                            <Logout
                                visible={authorization.isAuthorized}
                                onPress={() => {
                                    authActions.logOut().then(() => {
                                        navigation.navigate('Tabs', {
                                            screen: 'Home',
                                        })
                                    })
                                }}
                            />

                            {/*<Button
                title={"PAY"}
                onPress={() => {
                  navigation.navigate("Payments", { screen: "StripePay" });
                }}
              />*/}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        authorization: state.authorization,
        shoppingCart: state.shoppingCart,
        products: state.products,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authorizationActions, dispatch),
        trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
        actions: bindActionCreators(productsActions, dispatch),
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        paddingHorizontal: 10,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white', // "#f8f8fa",
        height: 65,
        width: 120,
        marginTop: 10,
        borderRadius: 8,
    },
    buttonText: {
        margin: 6,
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
