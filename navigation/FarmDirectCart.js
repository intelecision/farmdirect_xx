import React from 'react'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { StyleSheet, Pressable } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/Home/HomeScreen'
import AccountScreen from './../screens/AccountScreen'
import FagScreen from './../screens/FagScreen'
import InDisputeScreen from './../screens/InDisputeScreen'
import AwaitingPaymentScreen from './../screens/AwaitingPaymentScreen'
import AccountDetailScreen from './../screens/AccountDetailScreen'
import RewardFriendScreen from '../screens/RewardFriendScreen'
import PendingOrdersScreen from './../screens/PendingOrdersScreen'
import TrolleyScreen from './../screens/TrolleyScreen'
import RecipesScreen from './../screens/RecipesScreen'
import RecipeDetailScreen from './../screens/RecipeDetailScreen'
import CategoryScreen from './../screens/CategoryScreen'
import ProductsScreen from './../screens/ProductsScreen'
import ProducerProductsScreen from '../screens/ProducerProductsScreen'
import OurProducersScreen from './../screens/OurProducersScreen'
import SubCategoryScreen from './../screens/SubCategoryScreen'
import FilteredProductsScreen from './../screens/FilteredProductsScreen'
import OrderDetailsScreen from './../screens/OrderDetailsScreen'
import SearchScreen from './../screens/SearchScreen'
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme'
import Colors from '../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import TrolleyIconWithBadge from './../components/TrolleyIconWithBadge'
import SplashScreen from './../screens/SplashScreen'
import ProductItemScreen from './../screens/ProductItemScreen'
import MyOrdersScreen from './../screens/MyOrdersScreen'
import ProductInfo from './../screens/ProductInfo'
//import MockUpScreen from "./../screens/MockUpScreen";
//import ReferSomeone from "./../screens/ReferSomeone";
//import { BlurView } from "expo-blur";
import SignInScreen from './../screens/logins/SignInScreen'
import TimeSlotScreen from './../screens/TimeSlotScreen'
import DeliveriesScreen from './../screens/DeliveriesScreen'

import FriendsAndFamilyScreen from './../screens/FriendsAndFamilyScreen'
//import AnimatedHeader from "./../components/AnimatedHeader";
//import AnimatedHeader2 from "./../components/AnimatedHeader2";
import PlaceOrderScreen from './../screens/PlaceOrderScreen'
import MobileMoneyScreen from './../screens/MobileMoneyScreen'
import CheckOutScreen from './../screens/CheckOutScreen'
import EditDeliveryInfo from './../screens/EditDeliveryInfo'
//import CreditCardPayment from './../screens/CreditCardPayment';
import PaymentOptions from './../screens/PaymentOptions'
import RegisterScreen from './../screens/logins/RegisterScreen'
import ForgottenPassword from './../screens/logins/ForgottenPassword'
import NewUserInfoScreen from '../screens/logins/NewUserInfoScreen'
import DeliveryAddress from './../screens/DeliveryAddress'
import DeliverToAddresses from './../screens/DeliverToAddresses'
import ConfirmDeliverySlot from './../screens/ConfirmDeliverySlot'
import FrontPageScreen from './../screens/FrontPageScreen'
import ExpressPayScreen from './../screens/ExpressPayScreen'
import { useNavigation } from '@react-navigation/core'
import ChangePasswordScreen from './../screens/ChangePasswordScreen'
import OrderSummaryScreen from './../screens/OrderSummaryScreen'
import FavouritesScreen from './../screens/FavouritesScreen'
import LogInScreen from './../screens/logins/LogInScreen'
import MessageUsScreen from './../screens/Message/MessageUsScreen'
import ContactDetailScreen from './../screens/ContactDetailScreen'
import HowWeSource from '../screens/HowWeSourceScreen'
import HowWeSourceScreen from './../screens/HowWeSourceScreen'
import OnboardingScreen from './../screens/OnboardingScreen'
import HowWeSourceDetails from './../screens/HowWeSourceDetails'
import SubCategoryTabScreen from './../screens/SubCategoryTabScreen'
import NotificationScreen from './../screens/NotificationScreen'
import LinkingConfiguration from './LinkingConfiguration'
import UpcomingDeliveryScreen from './../screens/components/UpcomingDeliveryScreen'
import CheckoutSuccess from '../screens/components/CheckoutSuccess'
import PromotionScreen from './../screens/promotions/PromotionScreen'
import AccountScreenNew from './../screens/AccountScreenNew'
import WalletScreen from './../screens/Payments/WalletScreen'
//import CardPayment from '../screens/Payments/CardPayment';
import PaymentMethod from '../screens/Payments/PaymentMethod'
import MessagesScreen from './../screens/MessagesScreen'
import HowWeWorkScreen from '../screens/HowWeWorkScreen'
import DeleteAccount from '../screens/Account/DeleteAccount'
import MessageDetails from '../screens/MessageDetails'
//import TabViewScreen from '../screens/TabViewScreen';

