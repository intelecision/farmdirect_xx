import * as types from './../actions/actionTypes';
//import ProductsApi from "../../Api/mockProducts";
import { getAllProducts } from './../../Api/services/productServices';

function loadProductsSuccess(products) {
  return { type: types.LOAD_PRODUCTS_SUCCESS, products };
}

// thunk middleware implementation
export function loadProducts() {
  return function (dispatch) {
    return getAllProducts()
      .then((products) => {
        dispatch(loadProductsSuccess(products));
      })
      .catch((error) => {
        throw error;
      });
  };
}
