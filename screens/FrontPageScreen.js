import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as productsActions from '../redux/actions/productsActions';
import * as shoppingCartActions from './../redux/actions/shoppingCartActions';

import TrolleyItem from './components/TrolleyItem';
import useFetch from './../hooks/useFetch';
import { getServiceEndpoint } from './../Api/services/servicesApi';

const FrontPageScreen = ({ route, navigation, ...props }) => {
  const { frontPageId, title } = route.params;
  const { products } = props;

  const {
    data: productList,
    error,
    isLoading,
  } = useFetch(
    getServiceEndpoint(`products/GetFrontPageProducts?id=${frontPageId}`)
  );

  const logErrors = (err) => {};

  const headerComponent = () => {
    return (
      <View style={{ justifyContent: 'center', margin: 10 }}>
        <Image
          source={{ uri: getImageSource() }}
          style={{
            flex: 1,
            width: null,
            height: 240,
            resizeMode: 'cover',
          }}
        />
        <View style={{ margin: 5 }}>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 6,
              fontSize: 22,
              fontWeight: '700',
            }}
          >
            {producer.farmName}
          </Text>
          <Text style={{ textAlign: 'justify' }}>{producer.narrative}</Text>
        </View>
      </View>
    );
  };

  const handleAddToCart = (product) => {
    const { shoppingCart, trolleyActions } = props;

    const idx = shoppingCart.findIndex((p) => p.id === product.id);
    if (idx === -1) {
      trolleyActions.addItemToCart({
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
      trolleyActions.updateCartItem({ ...update });
    }
  };

  const handleRemoveFromCart = (product) => {
    const { shoppingCart, trolleyActions } = props;
    const idx = shoppingCart.findIndex((p) => p.id === product.id);
    let toRemove = Object.assign({}, shoppingCart[idx]);
    toRemove.quantity -= 1;

    if (toRemove.quantity > 0) {
      let totalPrice = toRemove.quantity * toRemove.price;
      toRemove.totalPrice = totalPrice;
      trolleyActions.updateCartItem({ ...toRemove });
    } else trolleyActions.removeItemFromCart({ ...toRemove });
  };
  const handleOnPress = (item) => {
    navigation.push('ItemDetail', {
      product: item,
      title: item.productName,
    });
  };
  const handleCancel = () => {
    navigation.goBack();
  };
  const renderItems = ({ item }) => {
    const { shoppingCart } = props;
    const idx = shoppingCart.findIndex((p) => p.id === item.id);
    let quantity = 0;

    if (idx !== -1) {
      let thisCart = Object.assign({}, shoppingCart[idx]);
      quantity = thisCart.quantity;
    }

    return (
      <TrolleyItem
        type={1}
        item={item}
        quantity={quantity}
        onPress={() => handleOnPress(item)}
        onAddToTrolley={() => handleAddToCart(item)}
        onRemoveFromTrolley={() => handleRemoveFromCart(item)}
      />
    );
  };
  const itemSeparator = () => {
    return <View style={{ height: 4, width: '100%' }} />;
  };
  return (
    <View style={{ flex: 1 }}>
      {/*<Header
        barStyle="dark-content"
        leftComponent={
          <Icon name="close" color="tomato" size={30} onPress={handleCancel} />
        }
        containerStyle={{ backgroundColor: "#fff", justifyContent: "center" }}
        centerComponent={{
          text: title,
          style: {
            color: "tomato",
            fontSize: 18,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />*/}

      <FlatList
        data={productList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
        ItemSeparatorComponent={itemSeparator}
        ListHeaderComponentStyle={{ backgroundColor: '#f8f8fa' }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppingCart: state.shoppingCart,
    products: state.products,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(productsActions, dispatch),
    trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FrontPageScreen);

const styles = StyleSheet.create({});
