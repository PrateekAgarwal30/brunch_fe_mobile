export const LOGIN_SENT = "LOGIN_SENT";
export const LOGIN_FULFILLED = "LOGIN_FULFILLED";
export const LOGIN_REJECTED = "LOGIN_REJECTED";
import { ipAddress } from "../constants";
export const login = (email, password) => dispatch => {
    dispatch({ type: LOGIN_SENT });
    let jwtToken = null;
    fetch(ipAddress + "/api/auth", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password: password }) // body data type must match "Content-Type" header
    })
        .then(res => {
            jwtToken = res.headers.get('x-auth-token');
            return res.json()
        })
        .then(res => {
            console.log(res, jwtToken)
            if (res._status === "success") {
                dispatch({
                    type: LOGIN_FULFILLED,
                    payload: { jwtToken: jwtToken }
                })
            } else {
                dispatch({
                    type: LOGIN_REJECTED,
                    payload: { err: res._message }
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
};
