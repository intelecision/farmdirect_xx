import React, { useEffect, useState, memo } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from '@rneui/themed';
import TrolleyItem from './components/TrolleyItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as shoppingCartActions from './../redux/actions/shoppingCartActions';
import * as favouriteActions from '../redux/actions/productsActions';
import * as productsActions from '../redux/actions/favouritesActions';
import FavouritesFooter from './components/FavouritesFooter';

const FavouritesScreen = memo(({ route, navigation, ...props }) => {
  const [count, setCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const {
    products,
    shoppingCart,
    favourites,
    actionFavourite,
    trolleyActions,
    actionProducts,
  } = props;

  useEffect(() => {
    //if (favourites.length === 0) actionFavourite.loadFavourites();
    setCount(favourites.length);

    let totalAmt = favourites.reduce((total, currentValue) => {
      return total + currentValue.price;
    }, 0);
    setTotalAmount(totalAmt);
    syncFavourites(favourites);
    if (products.length === 0) {
      actionProducts.loadProducts().catch((error) => {
        logErrors('failed to load product', error);
      });
    }

    return () => {};
  }, [count, favourites]);

  const syncFavourites = (data) => {
    // loop thru prod and find
    let syncFavourites = [];
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      let found = products.find((p) => p.id === item.id);

      syncFavourites.push(found);
    }
  };

  const handleAddToCart = (id) => {
    const newProduct = products.find((p) => p.id === id);
    const idx = shoppingCart.findIndex((p) => p.id === id);

    if (idx === -1) {
      trolleyActions.addItemToCart({
        quantity: 1,
        totalPrice: newProduct.isOnSale ? product.salePrice : newProduct.price,
        ...newProduct,
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
    calculateTrolleySummary();
  };
  const calculateTrolleySummary = () => {};
  const handleRemoveFromCart = (id) => {
    const idx = shoppingCart.findIndex((p) => p.id === id);
    let toRemove = Object.assign({}, shoppingCart[idx]);
    toRemove.quantity -= 1;

    if (toRemove.quantity > 0) {
      let totalPrice = toRemove.quantity * toRemove.price;
      toRemove.totalPrice = totalPrice;
      trolleyActions.updateCartItem({ ...toRemove });
    } else trolleyActions.removeItemFromCart({ ...toRemove });
    calculateTrolleySummary();
  };
  const handleAddAll = () => {
    //
  };

  const handleOnPress = (item) => {
    navigation.navigate('ItemDetail', {
      product: item,
      title: item.productName,
    });
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
        key={item.id.toString()}
        type={2}
        item={item}
        quantity={quantity}
        onPress={() => handleOnPress(item)}
        onAddToTrolley={() => handleAddToCart(item.id)}
        onRemoveFromTrolley={() => handleRemoveFromCart(item.id)}
      />
    );
  };

  const itemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          marginTop: 6,
          backgroundColor: '#f8f8fa',
          width: '100%',
        }}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={favourites}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
          ListHeaderComponentStyle={{
            backgroundColor: '#f8f8fa',
          }}
          ItemSeparatorComponent={itemSeparator}
        />
      </View>
      <View
        style={{
          height: 80,
          justifyContent: 'flex-end',
          backgroundColor: 'white',
          borderBottomWidth: 0.25,
          borderTopWidth: 0.5,
          borderColor: '#f8f8f8',
          borderTopColor: '#ddd',
        }}
      >
        <View
          style={{
            flex: 1,
            padding: 10,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              width: '55%',

              justifyContent: 'space-evenly',
            }}
          >
            <Text>
              Items:
              <Text style={{ fontWeight: '700' }}> {favourites.length}</Text>
            </Text>

            <Text>
              Total: <Text style={{ fontWeight: '700' }}>GH₵{totalAmount}</Text>
            </Text>
          </View>
          <Button
            title={'Add all'}
            buttonStyle={{
              width: 180,
              paddingRight: 10,
              backgroundColor: 'tomato',
              height: 50,
            }}
            containerStyle={{
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            onPress={() => handleAddAll()}
          />
        </View>
      </View>
    </View>
  );
});

function mapStateToProps(state) {
  return {
    shoppingCart: state.shoppingCart,
    products: state.products,
    authorization: state.authorization,
    favourites: state.favourites,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    trolleyActions: bindActionCreators(shoppingCartActions, dispatch),
    actionFavourite: bindActionCreators(favouriteActions, dispatch),
    actionProducts: bindActionCreators(productsActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesScreen);

const styles = StyleSheet.create({});
