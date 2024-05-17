import * as types from "./actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

function loadDeliveryAddressSuccess(deliveryAddress) {
  return { type: types.LOAD_DELIVERY_ADDRESS_SUCCESS, deliveryAddress };
}

function updateDeliveryAddressSuccess(deliveryAddress) {
  return { type: types.SAVE_DELIVERY_ADDRESS_SUCCESS, deliveryAddress };
}

export function loadDeliveryAddress() {
  return function (dispatch) {
    return retrieveItem("DELIVER_TO")
      .then((data) => {
        dispatch(loadDeliveryAddressSuccess(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function updateDeliveryAddress(deliveryAddress) {
  return function (dispatch) {
    return saveLocalToStore("DELIVER_TO", deliveryAddress)
      .then(() => {
        dispatch(updateDeliveryAddressSuccess(deliveryAddress));
      })
      .catch((err) => {
        throw err;
      });
  };
}

const retrieveItem = async (key) => {
  try {
    const retrievedItem = await AsyncStorage.getItem(key);
    const item = JSON.parse(retrievedItem);
    return item;
  } catch (error) {}
  return;
};

const saveLocalToStore = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    const stored = await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
