import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveLine } from '@nivo/line';

import { ChartData } from '../propTypes';

const propTypes = {
  size: PropTypes.oneOf(['small', 'large']).isRequired,
  data: ChartData.isRequired,
  enableLogScale: PropTypes.bool,
  enableNormalizeDays: PropTypes.number,
};

const defaultProps = {
  enableLogScale: false,
  enableNormalizeDays: null,
};

const mapNormalizeDays = (cutoff, values) => values.map((item) => {
  const data = item.data
    .filter(({ y }) => y >= cutoff)
    .map(({ y }, index) => ({ x: index, y }));

  return { ...item, data };
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
      size, data: initialData, enableLogScale, enableNormalizeDays,
    } = this.props;

    const { logScale, normalizeDays } = this.state;

    const data = normalizeDays ? mapNormalizeDays(enableNormalizeDays, initialData) : initialData;

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
      tickRotation: -66,
      tickValues: 10,
      format: xFormat,
    };

    const axisLeft = {
      orient: 'left',
      tickValues: axisLeftTickValues,
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
    };

    const legend = {
      anchor: 'right',
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

    const logScaleButton = enableLogScale
      ? (
        <button type="button" onClick={this.onLogScaleToggle}>
          {logScale ? 'Linear scale' : 'Log scale'}
        </button>
      )
      : null;

    const normalizeDaysButton = enableNormalizeDays
      ? (
        <button type="button" onClick={this.onNormalizeDaysToggle}>
          {normalizeDays ? 'Absolute timeline' : 'Normalized days'}
        </button>
      )
      : null;

    return (
      <div style={dimension}>
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
        {logScaleButton}
        {normalizeDaysButton}
      </div>
    );
  }
}

LineChart.propTypes = propTypes;
LineChart.defaultProps = defaultProps;

export default LineChart;
