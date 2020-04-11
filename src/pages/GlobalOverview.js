import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import { ChartData } from '../propTypes';
import LineChart from '../components/LineChart';


const propTypes = {
  filteredCountries: PropTypes.objectOf(PropTypes.bool).isRequired,
  cases: ChartData,
  deaths: ChartData,
  // dispatch: PropTypes.func.isRequired,
};

const defaultProps = {
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
    filteredCountries, cases, deaths,
  } = props;

  if (!cases || !deaths) {
    return <p>loading...</p>;
  }

  const filteredCases = cases.filter(({ id }) => filteredCountries[id]);
  const filteredDeaths = deaths.filter(({ id }) => filteredCountries[id]);

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
    <Grid container spacing={0} style={{ display: 'flex' }}>
      <Grid item xs={10}>
        <LineChart
          title="Global Cases"
          updatedAt={new Date('4/1/2020').getTime()}
          size="large"
          data={filteredCases}
          enableLogScale
          enableNormalizeDays={50}
        />

        <LineChart
          title="Global Deaths"
          updatedAt={new Date('4/1/2020').getTime()}
          size="large"
          data={filteredDeaths}
          enableLogScale
          enableNormalizeDays={10}
          description={
          `Overview of coronavirus deaths around the world.
          This is another view on how the virus has spread around the world.
          It is likely a much more lagging indicator than global cases
          (possibly on the order of 1-2 weeks), but also might offer a slightly less biased
          view on impact per region, as deaths are more likely to be
          accurately tracked than overall cases.`
        }
        />

        <Typography variant="h2" gutterBottom>Day Overy Day Changes</Typography>
        <Typography variant="body2" gutterBottom>
          Rate change from previous day. Potentially noisy on a day-by-day basis but useful
          to get a sense of directional trends. Lines converging on 10% day-over-day growth
          means cases or deaths double roughly every week. Lines converging on 20% 10%
          day-over-day growth means cases or deaths double roughly every 3-4 days.
          Note: only shows data after March 5th.
        </Typography>
        <div id="test">
          <LineChart size="small" updatedAt={new Date('4/1/2020').getTime()} data={dayOverDayChangeInCases} />
          <LineChart size="small" updatedAt={new Date('4/1/2020').getTime()} data={dayOverDayChangeInDeaths} />
        </div>

        <LineChart
          title="Mortality Rate"
          updatedAt={new Date('4/1/2020').getTime()}
          size="large"
          data={mortalityRate}
          description={
          `Cumulative total mortality rate by day, defined as cumulative deaths over cases per country.
          A spike upwards could indicate either medical failures or reduced testing capacity,
          while a spike downwards could indicate increased medical capacity or increased testing.
          Note: only shows data after March 5th.`
        }
        />
      </Grid>
      <Grid
        item
        xs={2}
        style={{
          position: 'sticky',
          top: '70px',
          height: 'calc(100vh - 70px)',
          padding: '16px',
        }}
      >
        <List component="nav" dense subheader={<ListSubheader disableSticky component="div">Deaths</ListSubheader>}>
          <ListItem button><ListItemText primary="Cumulative" /></ListItem>
          <ListItem button><ListItemText primary="Daily" /></ListItem>
          <ListItem button><ListItemText primary="Rate of Change" /></ListItem>
          <ListItem button><ListItemText primary="Per Capita" /></ListItem>
        </List>
        <List component="nav" dense subheader={<ListSubheader disableSticky component="div">Cases</ListSubheader>}>
          <ListItem button><ListItemText primary="Cumulative" /></ListItem>
          <ListItem button><ListItemText primary="Daily" /></ListItem>
          <ListItem button><ListItemText primary="Rate of Change" /></ListItem>
          <ListItem button><ListItemText primary="Per Capita" /></ListItem>
        </List>
        <List component="nav" dense subheader={<ListSubheader disableSticky component="div">Other</ListSubheader>}>
          <ListItem button><ListItemText primary="Mortality rate" /></ListItem>
        </List>
      </Grid>
    </Grid>
  );
}

GlobalOverview.propTypes = propTypes;
GlobalOverview.defaultProps = defaultProps;

const mapStateToProps = ({ global }) => ({
  cases: global.cases,
  deaths: global.deaths,
  filteredCountries: global.filteredCountries,
});

export default connect(mapStateToProps)(GlobalOverview);
