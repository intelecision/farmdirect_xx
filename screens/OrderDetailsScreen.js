import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
} from '../redux/actions/shoppingCartActions';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
//import Stepper from "../components/Stepper";
import { getServiceEndpoint } from '../Api/services/servicesApi';
import { Header } from '@rneui/themed';
import HeaderLeftArrow from '../components/HeaderLeftArrow';

import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/core';

const OrderDetailScreen = ({ ...props }) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [orderItems, setOrderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { order } = route.params;

  useEffect(() => {
    axios
      .get(getServiceEndpoint(`orders/GetOrderItems?orderId=${order.id}`))
      .then((response) => {
        setOrderItems(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);

        throw error;
      });
    return () => {};
  }, [order]);

  const handleAddToCart = (id) => {
    const { products, shoppingCart, addItemToCart, updateCartItem } = props;
    const product = products.find((p) => p.id === id);

    const idx = shoppingCart.findIndex((p) => p.id === id);
    if (idx === -1) {
      addItemToCart({
        quantity: 1,
        totalPrice: product.isOnSale ? product.salePrice : product.price,
        ...product,
      });
    } else if (idx > -1) {
      let update = Object.assign({}, shoppingCart[idx]);
      update.quantity += 1;

      let totalPrice = update.isOnSale
        ? update.quantity * update.salePrice
        : update.quantity * update.price;
      update.totalPrice = totalPrice;
      updateCartItem({ ...update });
    }
    // calculateTrolleySummary();
  };

  const handleRemoveFromCart = (id) => {
    const { shoppingCart, removeItemFromCart, updateCartItem } = props;
    const idx = shoppingCart.findIndex((p) => p.id === id);
    let toRemove = Object.assign({}, shoppingCart[idx]);
    toRemove.quantity -= 1;

    if (toRemove.quantity > 0) {
      let totalPrice = toRemove.quantity * toRemove.price;
      toRemove.totalPrice = totalPrice;
      updateCartItem({ ...toRemove });
    } else removeItemFromCart({ ...toRemove });
  };

  const renderOrderHeader = () => {
    const { order } = route.params;

    return (
      <View style={{ margin: 10, backgroundColor: 'white' }}>
        <Text style={{ marginBottom: 10 }}>
          Status: <Text>{order.orderStatus}</Text>
        </Text>

        <Text style={{ marginBottom: 5 }}>
          Order#: <Text>{order.orderNumber}</Text>
        </Text>
        <Text>
          Date: <Text>{Date(order.orderDate).slice(0, 15)}</Text>
        </Text>
        <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: '700' }}>
          Reminder: <Text>{order.paymentStatus}</Text>
        </Text>
      </View>
    );
  };

  //getTheProduct = (item) => {
  //  if item.id == item.id
  //}

  const renderItems = ({ item }) => {
    const { products } = props;
    const imageSource =
      'http://otuofarms.com/farmdirect/images/' + item.product.imageUri;
    const unitPricePerMeasure =
      item.product.pricePerMeasure.toString() +
      '/' +
      item.product.unitOfMeasure;

    let product = products.find((p) => p.id == item.product.id);
    // console.log("prod::", item);

    return (
      <TouchableOpacity
        activeOpacity={0.25}
        style={{
          borderColor: '#ddd',
          borderWidth: 0.5,
        }}
        onPress={() =>
          navigation.navigate('ItemDetail', {
            product: product,
            title: product.productName,
          })
        }
      >
        <View style={{ height: 81, backgroundColor: 'white' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: '100%',
              height: 80,
            }}
          >
            <View>
              <Image
                style={{
                  flex: 1,
                  width: 80,
                  height: null,
                  // paddingBottom: 10,
                  resizeMode: 'cover',
                }}
                source={{ uri: imageSource }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                paddingLeft: 10,
              }}
            >
              <View style={{ flex: 3 }}>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: 16,
                    // fontWeight: "700",
                    marginLeft: 5,
                    marginTop: 10,
                  }}
                >
                  {item.product.productName}
                </Text>

                <Text style={{ marginTop: 5 }}>{item.product.productSize}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      // color: lightTomatoes,
                    }}
                  >
                    GH₵{item.unitPrice}
                    <Text style={{ fontSize: 12 }}>x{item.quantity}</Text>
                  </Text>
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      marginEnd: 10,
                      fontWeight: '700',
                    }}
                  >
                    Total: GH₵{item.totalPrice}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  marginBottom: 15,
                  paddingRight: 10,
                  alignContent: 'flex-end',
                }}
              ></View>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              justifyContent: 'space-between',
            }}
          ></View>
        </View>
      </TouchableOpacity>
    );
  };

  //  const itemSeparator = () => {
  //    return (
  //      <View
  //        style={{
  //          height: 10,
  //          marginTop: 10,
  //          backgroundColor: "#f8f8fa",
  //          width: "100%",
  //        }}
  //      />
  //    );
  //  };

  const handleAddAll = () => {
    // const { orderItems } = state;
    if (orderItems) {
      orderItems.forEach((item, index) => {
        handleAddToCart(item.product.id);
      });
    }
  };
  const itemSeparator = () => (
    <View
      style={{
        height: 4,
        width: '100%',
        backgroundColor: '#f8f8fa',
      }}
    />
  );
  const showBusyStatus = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size='large' color='tomato' />
      </View>
    );
  };
  const ListFooterComponent = () => {
    return (
      <View
        style={{
          // paddingHorizontal: 40,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'tomato',
            justifyContent: 'center',
            width: '80%',
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 18,
                color: 'white',
                margin: 10,
                textAlign: 'center',
              }}
            >
              Add All{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  addItems = (items) => {
    let newList = [{}];
    for (element in items) {
      if (element.quantity > 1) {
        for (let i = 0; i < element.quantity; i++) {
          prod = element[i];
          prod.quantity = 0;
          newList.push(prod);
        }
      } else {
        // add to the list
        newList.push(element);
      }
    }
  };

  const getOrderDateHeader = () => {
    const { order: thisOrder } = route.params;
    //const thisOrder = props.navigation.getParam("order", null);
    /// const orderDate = new Date(thisOrder.orderDate);

    return new Date(thisOrder.orderDate).toDateString();
    //if (orderDate.getFullYear === today.getFullYear)
    //  return new Date(thisOrder.orderDate).toDateString();
    //else return Date(thisOrder.orderDate).substring(0, 15);
  };

  const orderDate = getOrderDateHeader();

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8fa' }}>
      {isLoading ? (
        showBusyStatus()
      ) : (
        <View style={{ flex: 1, backgroundColor: '#f8f8fa' }}>
          <Header
            statusBarProps={{ barStyle: 'dark-content' }}
            leftComponent={
              <HeaderLeftArrow onNavigate={() => navigation.goBack()} />
            }
            centerComponent={{
              text: orderDate,
              style: { color: 'black', fontSize: 18, fontWeight: '700' },
            }}
            containerStyle={{
              backgroundColor: 'white',
            }}
          />

          <View style={{ flex: 1, marginTop: 10, backgroundColor: '#f8f8fa' }}>
            <FlatList
              data={orderItems}
              renderItem={renderItems}
              keyExtractor={(item) => item.id.toString()}
              ItemSeparatorComponent={itemSeparator}
              // ListFooterComponent={ListFooterComponent}
            />
          </View>
          <View
            style={{
              height: 60,
              alignSelf: 'baseline',
              //backgroundColor: "gray",
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity
              onPress={() => handleAddAll()}
              style={{
                backgroundColor: 'tomato',
                justifyContent: 'center',
                width: '80%',
                height: 40,
              }}
            >
              <View
                style={{
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '700',
                  }}
                >
                  Add all to trolley
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    shoppingCart: state.shoppingCart,
    products: state.products,
    categories: state.categories,
    timeSlot: state.timeSlot,
    authorization: state.authorization,
  };
}

const mapDispatchToProps = {
  //loadProducts,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
  // loadTimeSlot,
  // saveSlot,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
