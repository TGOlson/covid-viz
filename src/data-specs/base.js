import React from 'react';

import DataTable from '../components/DataTable';

import {
  filteredCases,
  filteredDeaths,
  deathsTimestamp,
  casesTimestamp,
  filterBefore,
  dayOverDayDelta,
  dayOverDayRate,
  movingAverage,
  mortalityRate,
} from './accessors';

// Best data after this
const initialDate = new Date('3/1/2020');

export const defaultChartId = 'deaths-cumulative';

export const makeSpec = (label) => ({
  // deaths
  'deaths-cumulative': {
    title: `Cumulative ${label} Deaths`,
    group: 'Deaths',
    label: 'Cumulative Count',
    getData: filterBefore(initialDate)(filteredDeaths),
    getUpdatedAt: deathsTimestamp,
    logScale: true,
    normalizeDays: 10,
  },
  'deaths-daily': {
    title: `Daily ${label} Deaths`,
    group: 'Deaths',
    label: 'Daily Count',
    getData: dayOverDayDelta(filterBefore(initialDate)(filteredDeaths)),
    getUpdatedAt: deathsTimestamp,
    logScale: true,
  },
  'deaths-change-rate': {
    title: `${label} Deaths Daily Rate of Change (7 Day Average)`,
    group: 'Deaths',
    label: 'Rate of Change',
    getData: filterBefore(initialDate)(movingAverage(7)(dayOverDayRate(filteredDeaths))),
    getUpdatedAt: deathsTimestamp,
  },

  // cases
  'cases-cumulative': {
    title: `Cumulative ${label} Cases`,
    group: 'Cases',
    label: 'Cumulative Count',
    getData: filterBefore(initialDate)(filteredCases),
    getUpdatedAt: casesTimestamp,
    logScale: true,
    normalizeDays: 50,
  },
  'cases-daily': {
    title: `Daily ${label} Cases`,
    group: 'Cases',
    label: 'Daily Count',
    getData: dayOverDayDelta(filterBefore(initialDate)(filteredCases)),
    getUpdatedAt: casesTimestamp,
    logScale: true,
  },
  'cases-change-rate': {
    title: `${label} Cases Daily Rate of Change (7 Day Average)`,
    group: 'Cases',
    label: 'Rate of Change',
    getData: filterBefore(initialDate)(movingAverage(7)(dayOverDayRate(filteredCases))),
    getUpdatedAt: casesTimestamp,
  },

  // other
  'mortality-rate': {
    title: `${label} Mortality Rate`,
    group: 'Other',
    label: 'Mortality Rate',
    getData: filterBefore(initialDate)(mortalityRate),
    // TODO: should really take most recent of the two
    getUpdatedAt: deathsTimestamp,
  },
  heatmap: {
    title: `${label} Case Heatmap`,
    group: 'Other',
    label: 'Case Heatmap',
    component: (reducer) => <DataTable reducer={reducer} />,
  },
});
