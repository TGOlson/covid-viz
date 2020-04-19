import React from 'react';
import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import numeral from 'numeral';

import Container from '@material-ui/core/Container';

import { Reducer } from '../propTypes';
import { cases, dayOverDayDelta } from '../data-specs/accessors';
import { shortDateFormat } from './utils';

import ChartTooltip from './ChartTooltip';

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

const sumVals = (obj) => Object.values(obj).filter((x) => !isNaN(x))
  .reduce((x, y) => x + y, 0);

// really weird API, component requires a function with a domain() prop
const colors = () => {};
colors.domain = () => getColor;

const DataTable = ({ reducer }) => {
  const caseData = dayOverDayDelta(cases)(reducer);

  const allKeys = caseData[0].data.map(({ x }) => x);
  const keys = allKeys.sort().slice(allKeys.length - 21, allKeys.length);
  const keyHash = keys.reduce((accum, key) => ({ ...accum, [key]: true }), {});

  const formattedData = caseData.map(({ id, data }) => {
    const flattenedData = data.reduce(
      (accum, { x, y }) => (keyHash[x] ? { ...accum, [x]: y } : accum), {},
    );

    return { ...flattenedData, id };
  }).sort((a, b) => sumVals(b) - sumVals(a));

  const height = formattedData.length * 25;

  return (
    <Container style={{ width: '800px', height: `${height}px` }}>
      <ResponsiveHeatMapCanvas
        data={formattedData}
        keys={keys.map((x) => x.toString())}
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
        hoverTarget="row"
        cellHoverOthersOpacity={0.7}
        tooltip={(x) => {
          const {
            xKey, yKey, value, color,
          } = x;

          return (
            <ChartTooltip
              label={yKey}
              color={color}
              x={shortDateFormat(parseInt(xKey, 10))}
              y={numeral(value).format('0,0')}
              dense
            />
          );
        }}
        theme={{
          tooltip: {
            container: {
              background: 'none',
              border: 0,
              borderRadius: 0,
              boxShadow: 'none',
              padding: 0,
            },
          },
        }}
      />
    </Container>
  );
};

DataTable.propTypes = propTypes;

export default DataTable;
