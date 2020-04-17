import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';
import deepEqual from 'deep-equal';
import numeral from 'numeral';


import ChartTooltip from './ChartTooltip';
import { ChartData } from '../propTypes';

const propTypes = {
  data: ChartData.isRequired,
  logScale: PropTypes.bool,
  normalizeDays: PropTypes.number,
  group: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  smallScreen: PropTypes.bool,
};

const defaultProps = {
  logScale: false,
  normalizeDays: null,
  smallScreen: false,
};

const mapNormalizeDays = (cutoff, values) => values.map((item) => {
  const data = item.data
    .filter(({ y }) => y >= cutoff)
    .map(({ y }, index) => ({ x: index, y }));

  return { ...item, data };
});

const filterZeroValues = ({ id, data }) => ({
  id,
  data: data.filter(({ y }) => y > 0),
});

const shortDateFormat = (x) => new Date(x).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const longDateFormat = (x) => new Date(x).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

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
    // chart would lead to an infinite loop
    // (because state changes lead to chart changes lead to state changes)
    // So as a quick fix just remove the chart value for comparison
    const stateChange = !deepEqual({ ...prevState, chart: null }, { ...this.state, chart: null });

    if (propChange || stateChange) {
      this.renderChart();
    }
  }

  renderChart() {
    const {
      data: initialData, logScale, normalizeDays, group, smallScreen, label, abbreviations,
    } = this.props;


    let data = initialData;
    if (normalizeDays) {
      data = mapNormalizeDays(normalizeDays, data);
    }

    if (logScale) {
      // filter zero values
      data = data.map(filterZeroValues);
    }

    if (smallScreen) {
      data = data.map((d) => (abbreviations[d.id] ? ({ ...d, id: abbreviations[d.id] }) : d));
    }

    const xScale = {
      type: 'linear',
      min: normalizeDays ? 0 : 'auto',
      max: 'auto',
    };

    const yScale = logScale
      ? {
        type: 'log', base: 10, min: 1, max: 1000000,
      } // todo find max automatically
      : { type: 'linear', min: 0, max: 'auto' };

    const xAxisFormat = normalizeDays
      ? undefined
      : shortDateFormat;

    const yAxisFormat = label.includes('Rate')
      ? (x) => numeral(x).format('0.00%')
      : (x) => numeral(x).format('0,0');

    const gridYValues = logScale
      ? [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]
      : undefined;

    const axisLeftTickValues = logScale
      ? [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000]
      : undefined;

    const bottomLegend = normalizeDays
      // super hacky formatting but what can you do
      ? `Number of days since ${normalizeDays}th ${group.toLowerCase().slice(0, group.length - 1)}`
      : 'Date';

    const axisBottom = {
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: normalizeDays ? 0 : -40,
      tickValues: 10,
      format: xAxisFormat,
      legend: bottomLegend,
      legendOffset: 50,
      legendPosition: 'middle',
    };

    const axisLeft = {
      orient: 'left',
      tickValues: axisLeftTickValues,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: yAxisFormat,
      legend: label,
      legendOffset: -65,
      legendPosition: 'middle',
    };

    const legend = {
      anchor: smallScreen ? 'top-left' : 'top-right',
      direction: smallScreen ? 'row' : 'column',
      justify: false,
      translateX: smallScreen ? -65 : 100,
      translateY: smallScreen ? -35 : 0,
      itemsSpacing: 0,
      itemDirection: 'left-to-right',
      itemWidth: smallScreen ? 40 : 80,
      itemHeight: 20,
      itemOpacity: 0.75,
      symbolSize: smallScreen ? 8 : 12,
      symbolShape: 'circle',
      symbolBorderColor: 'rgba(0, 0, 0, .5)',
    };

    const chart = (
      <ResponsiveLine
        data={data}
        margin={{
          top: 50, right: smallScreen ? 30 : 110, bottom: 65, left: 80,
        }}
        colors={{ scheme: 'category10' }}
        xScale={xScale}
        yScale={yScale}
        axisBottom={axisBottom}
        gridYValues={gridYValues}
        axisLeft={axisLeft}
        isInteractive
        lineWidth={smallScreen ? 1 : 2}
        pointSize={smallScreen ? 4 : 6}
        useMesh
        enableGridX={false}
        enableCrosshair={false}
        tooltip={({ point }) => {
          // TODO: take raw values and format date
          const {
            serieId, color, data: { xFormatted, yFormatted },
          } = point;

          return (
            <ChartTooltip
              id={serieId}
              color={color}
              xFormat={(x) => {
                const xInt = parseInt(x, 10);
                return (normalizeDays ? `${xInt} days` : longDateFormat(xInt));
              }}
              yFormat={(y) => (label.includes('Rate') ? yAxisFormat(y) : `${yAxisFormat(y)} ${group.toLowerCase()}`)}
              x={xFormatted.toString()}
              y={yFormatted.toString()}
            />
          );
        }}
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
