import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import './index.css';

import { fetchGlobalData, fetchUSData } from './actions';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

store.dispatch(fetchGlobalData()).then(() => store.dispatch({
  type: 'GLOBAL_DATA_LOADED',
}));

store.dispatch(fetchUSData()).then(() => store.dispatch({
  type: 'US_DATA_LOADED',
}));
