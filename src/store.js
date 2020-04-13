import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers/reducer';

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    logger,
  ),
);
