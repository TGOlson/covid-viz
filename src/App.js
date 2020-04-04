import React from 'react';
import { HashRouter, Route, Link } from "react-router-dom";

import './App.css';

import GlobalOverview from './pages/GlobalOverview';
import Details from './pages/Details';

function App() {
  return (
    <HashRouter basename='/'>
      <div>
        <ul>
          <li><Link to="/">GlobalOverview</Link></li>
          <li><Link to="/details">Details</Link></li>
        </ul>
      <hr />
      <Route exact path="/" component={GlobalOverview} />
      <Route path="/details" component={Details} />
      </div>
   </HashRouter>
  );
}
export default App;
