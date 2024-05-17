import * as types from "./../actions/actionTypes";
import initialState from "./initialSate";

export default function ShoppingCartReducer(
  state = initialState.cartItems,
  action
) {
  switch (action.type) {
    case types.LOAD_CART_ITEMS_SUCCESS:
      return action.cartItems;
    case types.ADD_ITEM_TO_CART:
      return [...state, { ...action.cartItem }];
    case types.EMPTY_BASKET_SUCCESS:
      return [];
    case types.REMOVE_ITEM_FROM_CART:
      return state.filter((cartItems) => cartItems.id !== action.cartItem.id);
    case types.UPDATE_CART_ITEM_SUCCESS:
      return state.map((item, index) => {
        if (item.id === action.cartItem.id) {
          return Object.assign({}, action.cartItem);
        }
        return item;
      });

    default:
      return state;
  }
}
