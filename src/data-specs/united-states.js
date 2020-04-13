import * as Base from './base';

export const filters = {
  California: true,
  Florida: true,
  Minnesota: true,
  'New York': true,
  Washington: true,
};

export const idGroupings = [
  {
    label: 'Midwest',
    ids: ['Minnesota', 'Iowa'],
  },
  {
    label: 'West Coast',
    ids: ['California', 'Washington', 'Oregon'],
  },
  {
    label: 'East Coast',
    ids: ['New York'],
  },
];

export const { defaultChartId } = Base;
export const spec = Base.makeSpec('US');
