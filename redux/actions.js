export const LOGIN = {
  LOGIN_SENT: "LOGIN_SENT",
  LOGIN_FULFILLED: "LOGIN_FULFILLED",
  LOGIN_REJECTED: "LOGIN_REJECTED",
  LOGIN_TEXT_CHANGE: "LOGIN_TEXT_CHANGE"
};
export const REGISTER = {
  REGISTER_SENT: "REGISTER_SENT",
  REGISTER_FULFILLED: "REGISTER_FULFILLED",
  REGISTER_REJECTED: "REGISTER_REJECTED"
};
export const USER = {
  GET_PROFILE_SENT: "GET_PROFILE_SENT",
  GET_PROFILE_FULFILLED: "GET_PROFILE_FULFILLED",
  GET_PROFILE_REJECTED: "GET_PROFILE_REJECTED",
  CHANGE_PASS_SENT: "CHANGE_PASS_SENT",
  CHANGE_PASS_FULFILLED: "CHANGE_PASS_FULFILLED",
  CHANGE_PASS_REJECTED: "CHANGE_PASS_REJECTED",
  LOGOUT: "LOGOUT"
};
import { ipAddress } from "../constants";
import _ from 'lodash';
export const textChange = () => dispatch => {
  dispatch({ type: LOGIN.LOGIN_TEXT_CHANGE });
}
export const login = (email, password) => dispatch => {
  dispatch({ type: LOGIN.LOGIN_SENT });
  let jwtToken = null;
  return fetch(ipAddress + "/api/auth", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email, password: password }) // body data type must match "Content-Type" header
  })
    .then(res => {
      jwtToken = res.headers.get("x-auth-token");
      return res.json();
    })
    .then(res => {
      console.log(res, jwtToken);
      if (res._status === "success") {
        dispatch({
          type: LOGIN.LOGIN_FULFILLED,
          payload: { jwtToken: jwtToken }
        });
      } else {
        dispatch({
          type: LOGIN.LOGIN_REJECTED,
          payload: { err: res._message }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
export const register = (email, password) => dispatch => {
  dispatch({ type: REGISTER.REGISTER_SENT });
  let jwtToken = null;
  return fetch(ipAddress + "/api/register", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email, password: password }) // body data type must match "Content-Type" header
  })
    .then(res => {
      jwtToken = res.headers.get("x-auth-token");
      return res.json();
    })
    .then(res => {
      console.log(res, jwtToken);
      if (res._status === "success") {
        dispatch({
          type: REGISTER.REGISTER_FULFILLED,
          payload: { jwtToken: jwtToken }
        });
      } else {
        dispatch({
          type: REGISTER.REGISTER_REJECTED,
          payload: { err: res._message }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const getProfile = (jwtToken) => dispatch => {
  console.log("Token", jwtToken);
  dispatch({ type: USER.GET_PROFILE_SENT });
  return fetch(ipAddress + "/api/me", {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": jwtToken
    }
    // body data type must match "Content-Type" header
  }).then(res => res.json())
    .then(res => {
      console.log(res);
      if (res._status === "success") {
        dispatch({
          type: USER.GET_PROFILE_FULFILLED,
          payload: _.pick(res._data, ['email', 'details.email', 'addresses'])
        });
      } else {
        dispatch({
          type: USER.GET_PROFILE_REJECTED,
          payload: { err: res._message }
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};


export const changePassword = (oldp, confirmp, newp, jwtToken) => dispatch => {
  dispatch({ type: USER.CHANGE_PASS_SENT });
  return fetch(ipAddress + "/api/auth/change_password", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": jwtToken
    },
    body: JSON.stringify({ oldp: oldp, confirmp: confirmp, newp: newp }) // body data type must match "Content-Type" header
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res._status === "success") {
        dispatch({
          type: USER.CHANGE_PASS_FULFILLED
        });
        return "Password Change Succesfully"
      } else {
        dispatch({
          type: USER.CHANGE_PASS_REJECTED,
          payload: { err: res._message }
        });
        return "Change Password Failed"
      }
    })
    .catch(err => {
      console.log(err);
    });
};
export const logOut = () => dispatch => {
  dispatch({ type: USER.LOGOUT });
};