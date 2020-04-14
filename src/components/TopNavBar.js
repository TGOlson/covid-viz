import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const propTypes = {
  showMenuIcon: PropTypes.bool,
  onMenuToggle: PropTypes.func.isRequired,
};

const defaultProps = {
  showMenuIcon: false,
};


const TopNavBar = ({ showMenuIcon, onMenuToggle }) => (
  <AppBar position="fixed" color="default" id="top-nav">
    <Toolbar>
      {showMenuIcon ? (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuToggle}
        >
          <MenuIcon />
        </IconButton>
      ) : null}
      <div style={{ flex: 'auto' }} />
      <Button color="inherit" component={NavLink} activeClassName="active" to="/united-states">United States</Button>
      <Button color="inherit" component={NavLink} activeClassName="active" to="/global">Global</Button>
      <Button color="inherit" component={NavLink} activeClassName="active" to="/">About</Button>
    </Toolbar>
  </AppBar>
);
// <Button color="inherit" component={Link} to="/experiments">Experiments</Button>

TopNavBar.propTypes = propTypes;
TopNavBar.defaultProps = defaultProps;

export default TopNavBar;
