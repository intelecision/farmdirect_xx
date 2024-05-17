import React, { useState, useEffect, useRef } from 'react'
import {
    Text,
    View,
    Platform,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as productsActions from '../../redux/actions/productsActions'
import * as shoppingCartActions from '../../redux/actions/shoppingCartActions'
import * as categoryActions from '../../redux/actions/categoryActions'
import * as timeSlotActions from '../../redux/actions/timeSlotActions'
import * as authorizationActions from '../../redux/actions/authorizationAction'
import * as subCategoryActions from '../../redux/actions/subCategoryActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as Notifications from 'expo-notifications'
import axios from 'axios'
import WelcomeScreen from '../WelcomeScreen'
import CategoryCard from '../components/CategoryCard'
import { Icon } from '@rneui/themed'
import DeliverySlot from '../components/DeliverySlot'
import ProductCard from '../components/ProductCard'
import { retrieveItem, saveToStore } from '../../utils/localStorage'
import * as defaultAddressActions from '../../redux/actions/deliveryAddressAction'
import * as deliveryAddressesActions from '../../redux/actions/addressesAction'
import * as favouriteActions from '../../redux/actions/favouritesActions'
import Constants from 'expo-constants'
import { useRoute, useNavigation } from '@react-navigation/core'
import { getFarm } from '../../Api/services/productServices'
import LandingPage from '../components/LandingPage'
import * as Device from 'expo-device'
import * as pendingDeliveriesAction from '../../redux/actions/pendingDeliveriesActions'
import * as userWalletAction from '../../redux/actions/userWalletAction'
import UpcomingDeliveries from './components/UpcomingDeliveries'
import Carousel from './../components/Carousel'
import { farmDirectApi } from './../../Api/services/FarmDirectApi'
import Toast from 'react-native-root-toast'
import { getNetworkStateAsync } from 'expo-network'
import { lightTomatoes } from './../../constants/colours'
import { saveForNotification } from '../../Api/services/servicesApi'
import ModalScreen from '../ModalScreen'
import MessageBox from './MessageBox'
//import * as Notifications from "expo-notifications";
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
})

