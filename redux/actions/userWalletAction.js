import { farmDirectApi } from '../../Api/services/FarmDirectApi';
import * as types from './actionTypes';

function loadUserWalletSuccess(userWallet) {
  return {
    type: types.LOAD_USER_WALLET_SUCCESS,
    userWallet,
  };
}

// thunk middleware implementation
export function loadUserWallet(userId) {
  return function (dispatch) {
    return farmDirectApi
      .loadUserPayMethods(userId)
      .then((data) => {
        dispatch(loadUserWalletSuccess(data));
      })
      .catch((error) => {
        console.log('loadUserPaymentMethod Error:', error);
      });
  };
}
