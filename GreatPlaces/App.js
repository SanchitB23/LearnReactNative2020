import React from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlacesNavigator from './routes/PlacesNavigator';
import placesReducer from './store/PlacesReducer';
import {init} from "./Db";

init().then(() => {
  console.log("DB Yay")
}).catch(error => {
  console.log("DB Fail");
  console.log(error)
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
      <Provider store={store}>
        <PlacesNavigator/>
      </Provider>
  );
}
