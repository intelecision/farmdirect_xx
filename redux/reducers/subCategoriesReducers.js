import * as types from "../actions/actionTypes";
import initialState from "./initialSate";

export default function ProductSubCategoryReducer(
  state = initialState.subCategories,
  action
) {
  switch (action.type) {
    case types.LOAD_SUB_CATEGORY_SUCCESS:
      return action.subCategories;

    default:
      return state;
  }
}
