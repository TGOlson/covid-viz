import React from 'react';
import { HashRouter, Route, Link } from "react-router-dom";

import './App.css';

import Overview from './pages/Overview';
import Details from './pages/Details';

function App() {
  return (
    <HashRouter basename='/'>
      <div>
        <ul>
          <li><Link to="/">Overview</Link></li>
          <li><Link to="/details">Details</Link></li>
        </ul>
      <hr />
      <Route exact path="/" component={Overview} />
      <Route path="/details" component={Details} />
      </div>
   </HashRouter>
  );
}
export default App;
