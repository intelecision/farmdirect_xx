//import { StyleSheet, Alert, View, Text } from 'react-native';
//import React, { useState } from 'react';
////import {
////  CardField,
//// CardForm,
////useConfirmPayment,
////} from '@stripe/stripe-react-native';
//import { ScrollView } from 'react-native-gesture-handler';
//import { TextInput } from '../../components/Themed';
//import { Button, Switch } from '@rneui/base';
//import { createPaymentIntent } from '../../Api/services/stripeApi';
//import PaymentScreen from '../components/PaymentScreen';

//const CardPayment = () => {
//  const [name, setName] = useState();
//  const [cardDetails, setCardDetails] = useState();
//  const [saveCard, setSaveCard] = useState(false);
//  const { confirmPayment, loading } = useConfirmPayment();

//  const handlePay = async () => {
//    const clientSecret = await createPaymentIntent('card', 'GBP', 2970);
//    console.log('clientSecret', clientSecret);

//    try {
//      const { paymentIntent, error } = await confirmPayment(clientSecret, {
//        type: 'Card',
//        billingDetails: {
//          email: 'email@stripe.com',
//          phone: '+48888000888',
//          addressCity: 'Houston',
//          addressCountry: 'US',
//          addressLine1: '1459  Circle Drive',
//          addressLine2: 'Texas',
//          addressPostalCode: '77063',
//        },
//      });
//      console.log('confirmPayment', cardDetails);
//      console.log('paymentIntent', paymentIntent);
//      if (error) {
//        Alert.alert(`Error code: ${error.code}`, error.message);
//      } else if (paymentIntent) {
//        Alert.alert('Successful', `Payment  successful ${paymentIntent.id}`);
//      }
//    } catch (error) {
//      Alert.alert('Successful', `Payment  successful ${paymentIntent.id}`);
//    }
//  };

//  return (
//    //<PaymentScreen>
//    <ScrollView style={styles.container}>
//      <View style={styles.content}>
//        <TextInput
//          style={{
//            fontSize: 20,
//            justifyContent: 'center',
//            borderBottomColor: '#ddd',
//            borderBottomWidth: 1,
//          }}
//          autoCapitalize='none'
//          placeholder='name'
//          keyboardType='name-phone-pad'
//          onChange={(value) => setName(value.nativeEvent.text)}
//        />
//        {/*<CardField
//          postalCodeEnabled={false}
//          style={styles.CardField}
//          cardStyle={{ borderColor: '#ddd', borderWidth: 1 }}
//          onChange={(cardDetails) => console.log('card details', cardDetails)}
//        />*/}
//        <CardForm
//          onFormComplete={(cardDetails) => {
//            console.log('card details', cardDetails);
//            setCardDetails(cardDetails);
//          }}
//          style={{ height: 200, backgroundColor: 'white', marginVertical: 20 }}
//        />
//        <View style={styles.row}>
//          <Switch
//            onValueChange={(value) => setSaveCard(value)}
//            value={saveCard}
//          />
//          <Text style={styles.text}>Save card during payment</Text>
//        </View>
//        <Button
//          title={'Pay Now'}
//          style={{ height: 50, width: '100%', marginVertical: 10 }}
//          onPress={handlePay}
//          disabled={loading}
//        />
//      </View>
//    </ScrollView>
//    //</PaymentScreen>
//  );
//};

//export default CardPayment;

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//  },
//  content: {
//    flex: 1,
//    paddingHorizontal: 20,
//    paddingVertical: 20,
//  },
//  CardField: {
//    width: '100%',
//    height: 50,
//    marginVertical: 30,
//  },
//  text: {
//    marginLeft: 12,
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  row: {
//    flexDirection: 'row',
//  },
//});
