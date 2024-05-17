import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Icon, Header, Button } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/core';
import { getServiceEndpoint } from '../Api/services/servicesApi';
import HeaderLeftArrow from '../components/HeaderLeftArrow';
import useFetch from '../hooks/useFetch';

const AwaitingPaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params;
  const url = getServiceEndpoint(`orders/GetPaymentPending?userId=${userId}`);

  // fetch the data
  const { data: orderList, error, isLoading } = useFetch(url);

  const renderItems = ({ item }) => {
    //  const { navigation } = this.props;
    let orderDate = new Date(item.orderDate).toDateString();

    return (
      <View
        style={{
          flex: 1,
          margin: 10,

          backgroundColor: 'white',
          borderRadius: 8,
        }}
      >
        <View style={{ margin: 10 }}>
          <Text style={{ margin: 5 }}>
            Order number:
            <Text style={{ fontWeight: '700' }}> {item.orderNumber}</Text>
          </Text>
          <Text style={{ marginLeft: 5 }}>
            Order date: <Text style={{ fontWeight: '700' }}>{orderDate}</Text>
          </Text>
          <Text style={{ margin: 5 }}>
            Delivery address:{' '}
            <Text style={{ fontWeight: '700' }}>{item.deliveryAddress}</Text>
          </Text>
          <Text style={{ margin: 5 }}>
            Total: <Text style={{ fontWeight: '700' }}>Gh₵{item.amount}</Text>
          </Text>
          <Text style={{ margin: 5 }}>
            Payment status:{' '}
            <Text
              style={{
                fontWeight: '700',
                color:
                  item.paymentStatus.trim() == 'Pending' ? '#FFBF00' : 'red',
              }}
            >
              {item.paymentStatus}
            </Text>
          </Text>
        </View>
        <Button
          title='View order'
          type='outline'
          style={{ margin: 20 }}
          buttonStyle={{ borderColor: 'grey' }}
          titleStyle={{ textDecorationColor: 'tomato', color: 'tomato' }}
          onPress={() => {
            navigation.navigate('OrderDetails', {
              order: item,
            });
          }}
        />
      </View>
    );
  };
  const headerComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'tomato',
          padding: 15,
          margin: 20,
        }}
      >
        <Text style={{ fontWeight: '700', color: 'white' }}>
          Please be aware:{' '}
          <Text style={{ fontWeight: '300' }}>
            prices, offers or availability of some products may have changed
            since you previously ordered.
          </Text>
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#f8f8fa',
      }}
    >
      <Header
        leftComponent={
          <HeaderLeftArrow onNavigate={() => navigation.goBack()} />
        }
        statusBarProps={{ barStyle: 'dark-content' }}
        centerComponent={{
          text: 'Pending Payment',
          style: { fontSize: 18, fontWeight: '600' },
        }}
        containerStyle={{
          backgroundColor: 'white',
          borderBottomColor: 'white',
          justifyContent: 'space-around',
          height: 80,
        }}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            // alignContent: "center",
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator color='tomato' size='large' />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {orderList.length > 0 ? (
            <FlatList
              data={orderList}
              initialNumToRender={7}
              renderItem={renderItems}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={headerComponent}
            />
          ) : (
            <View
              style={{
                flex: 1,
                // height: 160,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#ddd',
                borderWidth: 0.5,
              }}
            >
              <Text
                style={{
                  margin: 10,
                  textAlign: 'justify',
                  fontSize: 16,
                  fontWeight: '600',
                }}
              >
                You have no orders pending
              </Text>
              <Button
                title='Start shopping'
                //size={45}
                type='outline'
                style={{ marginTop: 20 }}
                buttonStyle={{ borderColor: 'grey' }}
                titleStyle={{ textDecorationColor: 'tomato', color: 'tomato' }}
                onPress={() => {
                  navigation.navigate('FARM');
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

AwaitingPaymentScreen.navigationOptions = (screenProps) => ({
  //title: "Pending Payments",
  header: null,
  hederMode: 'none',
});

//const styles = StyleSheet.create({});

export default AwaitingPaymentScreen;
