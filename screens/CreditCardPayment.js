import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Order } from '../Models/Orderings';
import { Formik } from 'formik';
import { globalStyles } from '../styles/global';
import IconTextInput from './components/IconTextInput';
import { Image, Header } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderLeftText from './../components/HeaderLeftText';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import { useRoute, useNavigation } from '@react-navigation/core';

function CreditCardPayment() {
  const navigation = useNavigation();
  const route = useRoute();
  const [result, setResult] = useState('');
  function cc_format(value) {
    if (!value) return '';
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    var matches = v.match(/\d{4,16}/g);
    var match = (matches && matches[0]) || '';
    var parts = [];
    for (i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  }

  function cc_expires_format(string) {
    return string
      .replace(
        /[^0-9]/g,
        '' // To allow only numbers
      )
      .replace(
        /^([2-9])$/g,
        '0$1' // To handle 3 > 03
      )
      .replace(
        /^(1{1})([3-9]{1})$/g,
        '0$1/$2' // 13 > 01/3
      )
      .replace(
        /^0{1,}/g,
        '0' // To handle 00 > 0
      )
      .replace(
        /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
        '$1/$2' // To handle 113 > 11/3
      );
  }

  function handleGoBack() {
    navigation.goBack();
  }

  function makePayment() {
    const data = {
      'merchant-id': '899873203712',
      'api-key':
        '53ID9C4WeLq4CwpllX3Ya-ubl17gkQHXXBjNcpjvgS-nG15ftXXJQG3YuRUIsri-8Z4PN891NJ4n4Mv71vT',
      'firstname': 'jason',
      'lastname ': 'otuo',
      'email': 'jason@otuofarms.com',
      'phonenumber': '1211112222',
      'currency': 'GHS',
      'amount': 20.5,
      'order-id': '115',
      'redirect-url':
        'https://webhook.site/9a4c2fba-3ee1-48a0-8c1f-9efdedf74d04',
    };
    axios
      .post(
        'https://sandbox.expresspaygh.com/api/submit.php',
        new URLSearchParams(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((response) => {
        let newData = JSON.parse(
          JSON.stringify(response.data).replace('-', '_')
        );

        checkOut(newData);
      })
      .catch((err) => {
        throw err;
      });
  }
  function checkOut(returnedData) {
    let result = WebBrowser.openBrowserAsync(
      `https://sandbox.expresspaygh.com/api/checkout.php?token=${returnedData.token}`
    );
    //order-id=${returnedData.order_id}
    setResult(result);
  }

  return (
    //<SafeAreaView style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <Header
        barStyle='light-content'
        leftComponent={<HeaderLeftText onNavigate={handleGoBack} />}
        containerStyle={{ backgroundColor: '#fff' }}
        centerComponent={{
          text: 'Card Payment',
          style: { color: 'tomato' },
        }}
      />
      <View style={globalStyles.content}>
        <View
          style={{
            backgroundColor: 'white',
            height: 80,
            marginTop: 10,
            justifyContent: 'center',
          }}
        >
          <Image
            source={require('../assets/Credit-Card-Icons2.jpg')}
            resizeMode='contain'
            style={{ width: null, height: 70 }}
          />
        </View>
        <Formik
          initialValues={{
            fullName: '',
            expiry: '',
            cvc: '',
            jason: '',
          }}
          onSubmit={(values) => makePayment()}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{ flex: 1, paddingVertical: 10 }}>
              <TextInput
                style={globalStyles.input}
                placeholder='Kweku Obeng'
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
              <IconTextInput
                iconName='card'
                iconType='ionicon'
                placeholder='4523 1111 2222 3333'
                onChangeText={handleChange('cardNumber')}
                value={cc_format(values.cardNumber)}
                maxLength={29}
                keyboardType='number-pad'
                returnKeyType='done'
              />

              <TextInput
                style={globalStyles.input}
                placeholder='Expiry (DD/YY)'
                onChangeText={handleChange('expiry')}
                value={cc_expires_format(values.expiry)}
                keyboardType='numeric'
                returnKeyType='done'
                autoCompleteType='cc-exp'
                maxLength={5}
              />
              <TextInput
                style={globalStyles.input}
                placeholder='CVC'
                onChangeText={handleChange('cvc')}
                value={values.cvc}
                keyboardType='numeric'
                returnKeyType='done'
                maxLength={4}
              />

              <Button title='Submit' onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </View>
    </View>
    //</SafeAreaView>
  );
}
export default CreditCardPayment;
