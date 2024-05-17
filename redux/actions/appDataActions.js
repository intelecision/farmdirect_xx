import * as types from "./actionTypes";
import { saveToStore, retrieveItem } from "../../utils/localStorage";
export function addAppData(dataItem) {
  return { type: types.ADD_APP_DATA, dataItem };
}

export function loadAppData() {
  return { type: types.LOAD_APP_DATA_SUCCESS, dataItem };
}

export function updateAppData(dataItem) {
  //saveToStore(dataItem.key,dataItem.data)
  // retrieveItem(dataItem.Key)
  return { type: types.UPDATE_APP_DATA, dataItem };
}
