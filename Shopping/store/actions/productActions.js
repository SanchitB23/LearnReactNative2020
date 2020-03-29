import {CREATE_PRODUCT, DELETE_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT} from "../../constants/actionTypes";
import Product from "../../models/product";

export const deleteProduct = (productId) => async dispatch => {
  await fetch(`https://rn-shopapp-learn-march2020.firebaseio.com/products/${productId}.json`, {
    method: 'DELETE',
  });
  dispatch({type: DELETE_PRODUCT, productId})
};

export const createProduct = (title, imageURL, price, description) => async dispatch => {
  const response = await fetch('https://rn-shopapp-learn-march2020.firebaseio.com/products.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      imageURL,
      price
    })
  });

  const resData = await response.json();

  dispatch({
    type: CREATE_PRODUCT, payload: {
      id: resData.name,
      title, imageURL, price, description
    }
  })
};

export const updateProduct = (id, title, imageURL, description) => async dispatch => {
  await fetch(`https://rn-shopapp-learn-march2020.firebaseio.com/products/${id}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      imageURL,
    })
  });

  dispatch({
    type: UPDATE_PRODUCT, payload: {
      id, title, imageURL, description
    }
  })
};

export const fetchProducts = () => async dispatch => {
  const response = await fetch('https://rn-shopapp-learn-march2020.firebaseio.com/products.json');

  const resData = await response.json();
  console.log("GET PRODUCTS", resData);
  const loadedProducts = [];
  for (const key in resData) {
    if (resData.hasOwnProperty(key))
      loadedProducts.push(new Product(key, 'u1', resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
  }
  dispatch({
    type: GET_PRODUCTS,
    payload: loadedProducts
  })
};