export default function FarmDirectCart() {
    return (
        <NavigationContainer linking={LinkingConfiguration}>
            <RootStack.Navigator
                initialRouteName="CheckoutSuccess"
                screenOptions={{
                    gestureEnabled: false,
                    headerBackTitleVisible: false,
                }}
            >
                {/*<RootStack.Screen
          name="Splash"
          component={CheckoutSuccess}
          options={{ headerTitle: "CheckoutSuccess", headerShown: false }}
        />*/}
                <RootStack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerTitle: 'Splash', headerShown: false }}
                />
                <RootStack.Screen
                    name="Onboarding"
                    component={OnboardingScreen} //
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Tabs"
                    component={BottomTabNavigator}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="ItemDetail"
                    component={ProductItemScreen}
                    options={{ headerTitle: 'Details', headerShown: false }}
                />
                <RootStack.Screen
                    name="ProductInfo"
                    component={ProductInfo}
                    options={{ headerTitle: 'Details', headerShown: false }}
                />
                <RootStack.Screen
                    name="Payments"
                    component={PaymentNavigator}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Producer"
                    component={ProducerProductsScreen}
                    options={{
                        headerTitle: 'Our products',
                    }}
                />
                <RootStack.Screen
                    name="MessageDetails"
                    component={MessageDetails}
                    options={{
                        headerTitle: 'Details',
                    }}
                />
                <RootStack.Screen
                    name="Messages"
                    component={MessagesScreen}
                    options={({ navigation }) => ({
                        title: 'Messages',
                        //headerRight: () => (
                        //    <Pressable
                        //        onPress={() =>
                        //            navigation.navigate('MessageDetails')
                        //        }
                        //        style={({ pressed }) => ({
                        //            opacity: pressed ? 0.5 : 1,
                        //        })}
                        //    >
                        //        <Ionicons
                        //            name="ellipsis-horizontal-circle-outline"
                        //            size={30}
                        //            style={{ marginRight: 15 }}
                        //        />
                        //    </Pressable>
                        //),
                    })}
                />

                <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                    <RootStack.Screen
                        name="Modal"
                        component={ModalNavigator}
                        options={{ headerShown: false }}
                    />
                </RootStack.Group>
                <RootStack.Group
                    screenOptions={{ presentation: 'fullScreenModal' }}
                >
                    <RootStack.Screen
                        name="PaymentMethod"
                        component={PaymentMethod}
                        options={({ navigation }) => ({
                            title: 'Payment method',
                            headerLeft: () => (
                                <Pressable
                                    onPress={() => navigation.goBack()}
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.5 : 1,
                                    })}
                                >
                                    <Ionicons
                                        name="close"
                                        size={30}
                                        //  color={Colors[colorScheme].text}
                                        style={{ marginRight: 15 }}
                                    />
                                </Pressable>
                            ),
                        })}
                    />
                </RootStack.Group>
                {/*<RootStack.Group>

        </RootStack.Group>*/}
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

