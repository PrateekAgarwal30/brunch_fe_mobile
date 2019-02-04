import { combineReducers } from "redux";
import { LOGIN, REGISTER, PROFILE } from "./actions";
const userReducer = (state = { jwtToken: null, err: null, isLoading: true }, action) => {
  switch (action.type) {
    case LOGIN.LOGIN_SENT:
      return {
        ...state,
        jwtToken: null,
        err: null
      };
    case LOGIN.LOGIN_FULFILLED:
      return {
        ...state,
        ...action.payload
      };
    case LOGIN.LOGIN_REJECTED:
      return {
        ...state,
        ...action.payload
      };
    case REGISTER.REGISTER_SENT:
      return {
        ...state,
        jwtToken: null,
        err: null
      };
    case REGISTER.REGISTER_FULFILLED:
      return {
        ...state,
        ...action.payload
      };
    case REGISTER.REGISTER_REJECTED:
      return {
        ...state,
        ...action.payload
      };
    default:
      console.log(action.type);
      return { ...state };
  }
};
const profileReducer = (state = { jwtToken: null, err: null, isLoading: true }, action) => {
  switch (action.type) {
    case PROFILE.GET_PROFILE_FULFILLED:
      return {
        ...state,
        ...action.payload
      };
    case PROFILE.GET_PROFILE_REJECTED:
      return {
        ...state,
        ...action.payload
      };
    default:
      console.log(action.type);
      return { ...state };
  }
};
export default reducer = combineReducers({ user: userReducer, profile: profileReducer });