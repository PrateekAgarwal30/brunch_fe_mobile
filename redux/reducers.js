import { combineReducers } from "redux";
import { LOGIN, REGISTER, USER,PROFILE } from "./actions";
const userReducer = (state = { err: null, isLoading: false }, action) => {
  switch (action.type) {
    case LOGIN.LOGIN_SENT:
      return {
        ...state,
        ...action.payload,
        err: null
      };
    case LOGIN.LOGIN_TEXT_CHANGE:
      return {
        ...state,
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
        ...payload,
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
    case USER.GET_PROFILE_SENT:
      return {
        ...state,
        ...action.payload
      };
    case USER.GET_PROFILE_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case USER.GET_PROFILE_REJECTED:
      return {
        ...state,
        ...action.payload
      };
    case USER.CHANGE_PASS_SENT: return {
      ...state,
      ...action.payload
    };
    case USER.CHANGE_PASS_REJECTED: return {
      ...state,
      ...action.payload
    };
    case USER.CHANGE_PASS_FULFILLED: return {
      ...state,
      ...action.payload
    };
    case PROFILE.UPDATE_PROFILE_SENT: return {
      ...state,
      ...action.payload
    };
    case PROFILE.UPDATE_PROFILE_REJECTED: return {
      ...state,
      ...action.payload
    };
    case PROFILE.UPDATE_PROFILE_FULFILLED: return {
      ...state,
      ...action.payload
    };
    case USER.LOGOUT_SENT: return {
      ...state,
      ...action.payload
    };
    case USER.LOGOUT_FULFILLED: return {
      ...state,
      ...action.payload
    };
    case USER.LOGOUT_REJECTED: return {
      ...state,
      ...action.payload
    };
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
        ...action.payload
      };
    case USER.LOGOUT_FULFILLED: return {}
    default:
      console.log(action.type);
      return { ...state };
  }
};
export default reducer = combineReducers({ user: userReducer, profile: profileReducer });