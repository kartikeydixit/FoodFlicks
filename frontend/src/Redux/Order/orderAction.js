import {
  ADDCART_FAILURE,
  ADDCART_REQUEST,
  ADDCART_SUCCESS,
  GETCART_FAILURE,
  GETCART_REQUEST,
  GETCART_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from "./orderTypes";
import axios from "axios";
export const addcartRequest = () => {
  return {
    type: ADDCART_REQUEST,
  };
};
export const addcartSuccess = (data) => {
  return {
    type: ADDCART_SUCCESS,
    payload: data,
  };
};
export const addcartFailure = (error) => {
  return {
    type: ADDCART_FAILURE,
    payload: error,
  };
};
export const addCart = (itemsDetail) => {
  return (dispatch) => {
    dispatch(addcartRequest);
    axios
      .post("http://localhost:4000/api/v3/additem", itemsDetail, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(addcartSuccess(res.data));
      })
      .catch((error) => {
        dispatch(addcartFailure(error));
      });
  };
};

export const getCartRequest = () => {
  return {
    type: GETCART_REQUEST,
  };
};
export const getCartSuccess = (data) => {
  return {
    type: GETCART_SUCCESS,
    payload: data,
  };
};
export const getCartFailure = (error) => {
  return {
    type: GETCART_FAILURE,
    payload: error,
  };
};
export const getCart = () => {
  return (dispatch) => {
    dispatch(getCartRequest);
    axios
      .get("http://localhost:4000/api/v3/getcart", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch(getCartSuccess(res.data));
      })
      .catch((error) => {
        dispatch(getCartFailure(error));
      });
  };
};

export const getOrderRequest = () => {
  return {
    type: GET_ORDER_REQUEST,
  };
};
export const getOrderSuccess = (data) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: data,
  };
};
export const getOrderFailure = (error) => {
  return {
    type: GET_ORDER_FAILURE,
    payload: error,
  };
};
export const getOrder = () => {
  return (dispatch) => {
    dispatch(getOrderRequest);
    axios
      .get("http://localhost:4000/api/v3/getorders", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch(getOrderSuccess(res.data.order));
      })
      .catch((err) => {
        dispatch(getOrderFailure(err));
      });
  };
};
