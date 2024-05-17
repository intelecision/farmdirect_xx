import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    PaymentSheet,
    PaymentSheetError,
    StripeProvider,
    useStripe,
} from '@stripe/stripe-react-native'
import PaymentScreen from './components/PaymentScreen'
import { createPaymentIntent } from '../Api/services/stripeApi'

function StripeScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe()
    const [loading, setLoading] = useState(false)
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false)
    const [clientSecret, setClientSecret] = useState<string | null>(null)

    const fetchPaymentSheetParams = async () => {
        const response = await createPaymentIntent('card', 'gbp', 1000)

        return response
    }

    const initializePaymentSheet = async () => {
        const { clientSecret } = await fetchPaymentSheetParams()

        const { error } = await initPaymentSheet({
            merchantDisplayName: 'Farms Direct.',
            customerId: 'customer',
            //     merchantIdentifier: 'merchant.com.farmDirectgh.com',
            //customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: clientSecret,
            allowsDelayedPaymentMethods: true,
            defaultBillingDetails: {
                name: 'Jane Doe',
            },
            applePay: {
                merchantCountryCode: 'US',
            },
            googlePay: {
                merchantCountryCode: 'US',
                testEnv: true,
            },
        })
        if (!error) {
            setLoading(true)
        }
    }

    //const initialisePaymentSheet = async (shippingDetails?: AddressDetails) => {
    //    const { paymentIntent, ephemeralKey, customer } =
    //        await fetchPaymentSheetParams()

    //    const address: Address = {
    //        city: 'San Francisco',
    //        country: 'AT',
    //        line1: '510 Townsend St.',
    //        line2: '123 Street',
    //        postalCode: '94102',
    //        state: 'California',
    //    }
    //    const billingDetails: BillingDetails = {
    //        name: 'Jane Doe',
    //        email: 'foo@bar.com',
    //        phone: '555-555-555',
    //        address: address,
    //    }

    //    const { error } = await initPaymentSheet({
    //        customerId: customer,
    //        customerEphemeralKeySecret: ephemeralKey,
    //        paymentIntentClientSecret: paymentIntent,
    //        customFlow: false,
    //        merchantDisplayName: 'Example Inc.',
    //        applePay: { merchantCountryCode: 'US' },
    //        style: 'automatic',
    //        googlePay: {
    //            merchantCountryCode: 'US',
    //            testEnv: true,
    //        },
    //        returnURL: 'stripe-example://stripe-redirect',
    //        defaultBillingDetails: billingDetails,
    //        defaultShippingDetails: shippingDetails,
    //        allowsDelayedPaymentMethods: true,
    //        appearance,
    //        primaryButtonLabel: 'purchase!',
    //        removeSavedPaymentMethodMessage: 'remove this payment method?',
    //    })
    //    if (!error) {
    //        setPaymentSheetEnabled(true)
    //    } else if (error.code === PaymentSheetError.Failed) {
    //        Alert.alert(
    //            `PaymentSheet init failed with error code: ${error.code}`,
    //            error.message
    //        )
    //    } else if (error.code === PaymentSheetError.Canceled) {
    //        Alert.alert(
    //            `PaymentSheet init was canceled with code: ${error.code}`,
    //            error.message
    //        )
    //    }
    //}

    const openPaymentSheet = async () => {
        if (!clientSecret) {
            return
        }
        setLoading(true)
        const { error } = await presentPaymentSheet()

        if (!error) {
            Alert.alert('Success', 'The payment was confirmed successfully')
        } else {
            switch (error.code) {
                case PaymentSheetError.Failed:
                    Alert.alert(
                        `PaymentSheet present failed with error code: ${error.code}`,
                        error.message
                    )
                    setPaymentSheetEnabled(false)
                    break
                case PaymentSheetError.Canceled:
                    Alert.alert(
                        `PaymentSheet present was canceled with code: ${error.code}`,
                        error.message
                    )
                    break
                //case PaymentSheetError.:
                //    Alert.alert(
                //        `PaymentSheet present timed out: ${error.code}`,
                //        error.message
                //    )
                //    break
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        initializePaymentSheet()
    }, [])

    return (
        <PaymentScreen>
            <Button
                title="Pay"
                disabled={!loading}
                onPress={openPaymentSheet}
            />
        </PaymentScreen>

        //<Button
        //    variant="primary"
        //    disabled={!loading}
        //    title="Checkout"
        //    onPress={openPaymentSheet}
        ///>
    )
}

export default StripeScreen

const styles = StyleSheet.create({})
