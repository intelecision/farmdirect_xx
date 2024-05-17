import React, { Component } from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';

import OrderTotalLine from './OrderTotalLine';
import {
  MINIMUM_ORDER_AMOUNT,
  FREE_DELIVER_SPEND,
} from './../../constants/AppConstants';
//import Button from "./controls/Button";
import { Button } from '@rneui/themed';
import { lightTomatoes } from './../../constants/colours';

//...
const OrderTotal = ({
  subTotal,
  deliveryCost,
  discountAmount,
  grandTotal,
  onRedeem,
  isCheckOut,
}) => {
  return (
    <View style={{ backgroundColor: 'white', marginTop: 10 }}>
      <View
        style={{
          // flex: 1,
          height: 40,
          borderBottomWidth: 0.5,
          borderBottomColor: '#ddd',
        }}
      >
        <Text
          style={{
            margin: 10,
            fontSize: 18,
            fontWeight: '700',
            fontFamily: 'Philosopher',
          }}
        >
          Order Total
        </Text>
      </View>
      <OrderTotalLine title={'Basket total'} totalAmount={subTotal} />
      <OrderTotalLine
        title={isCheckOut ? 'Delivery Cost' : 'Delivery cost'}
        totalAmount={deliveryCost}
      />
      <View
        style={{
          paddingHorizontal: 30,
          margin: 10,
          height: 80,
        }}
      >
        <Button
          onPress={onRedeem}
          title=' Redeem your voucher'
          titleStyle={{ color: 'red' }}
          containerStyle={{ borderRadius: 20, backgroundColor: '#f2e4e1' }}
          buttonStyle={{
            borderRadius: 20,
            height: 45,
            backgroundColor: '#f2e4e1',
            borderColor: 'tomato',
            borderWidth: 0.75,
          }}
        />
      </View>
      <OrderTotalLine title={'Discount amount'} totalAmount={discountAmount} />

      <View
        style={{
          borderTopWidth: 0.5,
          borderTopColor: '#dddddd',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'space-between',
            margin: 10,
          }}
        >
          <View style={{ flex: 3 }}>
            <Text
              style={{
                fontFamily: 'Philosopher',
                fontWeight: '700',
                fontSize: 16,
              }}
            >
              Sub-total
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text
              style={{
                fontFamily: 'Philosopher',
                textAlign: 'right',
                fontWeight: '700',
              }}
            >
              GH₵{grandTotal}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderTotal;

const styles = StyleSheet.flatten({});
