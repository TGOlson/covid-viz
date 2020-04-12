import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import LineChart from '../components/LineChart';
import RightNav from '../components/RightNav';

import { Reducer } from '../propTypes';
import { spec, defaultChartId } from '../data-specs/global';
import { toNavSpec } from '../data-specs/utils';

const propTypes = {
  reducer: Reducer.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const getChartId = (pathname) => pathname.split('/')[2] || defaultChartId;

const renderContainer = (component) => (
  <div id="main-container">
    <Container maxWidth="md" id="main-content">
      {component}
    </Container>
    <RightNav base="/global" spec={toNavSpec(spec)} />
  </div>
);

const GlobalOverview = (props) => {
  const {
    reducer,
    location,
    dispatch,
  } = props;

  if (reducer.loading) {
    return renderContainer(<p>Loading...</p>);
  }

  const chartId = getChartId(location.pathname);

  // TODO: should actually route to default when no match
  const chartSpec = spec[chartId] || spec[defaultChartId];

  const chartState = reducer.chartState[chartId];

  const data = chartSpec.getData(reducer);
  const updatedAt = chartSpec.getUpdatedAt(reducer);

  const onControlToggle = (key) => dispatch({
    type: 'GLOBAL_FORM_CONTROL_TOGGLE',
    value: { chartId, update: { [key]: !chartState[key] } },
  });

  return renderContainer(
    <div>
      <Typography variant="h4" style={{ marginBottom: '12px', flex: 'auto' }}>{chartSpec.title}</Typography>
      <FormGroup id="chart-toggles" row style={{ flexDirection: 'row-reverse', marginBottom: '6px' }}>
        <FormControlLabel
          control={<Switch size="small" checked={chartState.logScale} onChange={() => onControlToggle('logScale')} />}
          label="Log Scale"
          disabled={!chartSpec.logScale}
        />
        <FormControlLabel
          control={<Switch size="small" checked={chartState.normalizeDays} onChange={() => onControlToggle('normalizeDays')} />}
          label="Normalize Days"
          disabled={!chartSpec.normalizeDays}
        />
      </FormGroup>
      <Paper
        variant="outlined"
        style={{
          marginTop: '12px',
          marginBottom: '6px',
          margin: 'auto',
          padding: '0 32px 18px',
        }}
      >
        <Container style={{ height: '500px', maxWidth: '800px' }} disableGutters>
          <LineChart
            data={data}
            logScale={chartState.logScale}
            normalizeDays={chartState.normalizeDays ? chartSpec.normalizeDays : undefined}
          />
        </Container>
      </Paper>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        style={{
          textAlign: 'center', fontStyle: 'italic', marginBottom: '12px', marginTop: '12px',
        }}
      >
        {`Data last updated at ${new Date(updatedAt).toLocaleDateString()}.`}
      </Typography>
    </div>,
  );
};

GlobalOverview.propTypes = propTypes;

const mapStateToProps = ({ global }) => ({ reducer: global });

export default connect(mapStateToProps)(GlobalOverview);
