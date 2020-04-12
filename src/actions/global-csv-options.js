const COLUMNS_TO_DROP = {
  'Province/State': true,
  Lat: true,
  Long: true,
};

const COLUMNS_TO_MAP = {
  'Country/Region': 'id',
};

const isDateString = (s) => !isNaN(s); // eslint-disable-line no-restricted-globals

export default {
  mapHeaders: ({ header, index }) => { // eslint-disable-line no-unused-vars
    if (COLUMNS_TO_DROP[header]) return null;
    if (COLUMNS_TO_MAP[header]) return COLUMNS_TO_MAP[header];

    // m/d/y where month and day can be one or two digits
    if (/\d{1,2}\/\d{1,2}\/\d{2}/.test(header)) {
      return new Date(header).getTime();
    }

    console.warn('Header not transformed:', header); // eslint-disable-line no-console

    return header;
  },
  mapValues: ({ header, index, value }) => { // eslint-disable-line no-unused-vars
    if (isDateString(header)) return parseInt(value, 10);

    if (header === 'id') {
      switch (value) {
        case 'Korea, South': return 'S. Korea';
        case 'Taiwan*': return 'Taiwan';
        case 'United Kingdom': return 'UK';

        default: return value;
      }
    }

    return value;
  },
};
