import React from 'react';
import { ResponsiveLine } from '@nivo/line';
// import { ResponsiveLineCanvas } from '@nivo/line'

const getDimensions = (size) => {
  const largeDim = { height: '600px', maxWidth: '900px' };
  const smallDim = { height: '300px', maxWidth: '500px' };

  switch (size) {
    case 'large': return largeDim;
    case 'small': return smallDim;
    default: {
      console.warn('Unknown size in linechart, defaulting to large', size); // eslint-disable-line no-console
      return largeDim;
    }
  }
};

function LineChart({ size, data, logScale }) {
  const dimension = getDimensions(size);

  const yScale = logScale
    ? { type: 'log', base: 10, max: 300000 }
    : { type: 'linear', min: 0, max: 'auto' };

  const gridYValues = logScale
    ? [10, 100, 1000, 10000, 100000, 1000000, 10000000]
    : undefined;

  const axisLeftTickValues = logScale
    ? [10, 100, 1000, 10000, 100000, 1000000, 10000000]
    : undefined;

  const xScale = {
    type: 'time',
    format: '%Y-%m-%d',
    precision: 'day',
  };

  const axisBottom = {
    orient: 'bottom',
    tickSize: 5,
    tickPadding: 5,
    tickRotation: -66,
    format: '%b %d',
    tickValues: 'every week',
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

  return (
    <div style={dimension}>
      <ResponsiveLine
        maxWidth={800}
        data={data}
        margin={{
          top: 50, right: 110, bottom: 50, left: 60,
        }}
        xScale={xScale}
        xFormat="time:%Y-%m-%d"
        yScale={yScale}
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
    </div>
  );
}

export default LineChart;
