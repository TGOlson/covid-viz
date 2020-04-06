import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, Button, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import IdSelector from './IdSelector';

const propTypes = {
  allCountries: PropTypes.arrayOf(PropTypes.string),
  filteredCountries: PropTypes.objectOf(PropTypes.bool).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  allCountries: null,
};

const NavBar = (props) => {
  const { dispatch, filteredCountries, allCountries } = props;

  // TODO: this assumes country toggle only
  // Eventually need to add state toggle and swap sets on route
  const onFilterToggle = (country) => dispatch({
    type: 'TOGGLE_COUNTRY_FILTER',
    country,
  });

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography variant="h6" style={{ flex: 'auto' }}>Covid Dashboard</Typography>
        <div>
          <Button color="inherit" component={Link} to="/">Global</Button>
          <Button color="inherit" component={Link} to="/united-states">United States</Button>
        </div>
      </Toolbar>
      <IdSelector
        filteredCountries={filteredCountries}
        allCountries={allCountries}
        onFilterToggle={onFilterToggle}
      />
    </AppBar>
  );
};

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

const mapStateToProps = ({ global }) => ({
  allCountries: global.allCountries,
  filteredCountries: global.filteredCountries,
});

export default connect(mapStateToProps)(NavBar);
