import {AUTHENTICATE, LOGOUT} from "../../constants/actionTypes";
import {firebaseKey} from "../../constants/keys";
import {AsyncStorage} from "react-native";

const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseKey}`;
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseKey}`;
let timer;
export const signUp = (email, password) => async dispatch => {
  const res = await fetch(signUpUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    })
  });

  const resData = await res.json();
  const {idToken, localId, expiresIn} = resData;
  dispatch(authenticate(localId, idToken, parseInt(expiresIn) * 1000));
  const expiryDate = new Date(new Date().getTime() + (parseInt(expiresIn) * 1000));
  saveDataToStorage(idToken, localId, expiryDate.toISOString())
};

export const login = (email, password) => async dispatch => {
  const res = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true
    })
  });
  const resData = await res.json();
  const {idToken, localId, expiresIn} = resData;
  dispatch(authenticate(localId, idToken, parseInt(expiresIn) * 1000));
  const expiryDate = new Date(new Date().getTime() + (parseInt(expiresIn) * 1000));
  saveDataToStorage(idToken, localId, expiryDate.toISOString())
};

export const authenticate = (userId, token, expiration) => dispatch => {
  dispatch(setLogoutTimer(expiration));
  dispatch({type: AUTHENTICATE, userId, token})
};

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token, userId, expiryDate
  })).then(() => console.log("User Data saved to sync")).catch((e) => console.error("User Data Error", e))
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT}
};

const clearLogoutTimer = () => {
  if (timer) clearTimeout(timer)
};

const setLogoutTimer = (expiration) => dispatch => {
  timer = setTimeout(() => {
    dispatch(logout())
  }, expiration)
};
