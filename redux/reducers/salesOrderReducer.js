import * as types from '../actions/actionTypes';
import initialState from './initialSate';

export default function salesOrderReducer(
  state = initialState.salesOrder,
  action
) {
  switch (action.type) {
    case types.NEW_ORDER_SUCCESS: {
      return action.salesOrder;
    }
    case types.UPDATE_ORDER_SUCCESS: {
      return Object.assign({}, action.salesOrder);
    }
    case types.SAVE_ORDER_SUCCESS: {
      return Object.assign({}, action.salesOrder);
    }
    case types.CLEAR_ORDER_SUCCESS: {
      return Object.assign({}, initialState.salesOrder);
    }
    default:
      return state;
  }
}
