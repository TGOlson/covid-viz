import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import LeftNav from './pages/LeftNav';
import About from './pages/About';
import GlobalOverview from './pages/GlobalOverview';
import UnitedStatesOverview from './pages/UnitedStatesOverview';

import NavBar from './components/NavBar';
import RightNav from './components/RightNav';

function App() {
  return (
    <HashRouter basename="/">
      <div style={{ display: 'flex' }}>
        <NavBar />
        <LeftNav />
        <main style={{ marginTop: '70px' }}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <Route exact path="/" component={About} />
              <Route exact path="/global" component={GlobalOverview} />
              <Route path="/united-states" component={UnitedStatesOverview} />
            </Grid>
            <Grid id="right-nav" item xs={2}>
              <RightNav />
            </Grid>
          </Grid>
        </main>
      </div>
    </HashRouter>
  );
}


export default App;
