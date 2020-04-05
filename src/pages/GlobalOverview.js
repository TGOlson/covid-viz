import React from 'react';
import { connect } from 'react-redux';

import LineChart from '../components/LineChart';

function GlobalOverview(props) {
  const {
    countries, cases, deaths, logScale,
  } = props;

  if (!cases || !deaths) {
    return <p>loading...</p>;
  }

  const filteredCases = countries.map((country) => cases[country]);
  const filteredDeaths = countries.map((country) => deaths[country]);

  const caseData = Object.values(filteredCases);
  const deathData = Object.values(filteredDeaths);

  // <button onClick={onToggle}>Toggle Log Scale</button>
  return (
    <div>
      <h3>Global Cases</h3>
      <p>Overview of coronavirus cases around the world.</p>
      <LineChart size="large" data={caseData} logScale={logScale} />

      <h3>Global Deaths</h3>
      <p>Overview of coronavirus deaths around the world.</p>
      <LineChart size="large" data={deathData} logScale={logScale} />
    </div>
  );
}

const mapStateToProps = ({ global }) => ({
  cases: global.cases,
  deaths: global.deaths,
  countries: global.filteredCountries,
  logScale: global.logScale,
});

export default connect(mapStateToProps)(GlobalOverview);
