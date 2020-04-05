import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Typography } from '@material-ui/core';

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

const computeDayOverDayChange = ({ id, data }) => {
  const changes = data.map(({ x, y }, index) => {
    const prev = data[index - 1];
    const change = (index === 0 || prev.y === 0) ? 0 : ((y - prev.y) / prev.y);

    return { x, y: change };
  });

  return { id, data: changes };
};

const filterBeforeDate = (date) => ({ id, data }) => ({
  id,
  data: data.filter(({ x }) => x >= new Date(date).getTime()),
});

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

  const dayOverDayChangeInCases = filteredCases.map(computeDayOverDayChange).map(filterBeforeDate('3/5/2020'));
  const dayOverDayChangeInDeaths = filteredDeaths.map(computeDayOverDayChange).map(filterBeforeDate('3/5/2020'));

  const mortalityRate = filteredDeaths.map(({ id, data: deathData }) => {
    const caseData = filteredCases.find((x) => x.id === id).data;

    const mortalityData = deathData.map(({ x, y: deathCount }, index) => {
      const caseCount = caseData[index].y;
      const rate = caseCount === 0 ? 0 : deathCount / caseCount;
      return { x, y: rate };
    });


    return { id, data: mortalityData };
  }).map(filterBeforeDate('3/5/2020'));

  return (
    <div>
      <CountrySelector
        filteredCountries={filteredCountries}
        allCountries={allCountries}
        onFilterToggle={onFilterToggle}
      />


      <Container maxWidth="md" disableGutters>
        <Typography variant="h2" gutterBottom>Global Cases</Typography>
        <Typography variant="body2">
          Overview of coronavirus cases around the world.
          This shows at a high level, how quickly the virus has spread globally.
          It is most useful when viewed on a log scale to see the magnitude of increase,
          as well as a normalized day series to compare rate across countries.
          However, a linear scale or an absolute time scale can also show interesting trends.
          One thing to keep in mind when viewing global case counts
          is that many countries have different testing standards,
          as well as capacities. This means that confirmed cases might differ
          substantially from actual case counts in certain countries.
        </Typography>
        <Typography variant="caption" display="block" gutterBottom style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '12px' }}>
          Data last updated at 7:34 a.m. on April 5, 2020.
        </Typography>
        <LineChart size="large" data={filteredCases} enableLogScale enableNormalizeDays={50} />

      </Container>

      <h3>Global Deaths</h3>
      <p>Overview of coronavirus deaths around the world.</p>
      <LineChart size="large" data={filteredDeaths} enableLogScale enableNormalizeDays={10} />

      <h3>Day over day changes</h3>
      <p>Percent day over day change in cases and deaths around the world;</p>
      <div>
        <LineChart size="small" data={dayOverDayChangeInCases} />
        <LineChart size="small" data={dayOverDayChangeInDeaths} />
      </div>

      <h3>Mortality Rate</h3>
      <p>Mortality around the world.</p>
      <LineChart size="large" data={mortalityRate} />
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
