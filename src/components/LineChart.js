import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import {
  Container, Paper, Button, ButtonGroup, Grid, Typography,
} from '@material-ui/core';

import { ChartData } from '../propTypes';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  updatedAt: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
  data: ChartData.isRequired,
  enableLogScale: PropTypes.bool,
  enableNormalizeDays: PropTypes.number,
};

const defaultProps = {
  title: null,
  description: null,
  enableLogScale: false,
  enableNormalizeDays: null,
};

const mapNormalizeDays = (cutoff, values) => values.map((item) => {
  const data = item.data
    .filter(({ y }) => y >= cutoff)
    .map(({ y }, index) => ({ x: index, y }));

  return { ...item, data };
});

const filterZeroValues = ({ id, data }) => ({
  id,
  data: data.filter(({ y }) => y !== 0),
});

class LineChart extends React.Component {
  constructor(props) {
    const { enableLogScale, enableNormalizeDays } = props;
    super(props);

    this.state = {
      logScale: enableLogScale,
      normalizeDays: !!enableNormalizeDays,
    };
  }

  onLogScaleToggle = () => {
    const { logScale } = this.state;

    this.setState({
      logScale: !logScale,
    });
  }

  onNormalizeDaysToggle = () => {
    const { normalizeDays } = this.state;

    this.setState({
      normalizeDays: !normalizeDays,
    });
  }

  render() {
    const {
      title, description, updatedAt, size, data: initialData, enableLogScale, enableNormalizeDays,
    } = this.props;

    const { logScale, normalizeDays } = this.state;

    let data = initialData;
    if (normalizeDays) {
      data = mapNormalizeDays(enableNormalizeDays, data);
    }

    if (logScale) {
      // filter zero values
      data = data.map(filterZeroValues);
    }

    const dimension = size === 'large'
      ? { height: '500px', maxWidth: '800px' }
      : { height: '300px', maxWidth: '500px' };

    const xScale = {
      type: 'linear',
      min: normalizeDays ? 0 : 'auto',
      max: 'auto',
    };

    const yScale = logScale
      ? { type: 'log', base: 10, max: 300000 } // todo find max automatically
      : { type: 'linear', min: 0, max: 'auto' };

    const xFormat = normalizeDays
      ? undefined
      : (x) => new Date(x).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const gridYValues = logScale
      ? [10, 100, 1000, 10000, 100000, 1000000, 10000000]
      : undefined;

    const axisLeftTickValues = logScale
      ? [10, 100, 1000, 10000, 100000, 1000000, 10000000]
      : undefined;

    const axisBottom = {
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      // tickRotation: -66,
      tickValues: 10,
      format: xFormat,
      legend: 'Number of days since Nth case',
      legendOffset: 36,
      legendPosition: 'middle',
    };

    const axisLeft = {
      orient: 'left',
      tickValues: axisLeftTickValues,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Count',
      legendOffset: -50,
      legendPosition: 'middle',
    };

    const legend = {
      anchor: 'top-right',
      direction: 'column',
      justify: false,
      translateX: 100,
      translateY: 0,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: 12,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
      effects: [{
        on: 'hover',
        style: {
          itemBackground: 'rgba(0, 0, 0, .03)',
          itemOpacity: 1,
        },
      }],
    };

    const noop = () => {};

    const logScaleButton = enableLogScale
      ? (
        <ButtonGroup variant="text" size="small" color="primary" aria-label="contained primary button group">
          <Button style={{ textDecoration: logScale ? 'underline' : null }} onClick={logScale ? noop : this.onLogScaleToggle}>Log scale</Button>
          <Button style={{ textDecoration: logScale ? null : 'underline' }} onClick={logScale ? this.onLogScaleToggle : noop}>Linear scale</Button>
        </ButtonGroup>
      )
      : null;

    const normalizeDaysButton = enableNormalizeDays
      ? (
        <ButtonGroup variant="text" size="small" color="primary" aria-label="contained primary button group">
          <Button style={{ textDecoration: normalizeDays ? 'underline' : null }} onClick={normalizeDays ? noop : this.onNormalizeDaysToggle}>
            Normalized days
          </Button>
          <Button style={{ textDecoration: normalizeDays ? null : 'underline' }} onClick={normalizeDays ? this.onNormalizeDaysToggle : noop}>
            Absolute timeline
          </Button>
        </ButtonGroup>
      )
      : null;


    return (
      <Container size="md" disableGutters style={{ marginTop: '12px', marginBottom: '36px' }}>
        {title ? <Typography variant="h2" gutterBottom>{title}</Typography> : null}
        {description ? <Typography variant="body2" gutterBottom>{description}</Typography> : null}
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          style={{
            textAlign: 'center', fontStyle: 'italic', marginBottom: '12px', marginTop: '6px',
          }}
        >
          Data last updated at
          {' '}
          {new Date(updatedAt).toLocaleDateString()}
          .
        </Typography>

        <Paper style={{ marginTop: '12px', marginBottom: '6px' }}>
          <Container style={dimension} disableGutters>
            <ResponsiveLine
              data={data}
              margin={{
                top: 50, right: 110, bottom: 50, left: 60,
              }}
              xScale={xScale}
              yScale={yScale}
              xFormat={xFormat}
              axisBottom={axisBottom}
              gridYValues={gridYValues}
              axisLeft={axisLeft}
              isInteractive
    // pointSize={6}
              useMesh
              enableGridX={false}
    // sliceTooltip={(slice) => {
    //   console.log(slice)
    //   return <p>foo</p>;
    // }}
              enableSlices="x"
              legends={[legend]}
            />
          </Container>
        </Paper>
        <Grid container justify="space-between" spacing={8}>
          <Grid item>{logScaleButton}</Grid>
          <Grid item>{normalizeDaysButton}</Grid>
        </Grid>
      </Container>
    );
  }
}

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
