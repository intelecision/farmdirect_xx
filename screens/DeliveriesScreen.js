import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Icon, Header, Button } from '@rneui/themed';
import HeaderLeftArrow from '../components/HeaderLeftArrow';

import { getServiceEndpoint } from '../Api/services/servicesApi';
import { lightGrayBackground } from '../constants/colours';
import useFetch from '../hooks/useFetch';
//import { SafeAreaView } from "react-native";
import { Text } from './../components/Themed';

const DeliveriesScreen = ({ route, navigation }) => {
  const { userId, filterType, title } = route.params;
  const [url, setUrl] = useState('');
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation]);

  useEffect(() => {
    setUrl(getServiceEndpoint(`orders/GetOrdersByUser?userId=${userId}`));

    return () => {};
  }, [url]);

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
          marginBottom: 6,
          backgroundColor: 'white',
          borderRadius: 8,
        }}
      >
        <View style={{ margin: 10 }}>
          <Text style={{ margin: 5 }}>
            Order number:
            <Text style={{ fontFamily: 'OpenSansSemiBold', fontWeight: '700' }}>
              {item.orderNumber}
            </Text>
          </Text>
          <Text style={{ marginLeft: 5 }}>
            Order date:{' '}
            <Text style={{ fontFamily: 'OpenSansSemiBold', fontWeight: '700' }}>
              {orderDate}
            </Text>
          </Text>
          <Text style={{ margin: 5 }}>
            Delivery address:{' '}
            <Text style={{ fontFamily: 'OpenSansSemiBold', fontWeight: '700' }}>
              {item.deliveryAddress}
            </Text>
          </Text>
          <Text style={{ margin: 5 }}>
            Total:{' '}
            <Text style={{ fontFamily: 'OpenSansSemiBold', fontWeight: '700' }}>
              Gh₵{item.amount - item.deliveryCost}
            </Text>
          </Text>
          <Text style={{ margin: 5 }}>
            Order status:{' '}
            <Text style={{ fontFamily: 'OpenSansSemiBold', fontWeight: '700' }}>
              {item.orderStatus}
            </Text>
          </Text>
          <Text style={{ margin: 5 }}>
            Payment status:{' '}
            <Text style={{ fontFamily: 'OpenSansSemiBold', fontWeight: '700' }}>
              {item.paymentStatus}
            </Text>
          </Text>
        </View>
        <Button
          title='View order'
          type='outline'
          style={{ margin: 20 }}
          buttonStyle={{ borderColor: 'grey' }}
          titleStyle={{
            fontFamily: 'OpenSansSemiBold',
            textDecorationColor: 'tomato',
            color: 'tomato',
          }}
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
        backgroundColor: lightGrayBackground,
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
          {orderList && orderList.length > 0 ? (
            <FlatList
              data={orderList}
              initialNumToRender={7}
              renderItem={renderItems}
              keyExtractor={(item, idx) => idx.toString()}
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
                  fontWeight: '400',
                }}
              >
                You have no orders pending delivery
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
DeliveriesScreen.navigationOptions = (screenProps) => ({
  title: 'Pending payments',
  header: null,
  // headerHeight: 100,
});
const styles = StyleSheet.create({});

export default DeliveriesScreen;
