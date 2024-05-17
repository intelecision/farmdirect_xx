import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//import { StripeProvider } from "@stripe/stripe-react-native";
import StripPay from '../server/src/StripePay';

const PayWithStripe = () => {
  return (
    <StripeProvider publishableKey='pk_live_51KOIx6AeWHlEP2cZoJKrzKoqxdeTR0SPs223dKL8jte88YkpXe9LTTIsFfPxnhL99QRVhyXNVw1ORTefieoPvv8r00Rb9KtKpj'>
      <StripePay />
    </StripeProvider>
  );
};

export default PayWithStripe;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', margin: 20 },
});
