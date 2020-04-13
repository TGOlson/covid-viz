import * as Base from './base';

// export const INITIAL_FILTERS

export const filters = {
  Italy: true,
  US: true,
  UK: true,
  Singapore: true,
  France: false,
  Spain: false,
  Germany: false,
  'S. Korea': false,
};

export const idGroupings = [
  {
    label: 'Americas',
    ids: ['US', 'Canada', 'Mexico', 'Brazil'],
  },
  {
    label: 'Europe',
    ids: ['UK', 'Spain', 'France', 'Germany', 'Italy', 'Switzerland', 'Belgium', 'Netherlands'],
  },
  {
    label: 'APAC',
    ids: ['Singapore', 'Taiwan', 'Japan', 'S. Korea', 'Australia'],
  },
];


export const { defaultChartId } = Base;
export const spec = Base.makeSpec('Global');
