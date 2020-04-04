import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './reducer'

import './index.css';
import App from './App';

import {fetchGlobalCases} from './actions/global'

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    logger
  )
)

ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

store.dispatch(fetchGlobalCases())
