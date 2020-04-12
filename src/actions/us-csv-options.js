const COLUMNS_TO_DROP = {
  UID: true,
  iso2: true,
  iso3: true,
  code3: true,
  FIPS: true,
  Admin2: true,
  Province_State: false,
  Country_Region: true,
  Lat: true,
  Long_: true,
  Combined_Key: true,
  Population: false,
};

const COLUMNS_TO_MAP = {
  Province_State: 'id',
  Population: 'population',
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

    return value;
  },
};
