import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PromotionItem from './PromotionItem';
import { createPaymentIntent } from '../../Api/services/stripeApi';
import { useCallback } from 'react';
import { loadPromotions } from '../../redux/actions/promotionsAction';
import { addToFavourites } from '../../redux/actions/favouritesActions';

import { loadProducts } from './../../redux/actions/productsActions';
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItem,
} from '../../redux/actions/shoppingCartActions';
const PromotionScreen = () => {
  const promotions = useSelector((state) => state.promotions);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const promotionsCallback = useCallback(() => {
    dispatch(loadPromotions());
  }, [dispatch]);

  useEffect(() => {
    // if (products?.length === 0)
    loadProductsCallback();
    //  if (promotions?.length === 0)
    promotionsCallback();
  }, []);

  const handleText = async () => {
    const result = await createPaymentIntent('card', 'GBP', 2000);
  };
  const loadProductsCallback = useCallback(() => {
    dispatch(loadProducts());
  }, []);

  const addToCartCallback = useCallback((item) => {
    dispatch(addItemToCart(item));
  }, []);
  const updateCartCallback = useCallback((item) => {
    dispatch(updateCartItem(item));
  }, []);

  const removeFromCartCallback = useCallback((item) => {
    dispatch(removeItemFromCart(item));
  }, []);

  const handleAddToCart = (id) => {
    const product = products.find((p) => p.id === id);

    const idx = shoppingCart.findIndex((p) => p.id === id);
    if (idx === -1) {
      addToCartCallback({
        quantity: 1,
        totalPrice: product?.isOnSale ? product.salePrice : product?.price,
        ...product,
      });
    } else {
      let update = Object.assign({}, shoppingCart[idx]);
      update.quantity += 1;
      update.totalPrice = update.isOnSale
        ? update.quantity * update.salePrice
        : update.quantity * update.price;

      updateCartCallback({ ...update });
    }
  };
  const handleRemoveFromCart = (id) => {
    const idx = shoppingCart.findIndex((p) => p.id === id);
    let toRemove = Object.assign({}, shoppingCart[idx]);
    toRemove.quantity -= 1;
    if (toRemove.quantity > 0) {
      updateCartCallback({ ...toRemove });
    } else removeFromCartCallback({ ...toRemove });
  };

  const renderProduct = ({ item }) => {
    return (
      <View style={{ margin: 6 }} key={item.id}>
        {/*<TouchableOpacity onPress={() => handleText()}>*/}
        <PromotionItem
          product={item}
          badgeMessage={item.badgeMessage}
          onAddPress={() => handleAddToCart(item.id)}
          onRemovePress={() => handleRemoveFromCart(item.id)}
        />
        {/*</TouchableOpacity>*/}
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#f2e4e1' }}>
      <View>
        <FlatList
          contentContainerStyle={
            {
              //padding: 10,
              //  backgroundColor: "#f2e4e1",
            }
          }
          keyExtractor={(item) => item.id.toString()}
          data={promotions}
          renderItem={renderProduct}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator color={'tomato'} />
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PromotionScreen;

const styles = StyleSheet.create({});
