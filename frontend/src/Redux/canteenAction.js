import axios from "axios";
import {
  FETCH_CANTEENS_FAILURE,
  FETCH_CANTEENS_REQUEST,
  FETCH_CANTEENS_SUCCESS,
  FETCH_CANTEEN_FAILURE_BY_ID,
  FETCH_CANTEEN_REQUEST_BY_ID,
  FETCH_CANTEEN_SUCCESS_BY_ID,
} from "./canteenTypes";

// Fetch All Canteens
export const fetchCanteensRequest = () => {
  return {
    type: FETCH_CANTEENS_REQUEST,
  };
};
export const fetchCanteensSuccess = (canteens) => {
  return {
    type: FETCH_CANTEENS_SUCCESS,
    payload: canteens,
  };
};
export const fetchCanteensFailure = (error) => {
  return {
    type: FETCH_CANTEENS_FAILURE,
    payload: error,
  };
};
export const fetchCanteens = () => {
  return (dispatch) => {
    dispatch(fetchCanteensRequest);
    axios
      .get("http://localhost:4000/api/v1/canteens")
      .then((res) => {
        dispatch(fetchCanteensSuccess(res.data));
      })
      .catch((error) => {
        dispatch(fetchCanteensFailure(error.message));
      });
  };
};

// Fetch a Canteen By ID
export const fetchCanteenRequestById = () => {
  return {
    type: FETCH_CANTEEN_REQUEST_BY_ID,
  };
};
export const fetchCanteenSuccessById = (canteen) => {
  return {
    type: FETCH_CANTEEN_SUCCESS_BY_ID,
    payload: canteen,
  };
};
export const fetchCanteenFailureById = (error) => {
  return {
    type: FETCH_CANTEEN_FAILURE_BY_ID,
    payload: error,
  };
};
export const fetchCanteenById = (id) => {
  return (dispatch) => {
    dispatch(fetchCanteenRequestById);
    axios
      .get(`http://localhost:4000/api/v1/canteen/${id}`)
      .then((res) => {
        dispatch(fetchCanteenSuccessById(res.data));
      })
      .catch((error) => {
        dispatch(fetchCanteenFailureById(error));
      });
  };
};
