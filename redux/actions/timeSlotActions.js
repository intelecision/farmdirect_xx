import * as types from "./actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDays, getTime } from "date-fns";
import { removeItem } from "./../../utils/localStorage";

function loadTimeSlotSuccess(timeSlot) {
  return { type: types.LOAD_TIMESLOT_SUCCESS, timeSlot };
}

function updateTimeSlotSuccess(timeSlot) {
  return { type: types.SAVE_TIMESLOT_SUCCESS, timeSlot };
}

function clearTimeSlotSuccess(timeSlot) {
  return { type: types.CLEAR_TIMESLOT_SUCCESS, timeSlot };
}

export function updateTimeSlot(timeSlot) {
  return function (dispatch) {
    return saveLocalToStore("TIME_SLOT", timeSlot)
      .then(() => {
        dispatch(updateTimeSlotSuccess(timeSlot));
      })
      .catch((err) => {
        throw err;
      });
  };
}

export function clearTimeSlot(timeSlot) {
  return function (dispatch) {
    return removeItem("TIME_SLOT", timeSlot)
      .then(() => {
        dispatch(clearTimeSlotSuccess(timeSlot));
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
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const saveTimeSlot = (data) => (dispatch) =>
  AsyncStorage.setItem("TIME_SLOT", data)
    .then((data) => {
      dispatch(updateTimeSlotSuccess(data));
    })
    .catch((err) => {
      dispatch(loading(false));
      dispatch(error(err.message || "ERROR"));
    });

export function loadTimeSlot() {
  return function (dispatch) {
    return retrieveItem("TIME_SLOT")
      .then((data) => {
        if (data) {
          const validDate = ValidateDate(new Date(data.date));
          if (!validDate) {
            data = { date: undefined, slot: undefined, deliveryCost: 0 };
          }
          dispatch(loadTimeSlotSuccess(data));
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function saveSlot(data) {
  saveLocalToStore("TIME_SLOT", data);
  return function (dispatch) {
    dispatch(updateTimeSlotSuccess(data)).catch((err) => {
      dispatch(error(err.message || "ERROR"));
    });
  };
}

function ValidateDate(slotDate) {
  tomorrow = addDays(new Date(), 1);
  if (slotDate) {
    thisDate = new Date(slotDate);
    if (getTime(thisDate) >= getTime(tomorrow)) {
      return true;
    }
  }
  return false;
}
