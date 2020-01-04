import { combineReducers } from "redux";
import { LOGIN, REGISTER, USER, PROFILE } from "./actions";
const initialState = { err: null, isLoading: false };
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN.LOGIN_SENT:
    case REGISTER.REGISTER_SENT:
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
    case USER.GET_PROFILE_FULFILLED:
    case PROFILE.GET_TP_ADDRESSES_FULFILLED:
      return {
        ...state,
        isLoading: false
      };
    case USER.GET_PROFILE_REJECTED:
    case PROFILE.GET_TP_ADDRESSES_SENT:
    case REGISTER.REGISTER_FULFILLED:
    case REGISTER.REGISTER_REJECTED:
    case USER.GET_PROFILE_SENT:
    case LOGIN.LOGIN_FULFILLED:
    case LOGIN.LOGIN_REJECTED:
    case PROFILE.GET_TP_ADDRESSES_REJECTED:
    case USER.CHANGE_PASS_SENT:
    case USER.CHANGE_PASS_REJECTED:
    case USER.CHANGE_PASS_FULFILLED:
    case PROFILE.UPDATE_PROFILE_SENT:
    case PROFILE.UPDATE_PROFILE_REJECTED:
    case PROFILE.UPDATE_PROFILE_FULFILLED:
    case PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_SENT:
    case PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_REJECTED:
    case PROFILE.SAVE_OFFICE_ADDRESS_FOR_USER_FULFILLED:
    case USER.LOGOUT_SENT:
    case USER.LOGOUT_FULFILLED:
    case USER.LOGOUT_REJECTED:
      return {
        ...state,
        ...action.payload
      };
    default:
      // console.log(action.type);
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
    case PROFILE.GET_TP_ADDRESSES_FULFILLED:
      return {
        ...state,
        tech_addresses: action.payload
      };
    case USER.LOGOUT_FULFILLED:
      return {};
    default:
      // console.log(action.type);
      return { ...state };
  }
};
const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer
});
export default reducer;
