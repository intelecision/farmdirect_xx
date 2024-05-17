import * as types from '../actions/actionTypes';
import initialState from './initialSate';

export default function UserWalletReducer(
  state = initialState.userWallet,
  action
) {
  switch (action.type) {
    case types.LOAD_USER_WALLET_SUCCESS: {
      console.log('LOAD_USER_WALLET', userWallet);
      return action.userWallet;
      break;
    }
    case types.SAVE_USER_WALLET:
      return Object.assign({}, action.userWallet);

    default:
      return state;
  }
}
