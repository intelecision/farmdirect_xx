import { farmDirectApi } from '../../Api/services/FarmDirectApi';
import * as types from './actionTypes';

function loadUserPendingDeliveriesSuccess(pendingDeliveries) {

  return { type: types.LOAD_USER_DELIVERIES_SUCCESS, pendingDeliveries };
}

// thunk middleware implementation
export function loadUserPendingDeliveriesXX(userId) {
  return async function (dispatch) {
    try {
      const deliveries = await farmDirectApi.loadPendingDeliveries(userId);

      dispatch(loadUserPendingDeliveriesSuccess(deliveries));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

// thunk middleware implementation
export function loadUserPendingDeliveries(userId) {
  return function (dispatch) {
    return farmDirectApi
      .loadPendingDeliveries(userId)
      .then((deliveries) => {
        dispatch(loadUserPendingDeliveriesSuccess(deliveries));
      })
      .catch((error) => {
        throw error;
      });
  };
}
