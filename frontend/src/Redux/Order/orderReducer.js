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

const cartState = {
  loading: false,
  cart: {},
  error: "",
};

export const cartReducer = (state = cartState, action) => {
  switch (action.type) {
    case ADDCART_REQUEST:
    case GETCART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDCART_SUCCESS:
    case GETCART_SUCCESS:
      return {
        loading: false,
        cart: action.payload,
        error: "",
      };
    case ADDCART_FAILURE:
    case GETCART_FAILURE:
      return {
        loading: "",
        cart: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

const orderState = {
  loading: false,
  order: {},
  error: "",
};

export const orderReducer = (state = orderState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
        error: "",
      };
    case GET_ORDER_FAILURE:
      return {
        loading: false,
        order: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
