import {
  Alert,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { connect } from "react-redux";

import { loadProducts } from "../../redux/actions/productsActions";
import {
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
} from "../../redux/actions/shoppingCartActions";

import { loadCategories } from "../../redux/actions/categoryActions";
import Stepper from "../components/Stepper";
import { greenTomatoes } from "../../constants/colours";
//import { isEmpty } from "lodash";
import CantFindProduct from "./CantFindProduct";
//import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

import TrolleyItem from "./TrolleyItem";
import ProductCard from "./ProductCard";
import { useNavigation } from "@react-navigation/native";

const ProductSearch = ({ query,...props }) => {
  const [suggestedText, onChangeSuggestedText] = useState("");
  const { products, shoppingCart, addItemToCart, updateCartItem } = props;
const navigation =useNavigation();

  const handleAddToCart = (id) => {
    const product = products.find((p) => p.id === id);

    const idx = shoppingCart.findIndex((p) => p.id === id);
    if (idx === -1) {
      addItemToCart({
        quantity: 1,
        totalPrice: product.isOnSale ? product.salePrice : product.price,
        ...product,
      });
    } else {
      let update = Object.assign({}, shoppingCart[idx]);
      update.quantity += 1;
      let totalPrice = update.quantity * update.price;
      update.totalPrice = totalPrice;
      updateCartItem({ ...update });
    }
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

  const handleNavigation = (item) => {

    navigation.navigate("ItemDetail", {
      product: item,
      title: item.productName,
    });
  };
  //const renderItems111 = ({ item }) => {
  //  const { shoppingCart } = props;
  //  const imageSource =
  //    "http://otuofarms.com/farmdirect/images/" + item.imageUri;

  //  const idx = shoppingCart.findIndex((p) => p.id === item.id);
  //  let quantity = 0;

  //  if (idx !== -1) {
  //    let thisCart = Object.assign({}, shoppingCart[idx]);
  //    quantity = thisCart.quantity;
  //  }

  //  const isEmpty = (aString) => {
  //    if (aString) return true;
  //    else return false;
  //  };
  //  const showBadge = !isEmpty(item.badgeMessage);

  //  return (
  //    <TouchableOpacity
  //      onPress={onItemPress}
  //      onPress={() =>
  //        navigation.navigate("ItemDetail", {
  //          product: item,
  //          title: item.productName,
  //        })
  //      }
  //    >
  //      <View
  //        style={{
  //          flexDirection: "row",
  //          justifyContent: "flex-start",
  //          width: "100%",
  //          height: 195,
  //        }}
  //      >
  //        <View>
  //          <Image
  //            style={{
  //              flex: 1,
  //              width: 150,
  //              height: null,
  //              paddingBottom: 10,
  //              resizeMode: "cover",
  //            }}
  //            source={{ uri: imageSource }}
  //          />
  //          {showBadge ? (
  //            <View
  //              style={{
  //                justifyContent: "center",
  //                alignItems: "center",
  //                position: "absolute",
  //                backgroundColor: greenTomatoes,
  //                height: 22,
  //                width: "80%",
  //                left: 0,
  //                right: 0,
  //                bottom: 0,
  //                zIndex: 1000,
  //              }}
  //            >
  //              <Text
  //                style={{
  //                  fontSize: 11,
  //                  color: "white",
  //                  textAlign: "center",
  //                }}
  //              >
  //                {item.badgeMessage}
  //              </Text>
  //            </View>
  //          ) : (
  //            <View />
  //          )}
  //        </View>
  //        <View
  //          style={{
  //            flex: 2,
  //            flexDirection: "column",
  //            paddingLeft: 10,
  //          }}
  //        >
  //          <View style={{ flex: 3 }}>
  //            <Text
  //              style={{
  //                textAlign: "left",
  //                fontSize: 16,
  //                fontWeight: "700",
  //                marginLeft: 5,
  //                marginTop: 10,
  //              }}
  //            >
  //              {item.productName}
  //            </Text>
  //            <Text style={{ color: "#204B24" }}>{item.farm.farmName}</Text>
  //            <Text style={{ marginTop: 10 }}> {item.productSize}</Text>
  //          </View>
  //          <View
  //            style={{
  //              flex: 1,
  //              paddingBottom: 10,
  //              paddingRight: 10,
  //              alignContent: "flex-end",
  //            }}
  //          >
  //            <Stepper
  //              onAdd={() => handleAddToCart(item.id)}
  //              onRemove={() => handleRemoveFromCart(item.id)}
  //              quantity={quantity}
  //              price={item.price}
  //              salePrice={item.salePrice}
  //              isOnSale={item.isOnSale}
  //              pricePerMeasure={0}
  //              inStock={item.inStock}
  //            />
  //          </View>
  //        </View>
  //      </View>
  //    </TouchableOpacity>
  //  );
  //};

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
        item={item}
        quantity={quantity}
        onPress={() => handleOnPress(item)}
        onAddToTrolley={() => handleAddToCart(item.id)}
        onRemoveFromTrolley={() => handleRemoveFromCart(item.id)}
      />
    );
  };
  itemSeparator = () => {
    return (
      <View style={{ height: 4, backgroundColor: "#f8f8f8", width: "100%" }} />
    );
  };

  const handleOnPress = (item) => {
    navigation.navigate("ItemDetail", {
      product: item,
      title: item.productName,
    });
  };

  //submitSuggestion = () => {
  //  let data = JSON.stringify({
  //    itemName: suggestionText,
  //    useName: "tester",
  //  });

  //  axios
  //    .post(
  //      "http://www.otuofarms.com/farmdirect/api/suggestedItems/",
  //      {
  //        itemName: suggestionText,
  //        useName: "tester",
  //      },
  //      {
  //        headers: {
  //          "Content-Type": "application/json",
  //        },
  //      }
  //    )
  //    .then((response) => {
  //      console.log(response);
  //    })
  //    .catch((error) => {
  //      console.log(error);
  //    });
  //};

  const filteredProducts = products.filter((p) =>
    p.productName?.toLowerCase().includes(query)
  );

  const handleSuggestion = () => {
    const { authorization } = props;

    if (authorization && authorization.userInfo) {
      axios
        .post(
          "http://www.otuofarms.com/farmdirect/api/SuggestedItems/",
          {
            itemName: suggestedText,
            userId: authorization.userInfo.id,
            email: authorization.userInfo.username,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response && response.status === 200) {
            Alert.alert(
              "Thanks for suggesting!",
              "Farm Direct will notify you soon as the item becomes available in stock",
              [
                {
                  text: "OK",
                  onPress: () => console.log("OK Pressed"),
                },
              ]
            );
          }
        })
        .catch((err) => {
          console.log(err);
          //  throw err;
        });
    }
    //lear after suggestion
    onChangeSuggestedText("");
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <KeyboardAvoidingView behavior="padding" enabled>
        <FlatList
          data={filteredProducts}
          // numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={renderItems}
          ItemSeparatorComponent={itemSeparator}
          ListFooterComponent={
            <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
              <CantFindProduct
                suggestion={suggestedText}
                suggestionChange={(text) => onChangeSuggestedText(text)}
                onSuggest={() => handleSuggestion()}
              />
            </View>
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
};

function mapStateToProps(state) {
  return {
    shoppingCart: state.shoppingCart,
    products: state.products,
    categories: state.categories,
    authorization: state.authorization,
  };
}

const mapDispatchToProps = {
  loadProducts,
  loadCategories,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch);
