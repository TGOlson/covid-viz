import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import BaseLineChart from './BaseLineChart';

import { ChartData } from '../propTypes';

const propTypes = {
  title: PropTypes.string.isRequired,
  data: ChartData.isRequired,
  updatedAt: PropTypes.string,
  logScaleToggle: PropTypes.bool,
  normalizeDaysToggle: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  logScale: PropTypes.bool.isRequired,
  normalizeDays: PropTypes.bool.isRequired,
  onControlToggle: PropTypes.func.isRequired,
  group: PropTypes.string.isRequired,
};

const defaultProps = {
  updatedAt: null,
  logScaleToggle: false,
  normalizeDaysToggle: false,
};

const FormattedLineChart = (props) => {
  const {
    title,
    data,
    updatedAt,
    logScaleToggle,
    normalizeDaysToggle,
    logScale,
    normalizeDays,
    onControlToggle,
    group,
  } = props;

  const date = new Date(updatedAt);

  const timePart = date.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' });
  const datePart = date.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });

  const updatedAtString = updatedAt
    ? `Data as of ${timePart} on ${datePart}.`
    : 'Data normally updated every 12 hours.';

  return (
    <div>
      <Typography variant="h4" style={{ marginBottom: '12px' }}>{title}</Typography>
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        style={{ fontStyle: 'italic', marginBottom: '12px', marginTop: '12px' }}
      >
        {updatedAtString}
      </Typography>
      <FormGroup id="chart-toggles" row style={{ flexDirection: 'row-reverse', marginBottom: '6px' }}>
        <FormControlLabel
          control={<Switch size="small" checked={logScale} onChange={() => onControlToggle('logScale')} />}
          label="Log Scale"
          disabled={!logScaleToggle}
        />
        <FormControlLabel
          control={<Switch size="small" checked={normalizeDays} onChange={() => onControlToggle('normalizeDays')} />}
          label="Normalize Days"
          disabled={!normalizeDaysToggle}
        />
      </FormGroup>
      <Paper
        variant="outlined"
        style={{
          marginTop: '12px',
          marginBottom: '6px',
          margin: 'auto',
          padding: '0 0 0 0',
        }}
      >
        <Container style={{ height: '500px', maxWidth: '800px' }} disableGutters>
          <BaseLineChart
            data={data}
            logScale={logScale}
            normalizeDays={normalizeDays ? normalizeDaysToggle : undefined}
            group={group}
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
    </div>
  );
};

FormattedLineChart.propTypes = propTypes;
FormattedLineChart.defaultProps = defaultProps;

export default FormattedLineChart;
