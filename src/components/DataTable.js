import React from 'react';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';

import Container from '@material-ui/core/Container';

import { Reducer } from '../propTypes';
import { cases, dayOverDayDelta } from '../data-specs/accessors';

import { shortDateFormat } from './utils';

const propTypes = {
  reducer: Reducer.isRequired,
};

// 1-10
// 11-100
// 101-1000
// 1001-10,000
// 10,000+
const colorRange = [
  'rgb(255, 245, 235)',
  // 'rgb(254, 230, 206)',
  'rgb(253, 208, 162)',
  // 'rgb(253, 174, 107)',
  'rgb(253, 141, 60)',
  'rgb(241, 105, 19)',
  'rgb(217, 72, 1)',
  // 'rgb(166, 54, 3)',
  // 'rgb(127, 39, 4)',
];

const getColor = (x) => {
  if (x >= 1 && x <= 10) return colorRange[0];
  if (x >= 11 && x <= 100) return colorRange[1];
  if (x >= 101 && x <= 1000) return colorRange[2];
  if (x >= 1001 && x <= 10000) return colorRange[3];
  if (x >= 10001) return colorRange[4];

  return colorRange[0];
};

// really weird API, component requires a function with a domain() prop
const colors = () => {};
colors.domain = () => getColor;

const DataTable = ({ reducer }) => {
  const caseData = dayOverDayDelta(cases)(reducer);
  // console.log(caseData);
  const allKeys = caseData[0].data.map(({ x }) => x);
  const keys = allKeys.sort().slice(allKeys.length - 21, allKeys.length);
  // const keys = sortedKeys.map(shortDateFormat);

  const formattedData = caseData.map(({ id, data }) => {
    const flattenedData = data.reduce((accum, { x, y }) => ({ ...accum, [x]: y }), {});
    return { ...flattenedData, id };
  }).sort((a, b) => {
    // compares max value, but maybe should compare total
    const aMax = Math.max(...Object.values(a).filter((x) => !isNaN(x)));
    const bMax = Math.max(...Object.values(b).filter((x) => !isNaN(x)));
    // console.log(aMax, bMax);
    return bMax - aMax;
  });

  const height = formattedData.length * 25;
  // const keys = caseData[0].data.map(({ x }) => x).sort().reverse().slice(0, 21)
  //   .map(shortDateFormat);


  return (
    <Container style={{ width: '800px', height: `${height}px` }}>
      <ResponsiveHeatMapCanvas
        data={formattedData}
        keys={keys.map((k) => k.toString())}
        indexBy="id"
        minValue={0}
        maxValue={10000}
        forceSquare
        sizeVariation={0}
        colors={colors}
        margin={{
          top: 50, right: 0, bottom: 100, left: 0,
        }}
        pixelRatio={2}

        axisTop={{
          orient: 'top',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -90,
          legend: '',
          legendOffset: 36,
          format: (x) => shortDateFormat(parseInt(x, 10)),
        }}
        cellOpacity={1}
        cellBorderColor={{ from: 'color', modifiers: [['darker', '0.3']] }}
        enableLabels={false}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.8]] }}
        animate={false}
        hoverTarget="cell"
        cellHoverOthersOpacity={0.5}
      />
    </Container>
  );
};

DataTable.propTypes = propTypes;

export default DataTable;
