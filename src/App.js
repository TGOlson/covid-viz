import React from 'react';
import {
  HashRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import About from './pages/About';
import Nav from './pages/Nav';
import VizPage from './pages/VizPage';

function App() {
  return (
    <HashRouter basename="/">
      <div style={{ display: 'flex' }}>
        <Nav />
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/global" component={VizPage} />
          <Route path="/united-states" component={VizPage} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
