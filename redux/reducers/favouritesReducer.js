import * as types from "../actions/actionTypes";
import initialState from "./initialSate";

export default function favouritesReducer(
  state = initialState.favourites,
  action
) {
  switch (action.type) {
    case types.LOAD_FAVOURITES_SUCCESS: {
      return action.favourites;
    }
    //case types.SAVE_FAVOURITES_SUCCESS:
    //  return Object.assign({}, action.favourites);
    case types.ADD_FAVOURITES_SUCCESS:
      return [...state, { ...action.favourite }];
    case types.REMOVE_FAVOURITES_SUCCESS:
      return state.filter(
        (favourites) => favourites.id !== action.favourite.id
      );
    default:
      return state;
  }
}
