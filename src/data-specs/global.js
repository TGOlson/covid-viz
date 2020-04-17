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
    ids: [
      'US',
      'Canada',
      'Mexico',
      'Brazil',
    ],
  },
  {
    label: 'Europe',
    ids: [
      'UK',
      'Spain',
      'France',
      'Germany',
      'Italy',
      'Switzerland',
      'Belgium',
      'Netherlands',
    ],
  },
  {
    label: 'APAC',
    ids: [
      'Singapore',
      'Taiwan',
      'Japan',
      'South Korea',
      'Australia',
    ],
  },
];

export const abbreviations = {
  US: 'US',
  Canada: 'CA',
  Mexico: 'MX',
  Brazil: 'BR',
  UK: 'UK',
  Spain: 'ES',
  France: 'FR',
  Germany: 'DE',
  Italy: 'IT',
  Switzerland: 'CH',
  Belgium: 'BE',
  Netherlands: 'NL',
  Singapore: 'SG',
  Taiwan: 'TW',
  Japan: 'JP',
  'South Korea': 'SK',
  Australia: 'AU',
};


export const { defaultChartId } = Base;
export const spec = Base.makeSpec('Global');