const PaymentStack = createNativeStackNavigator()
function PaymentNavigator() {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    return (
        <PaymentStack.Navigator>
            <PaymentStack.Screen
                name="PlaceOrder"
                component={OrderSummaryScreen}
                options={({ navigation }) => ({
                    title: 'Order summary',
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={30}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <PaymentStack.Screen
                name="MobileMoney"
                component={MobileMoneyScreen}
                options={({ navigation }) => ({
                    title: 'Mobile money',
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={30}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <PaymentStack.Screen
                name="CheckOut"
                component={CheckoutSuccess}
                options={({ navigation }) => ({
                    title: 'Checkout',

                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('FARM')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Ionicons
                                name="close"
                                size={30}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            {/*<PaymentStack.Screen
        name="ExpressPay"
        component={ExpressPayScreen}
        options={({ navigation }) => ({
          title: "Checkout",
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate("FARM")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Ionicons
                name="close"
                size={30}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />*/}
            {/*<PaymentStack.Screen name="ExpressPay" component={ExpressPayScreen} />*/}
            {/*<PaymentStack.Screen name="StripePay" component={StripePay} />*/}
        </PaymentStack.Navigator>
    )
}

const ModalStack = createNativeStackNavigator()
function ModalNavigator() {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    //CardPayment
    return (
        <ModalStack.Navigator
            mode="modal"
            headerMode="none"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <ModalStack.Screen
                name="YourAddresses"
                component={DeliverToAddresses}
                options={({ navigation }) => ({
                    title: 'Your address',
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="angle-down"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <ModalStack.Screen
                name="ExpressPay"
                component={ExpressPayScreen}
                options={({ navigation }) => ({
                    title: 'Checkout',
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('PlaceOrder')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Ionicons
                                name="close"
                                size={30}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            {/*<ModalStack.Screen
        name='CardPayment'
        component={CardPayment}
        options={({ navigation }) => ({
          title: 'Card Payment',
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('FARM')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Ionicons
                name='close'
                size={30}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />*/}
            <ModalStack.Screen name="MessageUs" component={MessageUsScreen} />
            <ModalStack.Screen
                name="EditDeliveryInfo"
                component={EditDeliveryInfo}
                options={({ navigation }) => ({
                    title: 'Delivery instruction',
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <ModalStack.Screen
                name="ConfirmDeliverySlot"
                component={ConfirmDeliverySlot}
                options={{ title: 'Delivery details' }}
            />
            <ModalStack.Screen
                name="MobileMoney"
                component={MobileMoneyScreen}
                options={({ navigation }) => ({
                    title: 'Mobile money',
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="angle-down"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <ModalStack.Screen
                name="CheckOut"
                component={CheckoutSuccess}
                options={({ navigation }) => ({
                    title: 'Checkout',

                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('FARM')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <AntDesign
                                name="close"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <ModalStack.Screen
                name="UpcomingDelivery"
                component={UpcomingDeliveryScreen}
                options={({ navigation }) => ({
                    title: 'Upcoming Delivery',

                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('FARM')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Ionicons
                                name="close-sharp"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <ModalStack.Screen
                name="DeleteAccount"
                component={DeleteAccount}
                options={({ navigation }) => ({
                    title: 'Delete  Account?',
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="angle-down"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <ModalStack.Screen
                name="PaymentOptions"
                component={PaymentOptions}
                options={({ navigation }) => ({
                    title: 'Select payment method',
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="angle-down"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <ModalStack.Screen
                name="DeliveryAddress"
                component={DeliveryAddress}
                options={({ route }) => ({
                    headerTitle: 'Delivery Address',
                })}
            />

            <ModalStack.Screen name="NotifyMe" component={NotificationScreen} />
            <ModalStack.Screen
                name="TimeSlot"
                component={TimeSlotScreen}
                options={{
                    title: 'Your delivery slots',

                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.navigate('FARM')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <Ionicons
                                name="close-sharp"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                }}
            />
        </ModalStack.Navigator>
    )
}

const AuthStack = createNativeStackNavigator()
function AuthNavigator() {
    const { navigation } = useNavigation()
    const colorScheme = useColorScheme()
    //
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="NewUserInfo"
                component={NewUserInfoScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                //options={{ headerTitle: "Change password" }}
                options={({ navigation }) => ({
                    title: 'Change password',
                    headerLeft: () => (
                        <Pressable
                            onPress={() => navigation.goBack()}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="chevron-left"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <AuthStack.Screen
                name="ForgottenPassword"
                component={ForgottenPassword}
            />
        </AuthStack.Navigator>
    )
}

const RootStack = createNativeStackNavigator()

const AppTabs = createBottomTabNavigator()
function BottomTabNavigator() {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    return (
        <AppTabs.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint,
                //tabBarStyle: { fontFamily: 'OpenSans' },
            }}
        >
            <AppTabs.Screen
                name="FARM"
                component={HomeNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'ios-leaf' : 'ios-leaf-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <AppTabs.Screen
                name="EXPLORE"
                component={ProductNavigator}
                options={{
                    headerShown: false,

                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'ios-search' : 'ios-search-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <AppTabs.Screen
                name="PROMOTION"
                component={PromotionNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'ios-gift' : 'ios-gift-outline'}
                            color={color}
                        />
                    ),
                }}
            />

            <AppTabs.Screen
                name="TROLLEY"
                component={TrolleyNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'ios-cart' : 'ios-cart-outline'}
                            color={color}
                        />
                    ),
                }}
            />
            <AppTabs.Screen
                name="ACCOUNT"
                component={AccountNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'ios-person' : 'ios-person-outline'}
                            color={color}
                        />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate('modal', {
                                    screen: 'Notify',
                                })
                            }
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                }}
            />
        </AppTabs.Navigator>
    )
}

HomeStack = createNativeStackNavigator()
function HomeNavigator({ navigation, route }) {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerTitle: 'Home', headerShown: false }}
            />
            <HomeStack.Screen
                name="FrontPage"
                component={FrontPageScreen}
                options={({ route }) => ({
                    headerTitle: route.params?.title,
                })}
            />
            <HomeStack.Screen
                name="Sub_Category"
                component={SubCategoryScreen}
                options={{
                    headerTitle: 'Sub Category',
                    headerShown: true,
                    headerTransparent: true,
                }}
            />
        </HomeStack.Navigator>
    )
}

const ProductStack = createNativeStackNavigator()
function ProductNavigator({ route }) {
    return (
        <ProductStack.Navigator
            initialRouteName="Categories"
            screenOptions={{
                headerTintColor: 'black',
                headerStyle: { backgroundColor: 'white' },
                headerBackTitleVisible: false,
            }}
        >
            <ProductStack.Screen
                name="Categories"
                component={CategoryScreen}
                options={{
                    //  headerTitle: 'Explore our products',
                    headerShown: false,
                    headerBackTitleVisible: false,
                }}
            />
            <ProductStack.Screen
                name="Products"
                component={ProductsScreen}
                options={{ headerTitle: 'Products' }}
            />
            <ProductStack.Screen
                name="Producer"
                component={ProducerProductsScreen}
                options={{
                    headerTitle: 'Our products',
                }}
            />
            <ProductStack.Screen
                name="OurProducers"
                component={OurProducersScreen}
                options={{ headerTitle: 'Our Producers' }}
            />
            {/*<ProductStack.Screen
        name="Sub_Category"
        component={SubCategoryTabScreen}
      />*/}
            <ProductStack.Screen
                name="Sub_Category"
                component={SubCategoryScreen}
                options={{
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerShown: true,
                    headerTransparent: true,
                    headerStyle: {
                        backgroundColor: 'transparent',
                    },
                }}
            />
            <ProductStack.Screen
                name="FilteredProducts"
                component={FilteredProductsScreen}
                options={{ headerTitle: 'FilteredProducts' }}
            />
            <ProductStack.Screen
                name="Search"
                component={SearchScreen}
                options={{ headerTitle: 'Search' }}
            />
        </ProductStack.Navigator>
    )
}
//
const RecipesStack = createNativeStackNavigator()
function RecipesNavigator() {
    return (
        <RecipesStack.Navigator>
            <RecipesStack.Screen
                name="Recipes"
                component={RecipesScreen}
                options={{ headerTitle: 'Recipes' }}
            />

            <RecipesStack.Screen
                name="RecipeDetail"
                component={RecipeDetailScreen}
                options={{ headerTitle: 'Recipe Detail' }}
            />
        </RecipesStack.Navigator>
    )
}

const PromotionStack = createNativeStackNavigator()
function PromotionNavigator() {
    return (
        <PromotionStack.Navigator>
            <PromotionStack.Screen
                name="Promotions"
                component={PromotionScreen}
                options={{ headerTitle: 'Promotions' }}
            />
        </PromotionStack.Navigator>
    )
}

const TrolleyStack = createNativeStackNavigator()
function TrolleyNavigator() {
    return (
        <TrolleyStack.Navigator>
            <TrolleyStack.Screen
                name="TrolleyTab"
                component={TrolleyScreen}
                options={{
                    headerTitle: 'Trolley',
                }}
            />
            <TrolleyStack.Screen
                name="MobileMoney"
                component={MobileMoneyScreen}
                options={({ navigation }) => ({
                    title: 'Mobile Money',
                })}
            />
        </TrolleyStack.Navigator>
    )
}

const AccountStack = createNativeStackNavigator()

function AccountNavigator(route, navigation) {
    return (
        <AccountStack.Navigator
            screenOptions={{ headerBackTitleVisible: false }}
        >
            <AccountStack.Screen
                name="AccountTab"
                component={AccountScreen}
                options={{
                    headerShown: false,
                    title: 'Account',
                    headerBackTitleStyle: { fontFamily: 'OpenSans' },
                }}
            />
            <AccountStack.Screen
                name="Wallet"
                component={WalletScreen}
                options={{ headerShown: true }}
            />
            <AccountStack.Screen
                name="HowWeWork"
                component={HowWeWorkScreen}
                options={{ headerShown: true, headerTitle: 'How We Work' }}
            />

            <AccountStack.Screen name="FAQ" component={FagScreen} />
            <AccountStack.Screen name="InDispute" component={InDisputeScreen} />
            <AccountStack.Screen
                name="Deliveries"
                component={DeliveriesScreen}
                options={{ headerTitle: 'Orders' }}
            />
            <AccountStack.Screen
                name="HowWeSource"
                component={HowWeSourceScreen}
                options={{ title: 'How we source our produce' }}
            />
            <AccountStack.Screen
                name="HowWeSourceDetails"
                component={HowWeSourceDetails}
            />
            <AccountStack.Screen
                name="AwaitingPayment"
                component={AwaitingPaymentScreen}
                options={{ headerShown: false }}
            />
            <AccountStack.Screen
                name="AccountDetail"
                component={AccountDetailScreen}
                options={{ title: 'Your details' }}
            />
            <AccountStack.Screen
                name="ContactDetails"
                component={ContactDetailScreen}
                options={{ title: 'Your details' }}
            />
            <AccountStack.Screen
                name="RedeemInvite"
                component={RewardFriendScreen}
                options={{ headerTitle: 'Redeem' }}
            />
            <AccountStack.Screen
                name="FriendsAndFamily"
                component={FriendsAndFamilyScreen}
                options={{ headerTitle: 'Invite to Farm Direct' }}
            />
            <AccountStack.Screen
                name="PendingOrders"
                component={PendingOrdersScreen}
                options={{ headerShown: false }}
            />
            <AccountStack.Screen name="MyOrders" component={MyOrdersScreen} />
            <AccountStack.Screen
                name="OrderDetails"
                component={OrderDetailsScreen}
                options={{ headerShown: false }}
            />
            <AccountStack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ headerTitle: 'Change Password' }}
            />
            <AccountStack.Screen
                name="Favourites"
                component={FavouritesScreen}
                options={{ headerTitle: 'Favourites' }}
            />
            <AccountStack.Screen
                name="Notify"
                component={NotificationScreen}
                options={{ headerTitle: 'Notification' }}
            />
        </AccountStack.Navigator>
    )
}

function TabBarIcon({ name, color, ...props }) {
    let IconComponent = Ionicons
    if (name === 'ios-cart' || name === 'ios-cart-outline')
        IconComponent = TrolleyIconWithBadge
    return (
        <IconComponent
            name={name}
            color={color}
            size={25}
            style={{ marginBottom: -3 }}
        />
    )
}

const styles = StyleSheet.create({
    search_icon_box: {
        flexDirection: 'row',
        width: 30,
        height: 30,
        backgroundColor: '#e4e6eb',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
})
