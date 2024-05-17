import * as types from "../actions/actionTypes";
import initialState from "./initialSate";

export default function deliveryAddressReducer(
  state = initialState.deliveryAddress,
  action
) {
  switch (action.type) {
    case types.LOAD_DELIVERY_ADDRESS_SUCCESS: {
      return action.deliveryAddress;
    }
    case types.SAVE_DELIVERY_ADDRESS_SUCCESS:
      return Object.assign({}, action.deliveryAddress);
    default:
      return state;
  }
}
