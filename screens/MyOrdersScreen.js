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
import { Button } from '@rneui/themed';
import axios from 'axios';
import { retrieveItem } from '../utils/localStorage';
import { getServiceEndpoint } from '../Api/services/servicesApi';
//import { usePromiseTracker } from "react-promise-tracker";

const MyOrdersScreen = ({ navigation, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  useEffect(() => {
    loadOrders();
    return () => {};
  }, []);
  const bootstrapAsync = async () => {
    const userInfo = await retrieveItem('USER_INFO');
    setUser(userInfo);
  };
  const loadOrders = async () => {
    const userInfo = await retrieveItem('USER_INFO');
    setIsLoading({ isLoading: true });

    axios
      .get(getServiceEndpoint(`orders/GetByUserId?userId=${userInfo.id}`))
      .then((response) => {
        setOrderList(response.data);
        sleep(1000);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading({ isLoading: false });

        throw error;
      });
  };
  const renderItems = ({ item }) => {
    //  const { navigation } = this.props;
    let orderDate = new Date(item.orderDate).toDateString();

    return (
      <View
        style={{
          flex: 1,
          marginBottom: 10,
          backgroundColor: 'white',
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
            <Text style={{ fontWeight: '700' }}>{item.paymentStatus}</Text>
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
                You have no payments pending
              </Text>
              <Button
                title='Start shopping'
                //size={45}
                type='outline'
                style={{ marginTop: 20 }}
                buttonStyle={{ borderColor: 'grey' }}
                titleStyle={{ textDecorationColor: 'tomato', color: 'tomato' }}
                onPress={() => {
                  navigation.navigate('Farm');
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};
MyOrdersScreen.navigationOptions = (screenProps) => ({
  title: 'Your Orders',
});
const styles = StyleSheet.create({});

export default MyOrdersScreen;
