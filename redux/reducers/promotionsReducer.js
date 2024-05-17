import * as types from '../actions/actionTypes';
import initialState from './initialSate';

export default function promotionsReducer(
  state = initialState.promotions,
  action
) {
  switch (action.type) {
    case types.LOAD_PROMOTION_SUCCESS: {
      return action.promotions;
    }

    default:
      return state;
  }
}
