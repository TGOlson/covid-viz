import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import About from './pages/About';
import GlobalOverview from './pages/GlobalOverview';
import LeftNav from './pages/LeftNav';
import UnitedStatesOverview from './pages/UnitedStatesOverview';

import NavBar from './components/NavBar';
import RightNav from './components/RightNav';

import { spec } from './data-specs/global';
import { toNavSpec } from './data-specs/utils';

function App() {
  return (
    <HashRouter basename="/">
      <div style={{ display: 'flex' }}>
        <NavBar />
        <LeftNav />
        <Route exact path="/" component={About} />
        <Route path="/global" component={GlobalOverview} />
        <Route path="/united-states" component={UnitedStatesOverview} />
        <RightNav base="/global" spec={toNavSpec(spec)} />
      </div>
    </HashRouter>
  );
}


export default App;
