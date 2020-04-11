import React from 'react';
import { HashRouter, Route } from 'react-router-dom';


import './App.css';

import { useStyles } from './styles';

import Nav from './pages/Nav';
import About from './pages/About';
import GlobalOverview from './pages/GlobalOverview';
import UnitedStatesOverview from './pages/UnitedStatesOverview';

function App() {
  const classes = useStyles();

  return (
    <HashRouter basename="/">
      <div style={{ display: 'flex' }}>
        <Nav />
        <main style={{ marginTop: '70px' }}>
          <Route exact path="/" component={About} />
          <Route exact path="/global" component={GlobalOverview} />
          <Route path="/united-states" component={UnitedStatesOverview} />
        </main>
      </div>
    </HashRouter>
  );
}
export default App;
