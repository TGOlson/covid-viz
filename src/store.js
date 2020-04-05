import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import globalReducer from './reducers/global';

const reducer = combineReducers({
  global: globalReducer,
});

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    logger,
  ),
);
