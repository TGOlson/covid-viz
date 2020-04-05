import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ChartData } from '../propTypes';
import CountrySelector from '../components/CountrySelector';
import LineChart from '../components/LineChart';

const propTypes = {
  allCountries: PropTypes.arrayOf(PropTypes.string),
  filteredCountries: PropTypes.objectOf(PropTypes.bool).isRequired,
  cases: ChartData,
  deaths: ChartData,
  dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
  allCountries: null,
  cases: null,
  deaths: null,
};

function GlobalOverview(props) {
  const {
    allCountries, filteredCountries, cases, deaths,
  } = props;

  if (!cases || !deaths) {
    return <p>loading...</p>;
  }

  const filteredCases = cases.filter(({ id }) => filteredCountries[id]);
  const filteredDeaths = deaths.filter(({ id }) => filteredCountries[id]);

  const onFilterToggle = (country) => props.dispatch({
    type: 'TOGGLE_COUNTRY_FILTER',
    country,
  });

  return (
    <div>
      <CountrySelector
        filteredCountries={filteredCountries}
        allCountries={allCountries}
        onFilterToggle={onFilterToggle}
      />

      <h3>Global Cases</h3>
      <p>Overview of coronavirus cases around the world.</p>
      <LineChart size="large" data={filteredCases} enableLogScale enableNormalizeDays={50} />

      <h3>Global Deaths</h3>
      <p>Overview of coronavirus deaths around the world.</p>
      <LineChart size="large" data={filteredDeaths} enableLogScale enableNormalizeDays={10} />
    </div>
  );
}

GlobalOverview.propTypes = propTypes;
GlobalOverview.defaultProps = defaultProps;

const mapStateToProps = ({ global }) => ({
  cases: global.cases,
  deaths: global.deaths,
  allCountries: global.allCountries,
  filteredCountries: global.filteredCountries,
});

export default connect(mapStateToProps)(GlobalOverview);
