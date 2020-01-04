import { AsyncStorage } from "react-native";
import { ipAddress } from "../constants";
import _ from 'lodash';

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
export const PROFILE = {
  UPDATE_PROFILE_SENT: "UPDATE_PROFILE_SENT",
  UPDATE_PROFILE_FULFILLED: "UPDATE_PROFILE_FULFILLED",
  UPDATE_PROFILE_REJECTED: "UPDATE_PROFILE_REJECTED",
  GET_TP_ADDRESSES_SENT: "GET_TP_ADDRESSES_SENT",
  GET_TP_ADDRESSES_FULFILLED: "GET_TP_ADDRESSES_FULFILLED",
  GET_TP_ADDRESSES_REJECTED: "GET_TP_ADDRESSES_REJECTED",
};
export const USER = {
  GET_PROFILE_SENT: "GET_PROFILE_SENT",
  GET_PROFILE_FULFILLED: "GET_PROFILE_FULFILLED",
  GET_PROFILE_REJECTED: "GET_PROFILE_REJECTED",
  CHANGE_PASS_SENT: "CHANGE_PASS_SENT",
  CHANGE_PASS_FULFILLED: "CHANGE_PASS_FULFILLED",
  CHANGE_PASS_REJECTED: "CHANGE_PASS_REJECTED",
  LOGOUT_SENT: "LOGOUT_SENT",
  LOGOUT_FULFILLED: "LOGOUT_FULFILLED",
  LOGOUT_REJECTED: "LOGOUT_REJECTED",
};

export const textChange = () => dispatch => {
  dispatch({ type: LOGIN.LOGIN_TEXT_CHANGE });
}

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: LOGIN.LOGIN_SENT, payload: { isLoading: true } });
    let jwtToken = null;
    const res = await fetch(ipAddress + "/api/auth", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password }) // body data type must match "Content-Type" header
    });
    jwtToken = res.headers.get("x-auth-token");
    const result = await res.json();
    if (result._status === "success") {
      await AsyncStorage.setItem('authToken', jwtToken);
      dispatch({
        type: LOGIN.LOGIN_FULFILLED,
        payload: { isLoading: false }
      });
    } else {
      dispatch({
        type: LOGIN.LOGIN_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error.message)
  }
};
export const register = (email, password) => async dispatch => {
  try {
    dispatch({ type: REGISTER.REGISTER_SENT, payload: { isLoading: true } });
    let jwtToken = null;
    const res = await fetch(ipAddress + "/api/register", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password }) // body data type must match "Content-Type" header
    });
    jwtToken = res.headers.get("x-auth-token");
    const result = await res.json();
    if (result._status === "success") {
      await AsyncStorage.setItem('authToken', jwtToken);
      dispatch({
        type: REGISTER.REGISTER_FULFILLED,
        payload: { isLoading: false }
      });
    } else {
      dispatch({
        type: REGISTER.REGISTER_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
    }
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error.message)
  }

};

export const getProfile = () => async dispatch => {
  try {
    const jwtToken = await AsyncStorage.getItem("authToken");
    dispatch({
      type: USER.GET_PROFILE_SENT, payload: {
        isLoading: true
      }
    });
    const res = await fetch(ipAddress + "/api/me", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      }
    })
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: USER.GET_PROFILE_FULFILLED,
        payload: result._data
      });
    } else {
      dispatch({
        type: USER.GET_PROFILE_REJECTED,
        payload: { err: result._message,isLoading:false }
      });
    }
  } catch (error) {
    return Promise.reject(error.message)
  }
};


export const changePassword = (oldp, confirmp, newp) => async dispatch => {
  try {
    dispatch({ type: USER.CHANGE_PASS_SENT, payload: { isLoading: true,err:null} });
    const jwtToken = await AsyncStorage.getItem('authToken');
    const res = await fetch(ipAddress + "/api/auth/change_password", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      },
      body: JSON.stringify({ oldp: oldp, confirmp: confirmp, newp: newp }) // body data type must match "Content-Type" header
    })
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: USER.CHANGE_PASS_FULFILLED,
        payload: { isLoading: false }
      });
      return "Password Change Succesfully"
    } else {
      dispatch({
        type: USER.CHANGE_PASS_REJECTED,
        payload: { err: result._message,isLoading:false}
      });
      return "Change Password Failed"
    }
  } catch (error) {
    return Promise.reject(error.message)
  }

};
export const logOut = () => async dispatch => {
  try {
    dispatch({ type: USER.LOGOUT_SENT, payload: { err: null, isLoading: true } });
    await AsyncStorage.clear();
    dispatch({ type: USER.LOGOUT_FULFILLED, payload: { err: null,isLoading: false }  });
    return Promise.resolve();
  } catch (error) {
    dispatch({ type: USER.LOGOUT_REJECTED, payload: { err: null,isLoading: false }});
    return Promise.reject(error.message);
  }
};
export const updateProfile = (Obj) => async dispatch => {
  try {
    dispatch({ type: PROFILE.UPDATE_PROFILE_SENT, payload: { isLoading: true, err: null } });
    const jwtToken = await AsyncStorage.getItem('authToken');
    const res = await fetch(ipAddress + "/api/me/details", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      },
      body: JSON.stringify(Obj) // body data type must match "Content-Type" header
    })
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: PROFILE.UPDATE_PROFILE_FULFILLED,
        payload: { isLoading: false }
      });
      return Promise.resolve("Details Updated successfully!"); 
    } else {
      dispatch({
        type: PROFILE.UPDATE_PROFILE_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
      return Promise.resolve("Details Update Failed.Try Later...")
    }
    
  } catch (error) {
    return Promise.reject(error.message)
  }
};


export const getTechAddresses = () => async dispatch => {
  try {
    const jwtToken = await AsyncStorage.getItem("authToken");
    dispatch({
      type: PROFILE.GET_TP_ADDRESSES_SENT, payload: {
        isLoading: true
      }
    });
    const res = await fetch(ipAddress + "/api/tech_address", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwtToken
      }
    })
    const result = await res.json();
    if (result._status === "success") {
      dispatch({
        type: PROFILE.GET_TP_ADDRESSES_FULFILLED,
        payload: result._data
      });
      return Promise.resolve("FULFILLED");
    } else {
      dispatch({
        type: PROFILE.GET_TP_ADDRESSES_REJECTED,
        payload: { err: result._message, isLoading: false }
      });
      return Promise.resolve("REJECTED");
    }
  } catch (error) {
    return Promise.reject(error.message)
  }
};