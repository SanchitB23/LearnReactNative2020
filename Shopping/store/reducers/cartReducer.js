import {ADD_ORDER, ADD_TO_CART, REMOVE_FROM_CART} from "../../constants/actionTypes";
import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;
      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
            state.items[addedProduct.id].quantity + 1,
            prodPrice,
            prodTitle,
            state.items[addedProduct.id].sum + prodPrice
        );
        return {
          ...state,
          items: {...state.items, [addedProduct.id]: updatedCartItem},
          totalAmount: state.totalAmount + prodPrice
        }
      } else {
        const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        return {
          ...state,
          items: {...state.items, [addedProduct.id]: newCartItem},
          totalAmount: state.totalAmount + prodPrice
        }
      }
    case REMOVE_FROM_CART:
      const currentOty = state.items[action.payload].quality;
      let updatedCartItems;
      if (currentOty > 1) {
        const updatedCartItem = new CartItem(
            state.items[action.payload].quality - 1,
            state.items[action.payload].productPrice,
            state.items[action.payload].productTitle,
            state.items[action.payload].sum - state.items[action.payload].productPrice);
        updatedCartItems = {...state.items, [action.payload]: updatedCartItem}
      } else {
        updatedCartItems = {...state.items};
        delete updatedCartItems[action.payload]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - state.items[action.payload].productPrice
      };
    case ADD_ORDER:
      return initialState;
    default :
      return state
  }
}
