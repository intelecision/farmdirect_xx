import React, { useState, useEffect, useCallback } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from './redux/configureStore'
import * as SplashScreen from 'expo-splash-screen'
import { StyleSheet, View } from 'react-native'
import FarmDirectCart from './navigation/FarmDirectCart'
import { Asset } from 'expo-asset'
import { StripeProvider } from '@stripe/stripe-react-native'
import { useFonts } from 'expo-font'
import * as Linking from 'expo-linking'
import { RootSiblingParent } from 'react-native-root-siblings'
import { StatusBar } from 'expo-status-bar'
import 'expo-dev-client'
import { getPublishableKey } from './Api/services/stripeApi'

const store = configureStore()
//const prefix = Linking.makeUrl("/");

export default function App() {
    const [isReady, setIsReady] = useState(false)
    const [data, setData] = useState(null)
    const [appIsReady, setAppIsReady] = useState(false)
    const [publishableKey, setPublishableKey] = useState()
    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync()
                // Pre-load fonts, make any API calls you need to do here
                await _cacheResourcesAsync()
                // Artificially delay for two seconds to simulate a slow loading
                // experience. Please remove this if you copy and paste the code!
                await new Promise((resolve) => setTimeout(resolve, 2000))
            } catch (e) {
                console.warn(e)
            } finally {
                // Tell the application to render
                setAppIsReady(true)
            }
        }
        async function readPublishableKey() {
            try {
                const response = await getPublishableKey()

                setPublishableKey(response.publicKey)
            } catch (err) {
                console.log(err.response.data)
                console.error(err)
                throw err
            }
        }

        prepare()
        readPublishableKey()
    }, [])

    useEffect(() => {
        async function getInitialUrl() {
            const initialUrl = await Linking.getInitialURL()
            if (initialUrl) setData(Linking.parse(initialUrl))
        }
        Linking.addEventListener('url', handleDeepLink)

        if (!data) {
            getInitialUrl()
        }

        return () => {
            Linking.removeEventListener('url')
        }
    }, [])

    _cacheResourcesAsync = async () => {
        const images = [
            require('./assets/splash.png'),
            require('./assets/images/fd_van.png'),
        ]

        const cacheImages = images.map((image) => {
            return Asset.fromModule(image).downloadAsync()
        })
        return Promise.all(cacheImages)
    }
    const [loaded] = useFonts({
        Philosopher: require('./assets/fonts/Philosopher-Bold.ttf'),
        Philosopher_Regular: require('./assets/fonts/Philosopher-Regular.ttf'),
        Philosopher_BoldItalic: require('./assets/fonts/Philosopher-BoldItalic.ttf'),
        Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
        Roboto_Bold: require('./assets/fonts/Roboto-Bold.ttf'),
        OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
        OpenSansLight: require('./assets/fonts/OpenSans-Light.ttf'),
        OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
        OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
        OpenSansMedium: require('./assets/fonts/OpenSans-Medium.ttf'),
        OpenSansItalics: require('./assets/fonts/OpenSans-Italic.ttf'),
    })

    const handleDeepLink = (event) => {
        let data = Linking.parse(event.url)
        setData(data)
    }
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // This tells the splash screen to hide immediately! If we call this after
            // `setAppIsReady`, then we may see a blank screen while the app is
            // loading its initial state and rendering its first pixels. So instead,
            // we hide the splash screen once we know the root view has already
            // performed layout.
            await SplashScreen.hideAsync()
        }
        if (process.env.NODE_ENV === 'production') {
            console.log = () => {}
            console.error = () => {}
            console.debug = () => {}
        }
    }, [appIsReady])

    if (!appIsReady) {
        return null
    }
    return (
        <RootSiblingParent>
            <StatusBar backgroundColor="white" />
            <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
                <ReduxProvider store={store}>
                    <StripeProvider
                        publishableKey={publishableKey}
                        merchantIdentifier="merchant.identifier"
                        urlScheme="example"
                    >
                        <FarmDirectCart />
                    </StripeProvider>
                </ReduxProvider>
            </View>
        </RootSiblingParent>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
