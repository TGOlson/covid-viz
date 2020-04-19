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

// TODO: should probably only fetch on specific page load
store.dispatch(fetchGlobalData());
store.dispatch(fetchUSData());
