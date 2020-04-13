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
      'Connecticut',
      'Maine',
      'Massachusetts',
      'New Hampshire',
      'New Jersey',
      'New York',
      'Pennsylvania',
      'Rhode Island',
      'Vermont',
    ],
  },
  {
    label: 'Midwest',
    ids: [
      'Kansas',
      'Iowa',
      'Illinois',
      'Indiana',
      'Michigan',
      'Minnesota',
      'Missouri',
      'Nebraska',
      'North Dakota',
      'Ohio',
      'South Dakota',
      'Wisconsin',
    ],
  },
  {
    label: 'South',
    ids: [
      'Alabama',
      'Arkansas',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Kentucky',
      'Louisiana',
      'Maryland',
      'Mississippi',
      'North Carolina',
      'Oklahoma',
      'South Carolina',
      'Tennessee',
      'Texas',
      'Virginia',
      'West Virginia',
    ],
  },
  {
    label: 'West',
    ids: [
      'Alaska',
      'Arizona',
      'California',
      'Colorado',
      'Hawaii',
      'Idaho',
      'Montana',
      'Nevada',
      'New Mexico',
      'Oregon',
      'Utah',
      'Washington',
      'Wyoming',
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
