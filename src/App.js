import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import About from './pages/About';
import GlobalOverview from './pages/GlobalOverview';
import LeftNav from './pages/LeftNav';
import UnitedStatesOverview from './pages/UnitedStatesOverview';

import NavBar from './components/NavBar';

function App() {
  return (
    <HashRouter basename="/">
      <div style={{ display: 'flex' }}>
        <NavBar />
        <LeftNav />
        <Route exact path="/" component={About} />
        <Route path="/global" component={GlobalOverview} />
        <Route path="/united-states" component={UnitedStatesOverview} />
      </div>
    </HashRouter>
  );
}


export default App;
