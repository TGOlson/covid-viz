import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const NavBar = () => (
  <AppBar position="fixed" color="default" id="top-nav">
    <Toolbar>
      <Typography variant="h6" style={{ flex: 'auto' }}>Covid Dashboard</Typography>
      <div>
        <Button color="inherit" component={Link} to="/">About</Button>
        <Button color="inherit" component={Link} to="/global">Global</Button>
        <Button color="inherit" component={Link} to="/united-states">United States</Button>
      </div>
    </Toolbar>
  </AppBar>
);
// <Button color="inherit" component={Link} to="/experiments">Experiments</Button>

export default NavBar;
