import React from 'react';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';


import PropTypes from 'prop-types';

import IdSelector from '../components/IdSelector';

const propTypes = {
  // allCountries: PropTypes.arrayOf(PropTypes.string),
  filters: PropTypes.objectOf(PropTypes.bool).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  // allCountries: null,
};

const Left = (props) => {
  const { dispatch, filters } = props;

  // TODO: this assumes country toggle only
  // Eventually need to add state toggle and swap sets on route
  const onFilterToggle = (country) => dispatch({
    type: 'TOGGLE_COUNTRY_FILTER',
    country,
  });

  return (
    <nav id="left-nav">
      <Drawer
        variant="permanent"
        open
        PaperProps={{ style: { width: '240px' } }}
      >
        <Divider style={{ marginTop: '64px', marginRight: '24px' }} />
        <IdSelector filteredIds={filters} onFilterToggle={onFilterToggle} />
      </Drawer>
    </nav>
  );
};

Left.propTypes = propTypes;
Left.defaultProps = defaultProps;

const mapStateToProps = ({ global }) => ({
  allCountries: global.allCountries,
  filters: global.filters,
});

export default connect(mapStateToProps)(Left);
