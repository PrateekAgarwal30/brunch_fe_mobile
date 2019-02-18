import { combineReducers } from "redux";
import { LOGIN, REGISTER, USER } from "./actions";
const userReducer = (state = { jwtToken: null, err: null, isLoading: false }, action) => {
  switch (action.type) {
    case LOGIN.LOGIN_SENT:
      return {
        ...state,
        jwtToken: null,
        err: null,
        isLoading: true
      };
    case LOGIN.LOGIN_TEXT_CHANGE:
      return {
        ...state,
        err: null
      };
    case LOGIN.LOGIN_FULFILLED:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case LOGIN.LOGIN_REJECTED:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case REGISTER.REGISTER_SENT:
      return {
        ...state,
        jwtToken: null,
        err: null,
        isLoading: true
      };
    case REGISTER.REGISTER_FULFILLED:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case REGISTER.REGISTER_REJECTED:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case USER.CHANGE_PASS_REJECTED: return {
      ...state,
      ...action.payload,
      isLoading: false
    };
    case USER.LOGOUT: return { jwtToken: null, err: null, isLoading: false }
    default:
      console.log(action.type);
      return { ...state };
  }
};
const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER.GET_PROFILE_FULFILLED:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case USER.GET_PROFILE_REJECTED:
      return {
        ...state,
        ...action.payload,
        isLoading: false
      };
    case USER.LOGOUT: return { }
    default:
      console.log(action.type);
      return { ...state };
  }
};
export default reducer = combineReducers({ user: userReducer, profile: profileReducer });