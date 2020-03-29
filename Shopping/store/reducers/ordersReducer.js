import {ADD_ORDER, GET_ORDERS} from "../../constants/actionTypes";
import Order from "../../models/order";

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  const {cartItems, totalAmount} = action;
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
          action.id,
          cartItems,
          totalAmount,
          action.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
    case GET_ORDERS:
      return {orders: action.payload};
    default:
      return state
  }
}
