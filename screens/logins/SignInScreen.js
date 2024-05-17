import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
    Alert,
    KeyboardAvoidingView,
} from 'react-native'
import { Formik } from 'formik'
import { globalStyles } from './../../styles/global'
import * as Yup from 'yup'
import { Image } from '@rneui/themed'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authorizationActions from '../../redux/actions/authorizationAction'
import * as deliveryAddressesActions from '../../redux/actions/deliveryAddressAction'
import Button from '../components/controls/Button'
import PasswordInputText from '../components/controls/PasswordInputText'
import { retrieveItem } from '../../utils/localStorage'
import * as defaultAddressActions from '../../redux/actions/deliveryAddressAction'
import axios from 'axios'

import { loadFavourites } from '../../redux/actions/favouritesActions'
import { getImageSource } from '../../utils/helpers'

const SignInScreen = ({ route, navigation, ...props }) => {
    const { authorization } = props
    const [IncorrectLogin, setIncorrectLogin] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [userInfo, setUserInfo] = useState({})
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [disableLogin, setDisableLogin] = useState(true)
    const dispatch = useDispatch()
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])

    useEffect(() => {
        ;(async () => {
            const user = await retrieveItem('USER_INFO')
            if (user) {
                setUsername(user.username)
                setFirstName(user.firstName)
                setUserInfo(user)
            } else {
                setFirstName('')
            }
        })()

        return () => {}
    }, [IncorrectLogin])

    const SignupSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'Password must be at least 8 characters!')
            .required('Password is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email address required'),
    })

    const handleRegister = () => {
        navigation.navigate('Auth', { screen: 'NewUserInfo' })
    }
    const greetings = () => {
        var hour = new Date().getHours()
        return (
            'Good ' +
            ((hour < 12 && 'Morning ') ||
                (hour < 18 && 'Afternoon ') ||
                'Evening ') +
            firstName
        )
    }

    const signInUser = (username, password) => {
        const { authActions, authorization } = props

        setLoading(true)
        authActions
            .AuthenticateUser(username.toLowerCase(), password)
            .then(() => {
                setLoading(false)
                setIncorrectLogin(false)
                dispatch(loadFavourites)
                loadAddress()
                navigation.navigate('Tabs', { screen: 'FARM' })
            })
            .catch((err) => {
                setLoading(false)
                setIncorrectLogin(true)
                // console.log("sign in line 90-error:-", err.response);
                if (
                    err.response?.status === 400 ||
                    err.response?.status === 404
                ) {
                    Alert.alert('Error', err.response.data.message)
                } else {
                    console.log(err)
                }
            })
    }
    const loadAddress = () => {
        const {
            authorization,
            actionDeliveryAddresses,
            actionDefaultAddress,
            addressList,
        } = props

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

    const logIn = (username, password) => {
        axios
            .post(
                'http://www.otuofarms.com/farmdirect/api/account/login',
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                // saveToStore("USER_INFO", response.data);
                console.log(response)
            })
            .catch((err) => {
                console.log('Error Signing in', err)

                throw err
            })
    }

    const handleForgotPassword = () => {
        navigation.navigate('ForgottenPassword')
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View
                    style={{
                        flex: 0.6,
                        // height: 250,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //paddingTop: 40,
                    }}
                >
                    <Image
                        resizeMethod="scale"
                        source={require('./../../assets/icon.png')}
                        style={{
                            height: 80,
                            width: 80,
                            marginBottom: 10,
                            borderRadius: 100,
                        }}
                    />
                    <Text style={{ fontSize: 18, color: 'tomato' }}>
                        {greetings()}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, actions) => {
                            setUsername(values.email)
                            setPassword(values.password)
                            signInUser(
                                values.email.toLowerCase(),
                                values.password
                            )
                        }}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                        }) => (
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 10,
                                }}
                            >
                                <TextInput
                                    autoCapitalize="none"
                                    style={globalStyles.input}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                    placeholder="email: kofi@gmail.com"
                                />
                                <Text
                                    style={
                                        errors.email ? styles.errorStyles : {}
                                    }
                                >
                                    {touched.email && errors.email}
                                </Text>
                                <PasswordInputText
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                                <Text
                                    style={
                                        errors.password
                                            ? styles.errorStyles
                                            : { paddingBottom: 20 }
                                    }
                                >
                                    {touched.password && errors.password}
                                </Text>

                                <Button
                                    title="Log In"
                                    isBusy={loading}
                                    onPress={() => handleSubmit()}
                                />
                                <Pressable
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.5 : 1,
                                        height: 40,
                                        marginTop: 5,
                                    })}
                                    onPress={() => handleForgotPassword()}
                                >
                                    <View
                                        style={{
                                            paddingHorizontal: 10,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: 'tomato',
                                                fontSize: 15,
                                                textAlign: 'center',
                                            }}
                                        >
                                            I forgot my password
                                        </Text>
                                    </View>
                                </Pressable>
                                {IncorrectLogin ? (
                                    <Text style={styles.incorrectLoginStyles}>
                                        Sorry, account information incorrect.
                                    </Text>
                                ) : null}
                            </View>
                            //</View>
                        )}
                    </Formik>
                </View>
            </KeyboardAvoidingView>
            <View
                style={{
                    height: 200,
                    //   flex: Platform.OS === "ios" ? 0.6 : 0.5,

                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    //paddingBottom: Platform.OS === "ios" ? 60 : 40,
                }}
            >
                <Image
                    resizeMethod="scale"
                    source={{ uri: getImageSource('fd_van_right.png') }}
                    style={{
                        height: 130,
                        width: 260,
                        marginBottom: 10,
                        //  borderRadius: 100,
                    }}
                />
                <Text
                    style={{
                        color: 'tomato',
                        fontSize: 15,
                        textAlign: 'center',
                    }}
                >
                    Don't have an account?
                </Text>
                <Pressable
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                        //height: 30,
                        width: 130,
                    })}
                    onPress={() => handleRegister()}
                >
                    <View
                        style={{
                            height: 30,
                            backgroundColor: 'tomato',
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 15,
                                textAlign: 'center',
                            }}
                        >
                            Register now!
                        </Text>
                    </View>
                </Pressable>
                <View style={{ height: 60, backgroundColor: 'red' }}></View>
            </View>
            {/*</KeyboardAvoidingView>*/}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        authorization: state.authorization,
        addressList: state.addresses,
        favourites: state.favourites,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authorizationActions, dispatch),
        actionDefaultAddress: bindActionCreators(
            defaultAddressActions,
            dispatch
        ),
        actionDeliveryAddresses: bindActionCreators(
            deliveryAddressesActions,
            dispatch
        ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)

const styles = StyleSheet.create({
    errorStyles: {
        // marginBottom: 10,
        marginBottom: 6,
        marginTop: 2,
        marginLeft: 2,
        fontWeight: '400',
        color: 'crimson',
        fontSize: 13,
    },
    incorrectLoginStyles: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        textAlign: 'center',
        color: 'crimson',
    },
})
