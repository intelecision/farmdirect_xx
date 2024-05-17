import * as types from "./../actions/actionTypes";
import initialState from "./initialSate";

export default function timeSlotReducer(state = initialState.timeSlot, action) {
  switch (action.type) {
    case types.LOAD_TIMESLOT_SUCCESS:
      return action.timeSlot;
    case types.SAVE_TIMESLOT_SUCCESS:
      return Object.assign({}, action.timeSlot);
    case types.CLEAR_TIMESLOT_SUCCESS:
      return Object.assign({}, initialState.timeSlot);
    default:
      return state;
  }
}
