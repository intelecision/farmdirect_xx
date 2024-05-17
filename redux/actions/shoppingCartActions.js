import * as types from "./actionTypes";
import { retrieveItem, removeItem } from "../../utils/localStorage";
import { saveToStore } from "./../../utils/localStorage";

function addItemToCartSuccess(cartItem) {
  return { type: types.ADD_ITEM_TO_CART, cartItem };
}
export function removeItemFromCartSuccess(cartItem) {
  return { type: types.REMOVE_ITEM_FROM_CART, cartItem };
}

function updateCartItemSuccess(cartItem) {
  return { type: types.UPDATE_CART_ITEM_SUCCESS, cartItem };
}

function loadBasketSuccess(cartItems) {
  return { type: types.LOAD_CART_ITEMS_SUCCESS, cartItems };
}

function emptyBasketSuccess([]) {
  return { type: types.EMPTY_BASKET_SUCCESS };
}

export function addItemToCart(cartItem) {
  return function (dispatch) {
    return retrieveItem("BASKET")
      .then((shoppingCart) => {
        if (shoppingCart) {
          shoppingCart.push(cartItem);
        } else {
          shoppingCart = [];
          shoppingCart.push(cartItem);
        }
        saveToStore("BASKET", shoppingCart);

        dispatch(addItemToCartSuccess(cartItem));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function loadBasket() {
  return function (dispatch) {
    return retrieveItem("BASKET")
      .then((shoppingCart) => {
        if (shoppingCart) {
          dispatch(loadBasketSuccess(shoppingCart));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function updateCartItem(cartItem) {
  return function (dispatch) {
    return retrieveItem("BASKET")
      .then((shoppingCart) => {
        if (shoppingCart) {
          var index = shoppingCart.findIndex((x) => x.id == cartItem.id);
          shoppingCart[index] = cartItem;

          saveToStore("BASKET", shoppingCart);

          dispatch(updateCartItemSuccess(cartItem));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function removeItemFromCart(cartItem) {
  return function (dispatch) {
    return retrieveItem("BASKET")
      .then((shoppingCart) => {
        if (shoppingCart) {
          var index = shoppingCart.findIndex((x) => x.id == cartItem.id);
          shoppingCart.splice(index, 1);
          saveToStore("BASKET", shoppingCart);
          dispatch(removeItemFromCartSuccess(cartItem));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function emptyBasket() {
  return function (dispatch) {
    return removeItem("BASKET").then(() => {
      dispatch(emptyBasketSuccess([]));
    });
  };
}

//removeItem()
