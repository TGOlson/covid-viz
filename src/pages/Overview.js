import React from 'react';
import { connect } from 'react-redux'

import LineChart from '../components/LineChart'

function Overview(props) {
  const {countries, cases, dateRange} = props;

  if (!cases) {
    return <p>loading...</p>
  }

  const filteredData = countries.map(country => cases[country]);
  const data = Object.values(filteredData).map(series => {
    const data = series.values.map((value, index) => {
      const [m, d, year] = dateRange[index].split('/');
      // const x = new Date(dateRange[index]);
      const x = `20${year}-${m}-${d}`;

      const y = value === 0 ? 1 : value;

      return {
        x,
        y,
      }
    })

    return {
      id: series.country,
      data,
    };
  });

  const onToggle = () =>
    props.dispatch({type: 'TOGGLE_GLOBAL_LOG_SCALE'})

  return (
    <div>
      <p>General overview of world case growth.</p>
      <div style={{height: '600px', maxWidth:'900px'}}>
        <LineChart data={data} logScale={props.logScale} />
      </div>
      <button onClick={onToggle}>Toggle Log Scale</button>
    </div>
  );
}

const mapStateToProps = ({ dateRange, global }) => ({
  dateRange: dateRange,
  cases: global.cases,
  countries: global.filteredCountries,
  logScale: global.logScale,
})

export default connect(mapStateToProps)(Overview);
// export default Overview;
