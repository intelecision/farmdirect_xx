import * as types from "./actionTypes";
import { getAllSubCategories } from "../../Api/services/categoryServices";

function loadSubCategoriesSuccess(subCategories) {
  return { type: types.LOAD_SUB_CATEGORY_SUCCESS, subCategories };
}

// thunk middleware implementation
export function loadSubCategories() {
  return function(dispatch) {
    return getAllSubCategories()
      .then(data => {
        dispatch(loadSubCategoriesSuccess(data));
      })
      .catch(error => {
        throw error;
      });
  };
}
