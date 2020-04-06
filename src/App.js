import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Container } from '@material-ui/core';

import './App.css';

import GlobalOverview from './pages/GlobalOverview';
import UnitedStatesOverview from './pages/UnitedStatesOverview';
import NavBar from './components/NavBar';

function App() {
  return (
    <HashRouter basename="/">
      <Container maxWidth="md">
        <NavBar />
        <Route exact path="/" component={GlobalOverview} />
        <Route path="/united-states" component={UnitedStatesOverview} />
      </Container>
    </HashRouter>
  );
}
export default App;
