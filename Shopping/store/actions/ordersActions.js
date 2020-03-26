import {ADD_ORDER} from "../../constants/actionTypes";

export const addOrder = (cartItems, totalAmount) => {
  return {type: ADD_ORDER, cartItems, totalAmount}
};
