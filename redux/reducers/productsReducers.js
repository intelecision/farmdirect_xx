import * as types from '../actions/actionTypes';
import initialState from './initialSate';

export default function productsReducer(state = initialState.products, action) {
  switch (action.type) {
    case types.LOAD_PRODUCTS_SUCCESS:
      return action.products;

    default:
      return state;
  }
}
