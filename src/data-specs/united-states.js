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
    label: 'Northeast',
    ids: [
      'Maine',
      'New Hampshire',
      'Vermont',
      'Massachusetts',
      'New York',
      'Rhode Island',
      'Connecticut',
      'New Jersey',
      'Pennsylvania',
    ],
  },
  {
    label: 'Midwest',
    ids: [
      'Ohio',
      'Michigan',
      'Indiana',
      'Illinois',
      'Wisconsin',
      'Minnesota',
      'North Dakota',
      'South Dakota',
      'Nebraska',
      'Iowa',
      'Kansas',
      'Missouri',
    ],
  },
  {
    label: 'Southeast',
    ids: [
      'Maryland',
      'Delaware',
      'District of Columbia',
      'West Virginia',
      'Virginia',
      'Kentucky',
      'Tennessee',
      'North Carolina',
      'South Carolina',
      'Georgia',
      'Florida',
      'Alabama',
      'Mississippi',
    ],
  },
  {
    label: 'South',
    ids: [
      'Arkansas',
      'Louisiana',
      'Oklahoma',
      'Texas',
    ],
  },
  {
    label: 'Mountain',
    ids: [
      'Montana',
      'Idaho',
      'Wyoming',
      'Nevada',
      'Utah',
      'Colorado',
      'Arizona',
      'New Mexico',
    ],
  },
  {
    label: 'West',
    ids: [
      'California',
      'Oregon',
      'Washington',
      'Alaska',
      'Hawaii',
    ],
  },
  {
    label: 'Other US Territories',
    ids: [
      'American Samoa',
      'Guam',
      'Northern Mariana Islands',
      'Puerto Rico',
      'Virgin Islands',
    ],
  },
];

export const { defaultChartId } = Base;
export const spec = Base.makeSpec('US');
