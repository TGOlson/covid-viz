import React from 'react';
import { connect } from 'react-redux'

import LineChart from '../components/LineChart'

const formatData = (dateRange, data) =>
  Object.values(data).map(series => {
    const data = series.values.map((value, index) => {
      const [m, d, year] = dateRange[index].split('/');
      // const x = new Date(dateRange[index]);
      const x = `20${year}-${m}-${d}`;

      if (value === 0) {
        return null;
      }

      return {
        x,
        y: value,
      }
    }).filter(x => x !== null);

    return {
      id: series.country,
      data,
    };
  });

function GlobalOverview(props) {
  const {countries, cases, deaths, dateRange} = props;

  if (!cases || !deaths) {
    return <p>loading...</p>
  }

  const filteredCases = countries.map(country => cases[country]);
  const filteredDeaths = countries.map(country => deaths[country]);

  const caseData = formatData(dateRange, filteredCases);
  const deathData = formatData(dateRange, filteredDeaths);

  const onToggle = () =>
    props.dispatch({type: 'TOGGLE_GLOBAL_LOG_SCALE'})

  return (
    <div>
      <h3>Global Cases</h3>
      <p>Overview of coronavirus cases around the world.</p>
      <div style={{height: '600px', maxWidth:'900px'}}>
        <LineChart data={caseData} logScale={props.logScale} />
      </div>
      <button onClick={onToggle}>Toggle Log Scale</button>


      <h3>Global Deaths</h3>
      <p>Overview of coronavirus deaths around the world.</p>
      <div style={{height: '600px', maxWidth:'900px'}}>
        <LineChart data={deathData} logScale={props.logScale} />
      </div>
      <button onClick={onToggle}>Toggle Log Scale</button>


    </div>
  );
}

const mapStateToProps = ({ dateRange, global }) => ({
  dateRange: dateRange,
  cases: global.cases,
  deaths: global.deaths,
  countries: global.filteredCountries,
  logScale: global.logScale,
})

export default connect(mapStateToProps)(GlobalOverview);
// export default Overview;
