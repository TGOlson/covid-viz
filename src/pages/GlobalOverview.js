import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GenericOverview from '../components/GenericOverview';

import { Reducer } from '../propTypes';
import { spec, defaultChartId } from '../data-specs/global';

const propTypes = {
  reducer: Reducer.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const getChartId = (pathname) => pathname.split('/')[2] || defaultChartId;

const GlobalOverview = (props) => {
  const {
    reducer,
    location,
    dispatch,
  } = props;

  const chartId = getChartId(location.pathname);

  // TODO: should actually route to default when no match
  const chartSpec = spec[chartId] || spec[defaultChartId];

  return (
    <GenericOverview
      reducer={reducer}
      chartSpec={chartSpec}
      chartId={chartId}
      namespace="global"
      dispatch={dispatch}
    />
  );
};

GlobalOverview.propTypes = propTypes;

const mapStateToProps = ({ global }) => ({ reducer: global });

export default connect(mapStateToProps)(GlobalOverview);
