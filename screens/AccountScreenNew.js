import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { Button, Icon } from '@rneui/base'
import { useDispatch, useSelector } from 'react-redux'
import {
    AuthenticateUser,
    logOut,
} from './../redux/actions/authorizationAction'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { FontAwesome, Ionicons, AntDesign } from '@expo/vector-icons'
import ProductCard from './../screens/components/ProductCard'
import WelcomeScreen from './WelcomeScreen'
import Welcome from './components/Welcome'
import Logout from './components/Logout'
import { StatusBar } from 'expo-status-bar'
//import { useNavigation, useRoute } from "@react-navigation/core";
import { expo } from '../app.json'

import * as WebBrowser from 'expo-web-browser'
import HeaderTitle from './components/HeaderTitle'
import { loadFavourites } from '../redux/actions/favouritesActions'
import ListItemView from './components/ListItemView'

const HEADER_HEIGHT = Platform.OS === 'ios' ? 130 : 70 + StatusBar.currentHeight

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
export default function AccountScreenNew() {
    const [helpActions, setHelpActions] = useState(helpActionList)
    const [aboutUsActions, setAboutUsActions] = useState(aboutUsActionList)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const authorization = useSelector((state) => state.authorization)
    const shoppingCart = useSelector((state) => state.shoppingCart)
    const products = useSelector((state) => state.products)
    const favouriteItems = useSelector((state) => state.favourites)
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if (authorization.isAuthorized) {
            setUserInfo(authorization.userInfo)
        }
        loadFavouriteItems()
        if (products.length === 0) {
            dispatch(loadFavourites)
            //actions.loadProducts().catch((error) => {
            //  logErrors("failed to load products,HomeScreen.js line 89", error);
            //});
        }
        return () => {}
    }, [favouriteItems])
    //console.log(authorization)
    const loadFavouriteItems = () => {
        dispatch(loadFavourites())
    }

    const handleAboutUs = (id) => {
        if (id === 1) {
            // navigation.navigate("HowWeSource");
        } else if (id === 2) {
            navigation.navigate('HowWeSource')
        } else if (id === 3) {
            WebBrowser.openBrowserAsync(
                'http://otuofarms.com/farmdirect/privacy'
            )
        } else if (id === 4) {
            Platform.OS === 'ios'

            Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.farmdirect.farmdirectgh'
            )
        }
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

    const authenticateUserCallback = useCallback(
        (userName, password) => {
            dispatch(AuthenticateUser())
        },
        [dispatch]
    )
    const onOrdersTabbed = () => {
        console.log(' navigate to delivery screen')
        navigation.navigate('Deliveries', {
            userId: userInfo.userId,
            filterType: 'pending',
            title: 'Previous Orders',
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
    const handleLogIn = () => {
        navigation.navigate('Auth', { screen: 'SignIn' })
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
    const onLogOutTabbed = useCallback(() => {
        dispatch(logOut())
        navigation.navigate('FARM')
    }, [])
    const handleLogout = () => {
        authActions.logOut().then(() => {
            navigation.navigate('FARM')
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View
                    style={{
                        height:
                            Platform.OS === 'ios'
                                ? 130
                                : 70 + StatusBar.currentHeight,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        backgroundColor: 'white',
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        {authorization.isAuthorized ? (
                            <Text
                                style={{
                                    fontSize: 32,
                                    marginRight: 10,
                                    marginLeft: 20,
                                }}
                            >
                                Hello {`${userInfo.firstName} `}
                            </Text>
                        ) : (
                            <Text style={{ fontSize: 34, marginRight: 10 }}>
                                Akwaaba
                            </Text>
                        )}
                        <AntDesign
                            name="edit"
                            size={25}
                            style={{ marginTop: 10 }}
                            onPress={() =>
                                navigation.navigate('AccountDetail', {
                                    params: { user: userInfo },
                                })
                            }
                        />
                    </View>
                </View>
                <ScrollView
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: 20,
                            justifyContent: 'space-between',
                        }}
                    >
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Icon
                                    type="ionicon"
                                    name="help-buoy-sharp"
                                    size={25}
                                />
                                <Text style={styles.buttonText}>Help</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Wallet')}
                        >
                            <View style={styles.button}>
                                <Icon
                                    type="ionicon"
                                    name="wallet-sharp"
                                    size={25}
                                />
                                <Text style={styles.buttonText}>Wallet</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onOrdersTabbed()}>
                            <View style={styles.button}>
                                <Icon
                                    type="ionicon"
                                    name="wallet-sharp"
                                    size={25}
                                />
                                <Text style={styles.buttonText}>Orders</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {!authorization.isAuthorized ? (
                        <WelcomeScreen
                            onPress={handleLogIn}
                            onRegister={handleRegisterPress}
                        />
                    ) : (
                        <View>
                            {favouriteItems && favouriteItems.length > 0 ? (
                                <View>
                                    <HeaderTitle
                                        title={'My favourites'}
                                        rightText="View All"
                                        onPress={() =>
                                            navigation.navigate('Favourites')
                                        }
                                    />
                                    <ScrollView
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {favouriteItems.map((product, id) => (
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
                                                        product={product}
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
                                        ))}
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
                        <ListItemView list={helpActions} onPress={handleHelp} />
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
                            onPress={() => onLogOutTabbed()}
                        />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
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
        backgroundColor: '#f8f8fa',
        height: 65,
        width: 120,
        marginTop: 10,
        borderRadius: 8,
    },
    buttonText: {
        margin: 6,
    },
})
