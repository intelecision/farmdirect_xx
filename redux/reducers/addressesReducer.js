import * as types from "../actions/actionTypes";
import initialState from "./initialSate";

export default function addressesReducer(
  state = initialState.addresses,
  action
) {
  switch (action.type) {
    case types.LOAD_ADDRESSES_SUCCESS:
      return action.addresses;
    case types.SAVE_ADDRESS_SUCCESSES: {
      return Object.assign([], action.addresses);
    }
    default:
      return state;
  }
}
