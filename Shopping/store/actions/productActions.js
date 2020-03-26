import {CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from "../../constants/actionTypes";

export const deleteProduct = (productId) => {
  return {type: DELETE_PRODUCT, productId}
};
export const createProduct = (title, imageURL, price, description) => {
  console.log("action", price);
  return {
    type: CREATE_PRODUCT, payload: {
      title, imageURL, price, description
    }
  }
};
export const updateProduct = (id, title, imageURL, description) => {
  return {
    type: UPDATE_PRODUCT, payload: {
      id, title, imageURL, description
    }
  }
};
