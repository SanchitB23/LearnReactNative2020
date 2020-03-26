import {ADD_ORDER} from "../../constants/actionTypes";
import Order from "../../models/order";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  const {cartItems, totalAmount} = action;
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
          new Date().toString(),
          cartItems,
          totalAmount,
          new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    default:
      return state
  }
}
