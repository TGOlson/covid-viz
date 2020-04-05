import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';

import './App.css';

import GlobalStats from './pages/GlobalStats';
import UnitedStatesStats from './pages/UnitedStatesStats';

function App() {
  return (
    <HashRouter basename="/">
      <div>
        <ul>
          <li><Link to="/">Global</Link></li>
          <li><Link to="/unitedstates">United States</Link></li>
        </ul>
        <hr />
        <Route exact path="/" component={GlobalStats} />
        <Route path="/unitedstates" component={UnitedStatesStats} />
      </div>
    </HashRouter>
  );
}
export default App;
