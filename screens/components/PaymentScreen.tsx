//import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native'
import { getPublishableKey } from '../../Api/services/stripeApi'
import { colors } from '../../constants/Colors'
import { initStripe } from '@stripe/stripe-react-native'

interface Props {
    paymentMethod?: string
    children: React.ReactNode
}

const PaymentScreen: React.FC<Props> = ({ paymentMethod, children }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function initialize() {
            const publishableKey = await getPublishableKey()
            if (publishableKey) {
                await initStripe({
                    publishableKey,
                    merchantIdentifier: 'merchant.com.farmDirectgh.com',
                    urlScheme: 'stripe-example',
                })
                setLoading(false)
            }
        }
        initialize()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return loading ? (
        <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
    ) : (
        <ScrollView
            accessibilityLabel="payment-screen"
            style={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            {children}
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <Text style={{ opacity: 0 }}>appium fix</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingTop: 20,
        paddingHorizontal: 16,
    },
})

export default PaymentScreen
