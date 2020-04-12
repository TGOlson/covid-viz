import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

import './index.css';

import {
  fetchGlobalCases, fetchGlobalDeaths, fetchGlobalDeathsTimestamp, fetchGlobalCasesTimestamp,
} from './actions/global';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

Promise.all([
  store.dispatch(fetchGlobalCases()),
  store.dispatch(fetchGlobalDeaths()),
  store.dispatch(fetchGlobalDeathsTimestamp()),
  store.dispatch(fetchGlobalCasesTimestamp()),
]).then(() => store.dispatch({
  type: 'GLOBAL_DATA_LOADED',
}));
