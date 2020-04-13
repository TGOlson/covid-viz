export const globalConfig = {
  columnMap: {
    // drop
    'Province/State': null,
    Lat: null,
    Long: null,

    // map column map
    'Country/Region': 'id',
  },
  idMap: {
    'Korea, South': 'South Korea',
    'Taiwan*': 'Taiwan',
    'United Kingdom': 'UK',
  },
};

export const usConfig = {
  columnMap: {
    UID: null,
    iso2: null,
    iso3: null,
    code3: null,
    FIPS: null,
    Admin2: null,
    Province_State: 'id',
    Country_Region: null,
    Lat: null,
    Long_: null,
    Combined_Key: null,
    Population: 'population',
  },
  idMap: {},
};

const isDateString = (s) => !isNaN(s); // eslint-disable-line no-restricted-globals

export const csvOptions = ({ columnMap, idMap }) => ({
  mapHeaders: ({ header, index }) => { // eslint-disable-line no-unused-vars
    if (Object.prototype.hasOwnProperty.call(columnMap, header)) {
      return columnMap[header];
    }

    // m/d/y where month and day can be one or two digits
    if (/\d{1,2}\/\d{1,2}\/\d{2}/.test(header)) {
      return new Date(header).getTime();
    }

    // Try to map all headers so we don't just pass through values
    console.warn('Header not transformed:', header); // eslint-disable-line no-console

    return header;
  },
  mapValues: ({ header, index, value }) => { // eslint-disable-line no-unused-vars
    if (isDateString(header)) return parseInt(value, 10);

    if (header === 'id' && idMap[value]) {
      return idMap[value];
    }

    return value;
  },
});
