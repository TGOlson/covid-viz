import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import { globalReducer, usReducer } from './reducers/reducer';
import { GLOBAL, US } from './actions/const';

const reducer = combineReducers({
  [GLOBAL]: globalReducer,
  [US]: usReducer,
});

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    logger,
  ),
);
