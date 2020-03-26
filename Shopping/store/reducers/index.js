import {combineReducers} from "redux";
import products from "./productReducer";
import cart from "./cartReducer";

export default combineReducers({
  products,
  cart
})
