import {combineReducers} from "redux";
import products from "./productReducer";
import cart from "./cartReducer";
import orders from "./ordersReducer";

export default combineReducers({
  products,
  cart,
  orders
})
