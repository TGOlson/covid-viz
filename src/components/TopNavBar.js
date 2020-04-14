import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const TopNavBar = () => (
  <AppBar position="fixed" color="default" id="top-nav">
    <Toolbar>
      <div style={{
        display: 'flex',
        flex: 'auto',
        flexDirection: 'row-reverse',
      }}
      >
        <Button color="inherit" component={NavLink} activeClassName="active" to="/united-states">United States</Button>
        <Button color="inherit" component={NavLink} activeClassName="active" to="/global">Global</Button>
        <Button color="inherit" component={NavLink} activeClassName="active" to="/">About</Button>
      </div>
    </Toolbar>
  </AppBar>
);
// <Button color="inherit" component={Link} to="/experiments">Experiments</Button>

export default TopNavBar;
