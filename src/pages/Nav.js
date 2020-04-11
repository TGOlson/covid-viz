import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';


import PropTypes from 'prop-types';

import IdSelector from '../components/IdSelector';
import { useStyles } from '../styles';

const propTypes = {
  allCountries: PropTypes.arrayOf(PropTypes.string),
  filteredCountries: PropTypes.objectOf(PropTypes.bool).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  allCountries: null,
};

const Nav = (props) => {
  const { dispatch, filteredCountries, allCountries } = props;
  const classes = useStyles();

  // TODO: this assumes country toggle only
  // Eventually need to add state toggle and swap sets on route
  const onFilterToggle = (country) => dispatch({
    type: 'TOGGLE_COUNTRY_FILTER',
    country,
  });

  return (
    <div>
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" style={{ flex: 'auto' }}>Covid Dashboard</Typography>
          <div>
            <Button color="inherit" component={Link} to="/">About</Button>
            <Button color="inherit" component={Link} to="/global">Global</Button>
            <Button color="inherit" component={Link} to="/united-states">United States</Button>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <Divider style={{ marginTop: '64px' }} />
          <IdSelector filteredIds={filteredCountries} onFilterToggle={onFilterToggle} />
        </Drawer>
      </nav>
    </div>
  );
};

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;

const mapStateToProps = ({ global }) => ({
  allCountries: global.allCountries,
  filteredCountries: global.filteredCountries,
});

export default connect(mapStateToProps)(Nav);
