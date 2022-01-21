import axios from "axios";
import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER,
} from "./userTypes";

export const fetchLoginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST,
  };
};

export const fetchLoginSuccess = (data) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: data,
  };
};

export const fetchLoginFailure = (error) => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: error,
  };
};

export const fetchLogin = (user) => {
  return (dispatch) => {
    dispatch(fetchLoginRequest);
    axios
      .post("http://localhost:4000/api/v2/user/login", user)
      .then((res) => {
        dispatch(fetchLoginSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchLoginFailure(error));
      });
  };
};

export const loadUserRequest = () => {
  return {
    type: LOAD_USER_REQUEST,
  };
};

export const loadUserSuccess = (data) => {
  return {
    type: LOAD_USER_SUCCESS,
    payload: data,
  };
};

export const loadUserFailure = (error) => {
  return {
    type: LOAD_USER_FAILURE,
    payload: error,
  };
};

export const loadUser = () => {
  return (dispatch) => {
    dispatch(loadUserRequest);
    axios
      .get("http://localhost:4000/api/v2/me", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data.error) {
          dispatch(loadUserFailure(res.data.error));
        } else {
          dispatch(loadUserSuccess(res.data));
        }
      })
      .catch((error) => {
        dispatch(loadUserFailure(error));
      });
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
