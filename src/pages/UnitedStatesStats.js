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

function GlobalOverview(props) {
  const { countries, cases, deaths } = props;

  if (!cases || !deaths) {
    return <p>loading...</p>;
  }

  const filteredCases = cases.filter(({ id }) => countries.includes(id));
  const filteredDeaths = deaths.filter(({ id }) => countries.includes(id));

  return (
    <div>
      <h3>Global Cases</h3>
      <p>Overview of coronavirus cases around the world.</p>
      <LineChart size="large" data={filteredCases} enableLogScale />

      <h3>Global Deaths</h3>
      <p>Overview of coronavirus deaths around the world.</p>
      <LineChart size="large" data={filteredDeaths} enableLogScale />
    </div>
  );
}

GlobalOverview.propTypes = propTypes;
GlobalOverview.defaultProps = defaultProps;

const mapStateToProps = ({ global }) => ({
  cases: global.cases,
  deaths: global.deaths,
  countries: global.filteredCountries,
});

export default connect(mapStateToProps)(GlobalOverview);
