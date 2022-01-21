import { createStore, combineReducers, applyMiddleware } from "redux";
import { canteenByIdReducer, canteensReducer } from "./canteenReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./userReducer";
import { cartReducer, orderReducer } from "./Order/orderReducer";

const rootReducer = combineReducers({
  allCanteens: canteensReducer,
  canteen: canteenByIdReducer,
  user: userReducer,
  cart: cartReducer,
  order: orderReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
