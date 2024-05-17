import * as types from '../actions/actionTypes';
import initialState from './initialSate';

export default function pendingDeliveriesReducer(
  state = initialState.pendingDeliveries,
  action
) {
  //
  switch (action.type) {
    case types.LOAD_USER_DELIVERIES_SUCCESS: {
      return action.pendingDeliveries;
    }
    default:
      return state;
  }
}
