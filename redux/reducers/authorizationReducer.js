import * as types from "../actions/actionTypes";
import initialState from "./initialSate";
import { isEmpty } from "lodash";

export default function authorizationReducer(
  state = initialState.authorization,
  action
) {
  switch (action.type) {
    case types.LOAD_USER_INFO_SUCCESS:
      return {
        isAuthorized: hasTokenNotExpired(action.authorization.userInfo),
        userInfo: action.authorization.userInfo
      };
    case types.LOGGED_IN_SUCCESS:

      return {
        isAuthorized: hasTokenNotExpired(action.authorization.userInfo),
        userInfo: action.authorization.userInfo
      };
    case types.LOGGED_OUT_SUCCESS:
      return action.authorization;
    default:
      return state;
  }
}

hasTokenNotExpired = user => {
  if (user) {
    const tokenExpiry = new Date(user.tokenExpiry);
    const today = new Date();
    return tokenExpiry.getTime() > today.getTime();
  }
  return false;
};
