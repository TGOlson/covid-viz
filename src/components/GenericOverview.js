import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import LineChart from './LineChart';
import RightNav from './RightNav';

import { Reducer } from '../propTypes';
import { toNavSpec } from '../data-specs/utils';

const propTypes = {
  reducer: Reducer.isRequired,
  chartSpec: PropTypes.shape({
    title: PropTypes.string,
    group: PropTypes.string,
    label: PropTypes.string,
    getData: PropTypes.func,
    getUpdatedAt: PropTypes.func,
    logScale: PropTypes.bool,
    normalizeDays: PropTypes.number,
  }).isRequired,
  chartId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  namespace: PropTypes.oneOf(['global', 'US']),
};

const GenericOverview = (props) => {
  const {
    reducer,
    chartSpec,
    chartId,
    namespace,
    dispatch,
  } = props;

  const renderContainer = (component) => (
    <div id="main-container">
      <Container maxWidth="md" id="main-content">
        {component}
      </Container>
    </div>
  );

  if (reducer.loading) {
    return renderContainer(<p>Loading...</p>);
  }

  const chartState = reducer.chartState[chartId];

  const data = chartSpec.getData(reducer);
  const updatedAt = chartSpec.getUpdatedAt(reducer);

  const onControlToggle = (key) => dispatch({
    type: `FORM_CONTROL_TOGGLE_${namespace}`,
    value: { chartId, update: { [key]: !chartState[key] } },
  });

  const date = new Date(updatedAt);

  const timePart = date.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' });
  const datePart = date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });

  return renderContainer(
    <div>
      <Typography variant="h4" style={{ marginBottom: '12px', textAlign: 'center' }}>{chartSpec.title}</Typography>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        style={{
          textAlign: 'center', fontStyle: 'italic', marginBottom: '12px', marginTop: '12px',
        }}
      >
        {`Data as of ${timePart} on ${datePart}.`}
      </Typography>
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
        Source:
        {' '}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/CSSEGISandData/COVID-19">Center for Systems Science and Engineering at Johns Hopkins University</a>
        .
      </Typography>
    </div>,
  );
};

GenericOverview.propTypes = propTypes;

export default GenericOverview;
