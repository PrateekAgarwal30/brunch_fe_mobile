import { combineReducers } from "redux";
import { LOGIN_FULFILLED, LOGIN_SENT, LOGIN_REJECTED,REGISTER_SENT,REGISTER_FULFILLED,REGISTER_REJECTED } from "./actions";
const userReducer = (state = { jwtToken: null }, action) => {
  switch (action.type) {
    case LOGIN_SENT:
      return {
        ...state,
        jwtToken: null,
        err: null
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        ...action.payload
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        ...action.payload
      };
    case REGISTER_SENT:
      return {
        ...state,
        jwtToken: null,
        err: null
      };
    case REGISTER_FULFILLED:
      return {
        ...state,
        ...action.payload
      };
    case REGISTER_REJECTED:
      return {
        ...state,
        ...action.payload
      };
    default:
      console.log(action.type);
      return { ...state };
  }
};

export default (reducer = combineReducers({
  user: userReducer
}));
