import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import About from './pages/About';
import LeftNav from './pages/LeftNav';
import VizPage from './pages/VizPage';

import NavBar from './components/NavBar';

function App() {
  return (
    <HashRouter basename="/">
      <div style={{ display: 'flex' }}>
        <NavBar />
        <LeftNav />
        <Route exact path="/" component={About} />
        <Route path="/global" component={VizPage} />
        <Route path="/united-states" component={VizPage} />
      </div>
    </HashRouter>
  );
}

export default App;
