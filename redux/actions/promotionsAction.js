import * as types from './actionTypes';
//import ProductsApi from "../../Api/mockProducts";
import {
  getAllProducts,
  getPromotionProducts,
} from '../../Api/services/productServices';

function loadPromotionsSuccess(promotions) {
  return { type: types.LOAD_PROMOTION_SUCCESS, promotions };
}
export function loadPromotions() {
  return function (dispatch) {
    return getPromotionProducts()
      .then((products) => {
        dispatch(loadPromotionsSuccess(products));
      })
      .catch((error) => {
        throw error;
      });
  };
}

const getPromotions = (prod) => {
  return prod.inPromotion === true;
};
