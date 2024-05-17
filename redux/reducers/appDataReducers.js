import * as types from "../actions/actionTypes";
import initialState from "./initialSate";

export default function AppDataReducer(state = initialState.appData, action) {
  switch (action.type) {
    case types.UPDATE_APP_DATA:
      return { ...state };
    case types.REMOVE_APP_DATA:
      return action.appData;

    default:
      return state;
  }
}
