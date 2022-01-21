import {
  FETCH_LOGIN_FAILURE,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGOUT_USER,
} from "./userTypes";

const userState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  error: "",
};

export const userReducer = (state = userState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        error: "",
      };
    case FETCH_LOGIN_FAILURE:
    case LOAD_USER_FAILURE:
      return {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        lodaing: false,
        isAuthenticated: false,
        user: {},
        error: "",
      };
    default:
      return state;
  }
};
