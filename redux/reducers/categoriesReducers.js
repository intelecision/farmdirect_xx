import * as types from "../actions/actionTypes";
import initialState from "./initialSate";

export default function ProductCategoryReducer(
  state = initialState.categories,
  action
) {
  switch (action.type) {
    case types.LOAD_CATEGORY_SUCCESS:
      return action.categories;

    default:
      return state;
  }
}
