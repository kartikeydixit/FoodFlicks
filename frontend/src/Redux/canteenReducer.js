import {
  FETCH_CANTEENS_FAILURE,
  FETCH_CANTEENS_REQUEST,
  FETCH_CANTEENS_SUCCESS,
  FETCH_CANTEEN_FAILURE_BY_ID,
  FETCH_CANTEEN_REQUEST_BY_ID,
  FETCH_CANTEEN_SUCCESS_BY_ID,
} from "./canteenTypes";

const intialCanteensState = {
  loading: false,
  canteens: [],
  error: "",
};

export const canteensReducer = (state = intialCanteensState, action) => {
  switch (action.type) {
    case FETCH_CANTEENS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CANTEENS_SUCCESS:
      return {
        loading: false,
        canteens: action.payload,
        error: "",
      };
    case FETCH_CANTEENS_FAILURE:
      return {
        loading: false,
        canteens: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const initalCanteenByIdState = {
  loading: false,
  canteen: {},
  error: "",
};

export const canteenByIdReducer = (state = initalCanteenByIdState, action) => {
  switch (action.type) {
    case FETCH_CANTEEN_REQUEST_BY_ID:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CANTEEN_SUCCESS_BY_ID:
      return {
        loading: false,
        canteen: action.payload,
        error: "",
      };
    case FETCH_CANTEEN_FAILURE_BY_ID:
      return {
        loading: false,
        canteen: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
