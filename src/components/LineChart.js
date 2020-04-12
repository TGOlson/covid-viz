import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

import deepEqual from 'deep-equal';

import { ChartData } from '../propTypes';

const propTypes = {
  data: ChartData.isRequired,
  logScale: PropTypes.bool,
  normalizeDays: PropTypes.number,
};

const defaultProps = {
  logScale: false,
  normalizeDays: null,
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
    super(props);

    this.state = {
      chart: null,
    };
  }

  // A little trickery in these lifecycle methods in order to render the chart
  // outside of the current render cycle.
  // Chart is slow and heavy to re-render,
  // so we want to avoid batching with other updates that should be fast
  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate(prevProps, prevState) {
    const propChange = !deepEqual(prevProps, this.props);

    // This is a little sketchy... we need to see if state changed but comparing the
    // chart would lead to an infitine loop
    // (because state changes lead to chart changes lead to state changes)
    // So as a quick fix just remove the chart value for comparision
    const stateChange = !deepEqual({ ...prevState, chart: null }, { ...this.state, chart: null });

    if (propChange || stateChange) {
      this.renderChart();
    }
  }

  renderChart() {
    const {
      data: initialData, logScale, normalizeDays,
    } = this.props;

    let data = initialData;
    if (normalizeDays) {
      data = mapNormalizeDays(normalizeDays, data);
    }

    if (logScale) {
      // filter zero values
      data = data.map(filterZeroValues);
    }

    const xScale = {
      type: 'linear',
      min: normalizeDays ? 0 : 'auto',
      max: 'auto',
    };

    const yScale = logScale
      ? { type: 'log', base: 10, max: 1000000 } // todo find max automatically
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

    const chart = (
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
    );

    // Render chart into DOM outside of current render cycle
    setTimeout(() => this.setState({ chart }), 0);
  }

  render() {
    const { chart } = this.state;

    return chart;
  }
}

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