const HomeScreen = ({ ...props }) => {
    const {
        products,
        actions,
        timeSlot,
        authorization,
        categories,
        actionTimeSlot,
        authActions,
        trolleyActions,
        //  actionOrder,
        favourites,
        actionFavourite,
        subCategories,
        actionDefaultAddress,
        pendingDeliveryOrders,
        actionPendingDeliveries,
        actionWallet,
        userWallet,
        order,
    } = props

    const navigation = useNavigation()
    const route = useRoute()

    const [selectedProduct, setSelectedProduct] = useState({})
    const [frontPageItems, setFrontPageItems] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [IsAddressLoaded, setIsAddressLoaded] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [essentialProducts, setEssentialProducts] = useState([])
    const [marketing, setMarketing] = useState({})
    const [imageSource, setImageSource] = useState()
    const [homeSlides, setHomeSlides] = useState([])
    const [expoPushToken, setExpoPushToken] = useState('')
    const [notification, setNotification] = useState(false)
    const notificationListener = useRef()
    const responseListener = useRef()
    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        )
        //  actionOrder.createOrder();
        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification)
            })

        // This listener is fired whenever a user taps on or interacts with a notification
        //(works when app is foregrounded, background, or killed)
        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {}
            )

        setTimeout(() => {
            axios
                .get(
                    'http://www.otuofarms.com/farmdirect/api/marketing/GetCurrentIntro'
                )
                .then((response) => {
                    setMarketing(response.data)
                    setImageSource(
                        getImageSource(response.data.imageUrl).trim()
                    )
                })
        }, 1000)

        fetchAll()
        loadAddress()
        loadCarousel()
        actionFavourite.loadFavourites()
        actionDefaultAddress.loadDeliveryAddress()
        actionTimeSlot.loadTimeSlot()
        authActions
            .loggedInUser()
            .then(() => {
                setUserInfo(authorization.userInfo)
                trolleyActions.loadBasket()
            })
            .catch((err) => {
                // errors

                logErrors('HomeScreen line 84', err)
            })

        if (products.length === 0) {
            actions.loadProducts().catch((error) => {
                logErrors(
                    'failed to load products,HomeScreen.js line 89',
                    error
                )
            })
        }
        // actionWallet.loadUserWallet(authorization.userInfo.id);

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            )
            Notifications.removeNotificationSubscription(
                responseListener.current
            )
        }
    }, [])

    useEffect(() => {
        const checkConnection = async () => {
            await checkNetworkState()
        }
        checkConnection()
        if (authorization.isAuthorized) {
            setUserInfo(authorization.userInfo)
            actionPendingDeliveries.loadUserPendingDeliveries(
                authorization.userInfo.id
            )
        }
    }, [userInfo])

    const checkNetworkState = async () => {
        let networkState = await getNetworkStateAsync()
        if (!networkState.isConnected) {
            let toast = Toast.show('You are not connected to network.', {
                duration: Toast.durations.LONG,
                backgroundColor: lightTomatoes,
                textColor: 'black',
            })
        }
    }

    const loadAddress = () => {
        const {
            authorization,
            actionDeliveryAddresses,
            actionDefaultAddress,
            addressList,
        } = props
        let test = { ...order }

        if (authorization.isAuthorized) {
            actionDeliveryAddresses.loadAddresses(
                authorization.userInfo.id,
                authorization.userInfo.token
            )

            if (addressList) {
                const defaultAddress = addressList.find((a) => {
                    return a.isDefaultAddress === true
                })
                actionDefaultAddress.updateDeliveryAddress(defaultAddress)
            }
        }
    }
    const logErrors = () => {
        //
    }

    const registerForPushNotificationsAsync = async () => {
        let token
        try {
            if (Constants.platform) {
                const { status: existingStatus } =
                    await Notifications.getPermissionsAsync()
                let finalStatus = existingStatus
                if (existingStatus !== 'granted') {
                    const { status } =
                        await Notifications.requestPermissionsAsync()
                    finalStatus = status
                }
                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!')
                    return
                }
                token = (await Notifications.getExpoPushTokenAsync()).data
                setExpoPushToken(token)
                // save the token
                savePushNotification(token)
            } else {
                alert('Must use physical device for Push Notifications')
            }

            if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,

                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                })
            }
        } catch (e) {
            console.log('registerForPushNotificationsAsync: Error', e)
        }
    }

    const savePushNotification = async (token) => {
        if (authorization.isAuthorized) {
            const data = await retrieveItem('PUSH-NOTIFICATION')
            //console.log(" retrieveItem('PUSH-NOTIFICATION')", data)
            //  if (data) return;

            const newData = {
                token: token,
                userId: authorization.userInfo.id,
                updated: new Date(),
                device: `${Device.modelName}, running ${Device.osName} ${Device.osVersion}`,
            }
            const response = await saveForNotification(newData)

            if (response.status === 200) {
                saveToStore('PUSH-NOTIFICATION', token)
            }
        }
    }
    // now save  online

    const getFilteredProduct = (filter) => {
        const { products } = props
        return products.filter((p) => p.sponsoredItemName === filter)
    }
    const fetchAll = () => {
        axios
            .get('http://www.otuofarms.com/farmdirect/api/frontpage/')
            .then(({ data }) => {
                setFrontPageItems(data)
            })
            .catch((error) => logErrors('HomeScreen line 183', error))
    }

    const handleEssential = (product) => {
        setSelectedProduct(product)

        navigation.push('ItemDetail', {
            product: product,
            title: product?.productName,
        })
    }
    const handleAddToCart = (id) => {
        const { products, shoppingCart, trolleyActions } = props
        const product = products?.find((p) => p.id === id)

        const idx = shoppingCart?.findIndex((p) => p.id === id)
        if (idx === -1) {
            trolleyActions.addItemToCart({
                quantity: 1,
                totalPrice: product?.isOnSale
                    ? product.salePrice
                    : product?.price,
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
    const handleRemoveFromCart = (id) => {
        const { shoppingCart, trolleyActions } = props
        const idx = shoppingCart?.findIndex((p) => p.id === id)
        if (idx > -1) {
            let toRemove = Object.assign({}, shoppingCart[idx])
            toRemove.quantity -= 1
            if (toRemove.quantity > 0) {
                trolleyActions.updateCartItem({ ...toRemove })
            } else trolleyActions.removeItemFromCart({ ...toRemove })
        }
    }
    const getImageSource = (imageName) => {
        return 'http://otuofarms.com/farmdirect/images/' + imageName
    }

    const handleDeliverySlot = () => {
        navigation.navigate('Modal', {
            screen: 'TimeSlot',
            params: { direction: 'Home' },
        })
        // navigate("TimeSlot", { params: { direction: "Home" } });
    }

    const handleMarketing = (farmId) => {
        // let producer = {};
        getFarm(farmId)
            .then((data) => {
                // producer = data;
                navigation.navigate('EXPLORE', {
                    screen: 'Producer',
                    params: { farmId, producer: data },
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleLogIn = () => {
        navigation.navigate('Auth', { screen: 'SignIn' })
    }
    const handleRegisterPress = () => {
        navigation.navigate('Auth', { screen: 'NewUserInfo' })
    }
    //

    const handleIntroPress = (farmId) => {
        // let producer = {};
        getFarm(farmId)
            .then((data) => {
                // producer = data;
                navigation.navigate('Producer', {
                    farmId: farmId,
                    producer: data,
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getProducer = (id) => {
        getFarm(id)
            .then((data) => {
                setProducer(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const filterCategory = (categoryId) => {
        return subCategories?.filter((x) => x.categoryId == categoryId)
    }
    const handleCategory = (category) => {
        const subCategories = filterCategory(category.id)
        navigation.navigate('Sub_Category', {
            subCategories: subCategories,
            selectedCategory: category,
            title: category.categoryName,
        })
    }

    const renderProduct = ({ item }) => {
        return (
            <View style={{ margin: 6 }} key={item.id}>
                <TouchableOpacity onPress={() => handleEssential(item)}>
                    <ProductCard
                        product={item}
                        badgeMessage={item.badgeMessage}
                        OnAddPress={() => handleAddToCart(item.id)}
                        onRemovePress={() => handleRemoveFromCart(item.id)}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderCategoryHeader = (headerText) => {
        return (
            <View style={{ flex: 3, flexDirection: 'row', height: 50 }}>
                <View style={{ flex: 3 }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 22,
                            margin: 10,
                            fontFamily: 'Philosopher',
                        }}
                    >
                        {headerText}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ height: 40, marginRight: 10 }}
                    onPress={() => {
                        navigation.navigate('Tabs', {
                            screen: 'Explore',
                        })
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Text style={{ fontFamily: 'OpenSans' }}>View All</Text>
                        <Icon
                            name="chevron-right"
                            type="ionicons"
                            color="red"
                            iconStyle={{ alignSelf: 'flex-end', fontSize: 20 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const renderHeader = ({ headerText, id }) => {
        return (
            <View style={{ flex: 3, flexDirection: 'row', height: 50 }}>
                <View style={{ flex: 3 }}>
                    <Text
                        style={{
                            fontWeight: '600',
                            fontSize: 22,
                            margin: 10,
                            fontFamily: 'Philosopher',
                        }}
                    >
                        {headerText}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        height: 30,
                        width: 90,
                        marginRight: 10,
                        marginTop: 10,
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                    onPress={() => {
                        const prod = products.find((p) => p.frontPageId === id)
                        navigation.navigate('FARM', {
                            screen: 'FrontPage',
                            params: {
                                frontPageId: id,
                                title: headerText,
                                prodList: prod,
                            },
                        })
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            padding: 6,
                            //marginTop: 10,
                            //marginBottom: 10,
                            //backgroundColor: 'orange',

                            borderColor: 'tomato',
                            borderWidth: 0.5,
                            borderRadius: 20,
                        }}
                    >
                        <Text style={{ fontFamily: 'OpenSans' }}>See all </Text>
                        <Icon
                            name="arrow-forward"
                            type="ionicons"
                            color="red"
                            iconStyle={{ fontSize: 20 }}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    const renderCategory = ({ item }) => {
        return (
            <CategoryCard
                categoryName={item.categoryName}
                onPress={() => handleCategory(item)}
            />
        )
    }

    const handleCarouselPress = (item) => {
        alert(item.title)
    }
    const loadCarousel = () => {
        farmDirectApi
            .loadCarouselSlides('Home')
            .then((response) => {
                setHomeSlides(response.data)
            })
            .catch((error) => {
                console.log('loadCarouselSlides Error', error)
            })
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#f8f8fa',
                marginBottom: 4,
                paddingTop: 10,
            }}
        >
            <StatusBar
                barStyle={Platform.OS === 'ios' ? 'light-dark' : 'light-dark'}
                translucent={true}
            />
            <ScrollView
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#f8f8fa',
                        marginBottom: 4,
                        paddingTop: 10,
                    }}
                >
                    <LandingPage
                        title={marketing.heading}
                        story={marketing.caption}
                        imageUri={{
                            uri: imageSource,
                        }}
                        onTabbed={() => handleMarketing(marketing.farmId)}
                    />
                    {!authorization.isAuthorized ? (
                        <WelcomeScreen
                            onPress={handleLogIn}
                            onRegister={handleRegisterPress}
                        />
                    ) : (
                        <View
                            style={{
                                marginLeft: 10,
                                marginRight: 10,
                                marginTop: 20,
                            }}
                        >
                            {pendingDeliveryOrders?.length > 0 && (
                                <UpcomingDeliveries
                                    onPress={() =>
                                        navigation.navigate('Modal', {
                                            screen: 'UpcomingDelivery',
                                        })
                                    }
                                />
                            )}
                            <DeliverySlot
                                timeSlot={timeSlot}
                                onPress={handleDeliverySlot}
                            />
                        </View>
                    )}
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <Carousel
                            slides={homeSlides}
                            handlePress={handleCarouselPress}
                        />
                    </View>

                    {frontPageItems.map((frontPage, idx) => {
                        return (
                            <View key={idx}>
                                {renderHeader({
                                    headerText: frontPage.title,
                                    id: frontPage.id,
                                })}
                                <FlatList
                                    keyExtractor={(item) => item.id.toString()}
                                    data={frontPage.products}
                                    renderItem={renderProduct}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        )
                    })}
                    <MessageBox visible={false} onClose={() => {}}>
                        <View
                            style={{
                                //flex: 1,

                                justifyContent: 'center',
                            }}
                        >
                            <LandingPage
                                title={marketing.heading}
                                story={marketing.caption}
                                imageUri={{
                                    uri: imageSource,
                                }}
                                onTabbed={() =>
                                    handleMarketing(marketing.farmId)
                                }
                            />
                        </View>
                    </MessageBox>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

function mapStateToProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        products: state.products,
        categories: state.categories,
        timeSlot: state.timeSlot,
        authorization: state.authorization,
        subCategories: state.subCategories,
        deliverToAddress: state.deliveryAddress,
        addressList: state.addresses,
        favourites: state.favourites,
        pendingDeliveryOrders: state.pendingDeliveries,
        frontPageItems: state.frontPageItems,
        userWallet: state.userWallet,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(productsActions, dispatch),
        trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
        actionsCategory: bindActionCreators(categoryActions, dispatch),
        actionsSubCategory: bindActionCreators(subCategoryActions, dispatch),
        actionTimeSlot: bindActionCreators(timeSlotActions, dispatch),
        authActions: bindActionCreators(authorizationActions, dispatch),
        actionDefaultAddress: bindActionCreators(
            defaultAddressActions,
            dispatch
        ),
        actionDeliveryAddresses: bindActionCreators(
            deliveryAddressesActions,
            dispatch
        ),
        actionFavourite: bindActionCreators(favouriteActions, dispatch),
        actionPendingDeliveries: bindActionCreators(
            pendingDeliveriesAction,
            dispatch
        ),
        actionWallet: bindActionCreators(userWalletAction, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
