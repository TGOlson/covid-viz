import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import './index.css';

import { fetchGlobalCases, fetchGlobalDeaths } from './actions/global';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

Promise.all([
  store.dispatch(fetchGlobalCases()),
  store.dispatch(fetchGlobalDeaths()),
]).then(() => store.dispatch({
  type: 'GLOBAL_DATA_LOADED',
}));
