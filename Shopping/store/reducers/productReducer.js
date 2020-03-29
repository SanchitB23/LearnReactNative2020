import {CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT} from "../../constants/actionTypes";
import Product from "../../models/product";

const initialState = {
  availableProducts: [],
  userProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.productId),
        availableProducts: state.availableProducts.filter(product => product.id !== action.productId)
      };
    case CREATE_PRODUCT:
      const newProd = new Product(action.payload.id, action.payload.ownerId, action.payload.title, action.payload.imageURL, action.payload.description, action.payload.price);
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProd),
        userProducts: state.userProducts.concat(newProd)
      };
    case UPDATE_PRODUCT:
      const prodIndex = state.userProducts.findIndex(prod => prod.id === action.payload.id);
      const updatedProd = new Product(action.payload.id, state.userProducts[prodIndex].index, action.payload.title, action.payload.imageURL, action.payload.description, state.userProducts[prodIndex].price);
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[prodIndex] = updatedProd;
      const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.payload.id);
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProd;
      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updatedAvailableProducts

      };
    case GET_PRODUCTS:
      return {
        availableProducts: action.payload.loadedProducts,
        userProducts: action.payload.userProducts
      };
    default:
      return state
  }
}
