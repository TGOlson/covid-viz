import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import IdSelector from '../components/IdSelector';
import { GLOBAL, US } from '../actions/const';

const propTypes = {
  // allCountries: PropTypes.arrayOf(PropTypes.string),
  // filters: PropTypes.objectOf(PropTypes.bool).isRequired,
  store: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

const defaultProps = {
  // allCountries: null,
};

// TODO: should pass some state around!
// Think this would include hooking react-router into the store
const getNamespace = (path) => {
  switch (path.split('/')[1]) {
    case 'global': return GLOBAL;
    case 'united-states': return US;
    default: return null; // Expected for non-data pages
  }
};

const getReducer = (namespace, store) => {
  switch (namespace) {
    case GLOBAL: return store.global;
    case US: return store.US; // TODO;
    default: throw new Error(`Unexpected match fail 'getReducer': ${namespace}`);
  }
};

const LeftNav = (props) => {
  const { store, dispatch, location } = props;

  // TODO: this is a pretty sketchy way to inspect store state
  const namespace = getNamespace(location.pathname);
  const reducer = namespace && getReducer(namespace, store);
  const { filters, allIds, idGroupings } = reducer || {};

  const onFilterToggle = (id) => dispatch({
    type: `${namespace}_TOGGLE_ID_FILTER`,
    id,
  });

  return (
    <nav id="left-nav">
      <Drawer
        variant="permanent"
        open
        PaperProps={{ style: { width: '240px' } }}
      >
        <Divider style={{ marginTop: '64px', marginRight: '24px' }} />
        <IdSelector
          filteredIds={filters}
          idGroupings={idGroupings}
          onFilterToggle={onFilterToggle}
        />
      </Drawer>
    </nav>
  );
};

LeftNav.propTypes = propTypes;
LeftNav.defaultProps = defaultProps;

const mapStateToProps = (store) => ({ store });

export default withRouter(connect(mapStateToProps)(LeftNav));
