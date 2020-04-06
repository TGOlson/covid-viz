import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ChartData } from '../propTypes';
import LineChart from '../components/LineChart';

const propTypes = {
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  cases: ChartData,
  deaths: ChartData,
};

const defaultProps = {
  cases: null,
  deaths: null,
};

function UnitedStateOverview(props) {
  return (
    <p>US overview here</p>
  );
}

UnitedStateOverview.propTypes = propTypes;
UnitedStateOverview.defaultProps = defaultProps;

const mapStateToProps = ({ global }) => ({
  cases: global.cases,
  deaths: global.deaths,
  countries: global.filteredCountries,
});

export default connect(mapStateToProps)(UnitedStateOverview);
