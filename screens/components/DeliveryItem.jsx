import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';
import { format } from 'date-fns';

const DeliveryItem = ({ orderDate, status }) => {
  const [orderStatus, setOrderStatus] = useState('Preparing order');
  const [formattedDate, setFormattedDate] = useState();
  useEffect(() => {
    setFormattedDate(format(new Date(orderDate), 'eee, dd MMM yyyy hh:mm aa'));
    if (status.toLowerCase() === 'pending') {
      setOrderStatus('Preparing order');
    } else {
      setOrderStatus(status);
    }

    return () => {};
  }, [status]);

  return (
    <View
      style={{
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        paddingTop: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 1,
          height: 70,
          justifyContent: 'space-around',
        }}
      >
        <View
          style={{
            width: 6,
            borderRadius: 10,
            backgroundColor: 'tomato',
            margin: 10,
          }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ marginTop: 10, fontWeight: '600' }}>
            Ordered and payment received
          </Text>
          <Text style={{ fontSize: 13, marginBottom: 4, color: '#8d99ae' }}>
            {formattedDate}{' '}
          </Text>
          <Text>Status: {orderStatus}</Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Button
            title={'Track'}
            buttonStyle={{
              backgroundColor: 'tomato',
              margin: 10,
              height: 35,
              width: 60,
            }}
            titleStyle={{ fontSize: 14 }}
            disabled={true}
          />
        </View>
      </View>
    </View>
  );

  const styles = StyleSheet.create({});
};

export default DeliveryItem;
