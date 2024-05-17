import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    ImageBackground,
    KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as authorizationActions from '../../redux/actions/authorizationAction'
import { Header, Image, CheckBox } from '@rneui/themed'
import { globalStyles } from './../../styles/global'
import HeaderLeftArrow from './../../components/HeaderLeftArrow'
import { Formik } from 'formik'
import * as Yup from 'yup'
import PasswordInputText from '../../screens/components/controls/PasswordInputText'
import Button from '../../screens/components/controls/Button'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'

//import { KeyboardAvoidingView } from "native-base";
import MessageBox from './../components/MessageBox'
import { farmDirectApi } from '../../Api/services/FarmDirectApi'

const RegisterScreen = ({ route, navigation, ...props }) => {
    const { authorization } = props
    const { firstName, lastName, phoneNumber, city } = route.params
    const [email, setEmail] = useState('')

    const [userName, setUserName] = useState('')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [statusError, setStatusError] = useState('')
    const [showDialog, setShowDialog] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [navigation])
    //
    const SignupSchema = Yup.object().shape({
        confirmPassword: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            )
            .min(8, 'confirm password must be at least 8 characters!')
            .required('confirm password is required')
            .oneOf(
                [Yup.ref('password'), null],
                'Confirmation password must match'
            ),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
            )
            .min(8, 'Password must be at least 8 characters!')
            .required('Password is required'),
        email: Yup.string()
            .email('Email entered is not valid')
            .required('Email address required'),
    })

    const handleLeftArrow = () => {
        navigation.goBack()
    }
    const registerUser = async (userData) => {
        const passwordFormat =
            'Passwords must have at least one non alphanumeric character.\n' +
            "least one digit ('0'-'9').\n" +
            "least one uppercase ('A'-'Z')."
        let data = {
            firstName: firstName,
            lastName,
            phoneNumber,
            city,
            ...userData,
        }

        setIsLoading(true)

        farmDirectApi
            .registerUser(data)
            .then((response) => {
                setIsLoading(false)
                signInUser(data.email, data.password)
            })
            .catch((error) => {
                setIsLoading(false)

                console.log(error)

                if (error.response?.status === 400) {
                    // account with the same name already exist
                    setStatusError(error)
                } else if (error.response?.status === 409) {
                    // account with the same name already exist
                    setStatusError(
                        'An account with the same email address already exist. Have you forgotten your password?'
                    )
                } else if (error?.response?.status === 410) {
                    setStatusError(
                        'Password must contain  at least 1 Alphanumeric  and 1 Uppercase'
                    )
                } else if (error.response?.status === 401) {
                    setStatusError(
                        'Something went wrong with you request! please try again'
                    )
                } else {
                    setStatusError(
                        'Something went wrong with you request! please try again'
                    )
                    console.log('err..Line 119 register', error.response)
                }
                //  setShowDialog(true);
            })

        setIsLoading(false)
    }

    const signInUser = (username, password) => {
        const { authActions } = props

        authActions
            .AuthenticateUser(username, password)
            .then(() => {
                //setIncorrectLogin(false);
                navigation.navigate('Tabs', { screen: 'FARM' })
            })
            .catch((err) => {
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
    const gotoSignIn = (data) => {
        setIsLoading(true)
        axios
            .post(
                'http://www.otuofarms.com/farmdirect/api/account/login',
                {
                    username: data.email,
                    password: data.password,
                    email: data.email,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                setIsLoggedIn(true)
                setIsLoading(false)
                navigation.navigate('Tabs', { screen: 'FARM' })
            })
            .catch((err) => {
                if (
                    err.response?.status === 400 &&
                    err.response?.status === 404
                ) {
                    setIsLoading(false)
                } else {
                    farmDirectApi
                        .logError({
                            errorMessage: error,
                            source: 'register.gotoSignIn',
                            platform: Platform.OS,
                            createdDate: Date.now,
                        })
                        .then(() => {
                            ///
                        })
                }
            })
        setIsLoading(false)
    }
    return (
        <View style={globalStyles.container}>
            <Header
                statusBarProps={{ barStyle: 'dark-content' }}
                backgroundColor="white"
                centerComponent={
                    <Text style={{ fontSize: 18, color: 'tomato' }}>
                        Register
                    </Text>
                }
                leftComponent={<HeaderLeftArrow onNavigate={handleLeftArrow} />}
            />
            <KeyboardAvoidingView
                //  enabled={true}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView style={{ flex: 1, marginHorizontal: 20 }}>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingTop: 20,
                        }}
                    >
                        <Image
                            resizeMethod="scale"
                            source={require('./../../assets/icon.png')}
                            style={{
                                height: 100,
                                width: 100,
                                marginBottom: 10,
                                borderRadius: 100,
                            }}
                        />
                    </View>

                    <View style={globalStyles.content}>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                confirmPassword: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, actions) => {
                                setIsLoading(true)
                                setUserName(values.email)
                                setPassword(values.password)
                                setConfirmPassword(values.confirmPassword)
                                setEmail(values.email)
                                registerUser(values)
                            }}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                // isSubmitting
                                values,
                                errors,
                                touched,
                            }) => (
                                <View
                                    style={{
                                        flex: 1,
                                        paddingVertical: 10,
                                        // paddingHorizontal: 10,
                                    }}
                                >
                                    <TextInput
                                        style={globalStyles.input}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType="email-address"
                                        placeholder="email: kofi@gmail.com"
                                    />
                                    <Text style={styles.errorStyles}>
                                        {touched.email && errors.email}
                                    </Text>
                                    <PasswordInputText
                                        placeholder="Password (min 8 chars, 1 upper, 1 number )"
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    <Text style={styles.errorStyles}>
                                        {touched.password && errors.password}
                                    </Text>
                                    <PasswordInputText
                                        onChangeText={handleChange(
                                            'confirmPassword'
                                        )}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        placeholder="Password (min 8 characters, 1 upper, 1 number 1 symbol)"
                                    />
                                    <Text style={styles.errorStyles}>
                                        {touched.confirmPassword &&
                                            errors.confirmPassword}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            width: '100%',
                                            paddingRight: 20,
                                        }}
                                    >
                                        <CheckBox
                                            checked
                                            checkedColor="tomato"
                                            title=" I would like to receive product updates from Farm Direct, campaigns and promotion"
                                            containerStyle={{
                                                width: '100%',
                                                borderWidth: 0,
                                                marginLeft: 0,
                                            }}
                                            textStyle={{ fontWeight: 'normal' }}
                                        />
                                    </View>
                                    <View style={{ marginVertical: 30 }}>
                                        <Button
                                            title="Register"
                                            isBusy={isLoading}
                                            onPress={handleSubmit}
                                        />
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                    {/*<MessageBox
            showDialog={showDialog}
            message={statusError}
            onClose={() => {
              setShowDialog(false);
            }}
          />*/}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}
function mapStateToProps(state) {
    return {
        authorization: state.authorization,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        authActions: bindActionCreators(authorizationActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)

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
