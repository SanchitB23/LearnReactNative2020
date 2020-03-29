import {ADD_ORDER, GET_ORDERS} from "../../constants/actionTypes";
import Order from "../../models/order";

export const addOrder = (cartItems, totalAmount) => async (dispatch, getState) => {
  const date = new Date();
  const response = await fetch(`https://rn-shopapp-learn-march2020.firebaseio.com/orders/${getState().auth.userId}.json?auth=${getState().auth.token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cartItems,
      totalAmount,
      date: date.toISOString()
    })
  });

  const resData = await response.json();
  dispatch({type: ADD_ORDER, cartItems, totalAmount, id: resData.name, date})
};

export const fetchOrders = () => async (dispatch, getState) => {
  const response = await fetch(`https://rn-shopapp-learn-march2020.firebaseio.com/orders/${getState().auth.userId}.json`);

  const resData = await response.json();
  // console.log("GET PRODUCTS", resData);
  const loadedOrders = [];
  for (const key in resData) {
    if (resData.hasOwnProperty(key))
      loadedOrders.push(new Order(key, resData[key].cartItems, resData[key].totalAmount, new Date(resData[key].date)))
  }
  dispatch({type: GET_ORDERS, payload: loadedOrders})
};
