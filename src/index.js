import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import './index.css';

import App from './App';

import { fetchGlobalCases, fetchGlobalDeaths } from './actions/global';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

store.dispatch(fetchGlobalCases());
store.dispatch(fetchGlobalDeaths());
