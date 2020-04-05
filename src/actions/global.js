import parseCsv from 'neat-csv';
import { GLOBAL_CASES_URL, GLOBAL_DEATHS_URL } from './const';

const COLUMNS_TO_DROP = {
  'Province/State': true,
  Lat: true,
  Long: true,
};

const COLUMNS_TO_MAP = {
  'Country/Region': 'id',
};

const isDateString = (s) => !isNaN(s);
// const isDateString = (s) => /\d{4}-\d{1,2}-\d{1,2}/.test(s);

const csvOptions = ({
  mapHeaders: ({ header, index }) => { // eslint-disable-line no-unused-vars
    if (COLUMNS_TO_DROP[header]) return null;
    if (COLUMNS_TO_MAP[header]) return COLUMNS_TO_MAP[header];

    // m/d/y where month and day can be one or two digits
    if (/\d{1,2}\/\d{1,2}\/\d{2}/.test(header)) {
      // const [m, d, year] = header.split('/');
      // TODO: pad month and day to two digits?
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
});

const combineRowsById = (accum, row) => {
  const prevValue = accum[row.id] || {};

  const dateKeys = Object.keys(row).filter(isDateString);

  const nextValue = dateKeys.reduce((acc, key) => ({
    ...acc,
    [key]: row[key] + (prevValue[key] || 0),
  }), { id: row.id });

  return {
    ...accum,
    [row.id]: nextValue,
  };
};

const createDataAray = (row) => {
  const dateKeys = Object.keys(row).filter(isDateString);

  const data = dateKeys.map((key) => ({
    x: key,
    y: row[key],
  }), []);

  return { id: row.id, data };
};

const fetchGlobalData = (url) => fetch(url)
  .then((res) => res.text())
  .then((x) => parseCsv(x, csvOptions))
  .then((csv) => Object.values(csv.reduce(combineRowsById, {}))
    .map(createDataAray));

export const fetchGlobalCases = () => (dispatch) => fetchGlobalData(GLOBAL_CASES_URL)
  .then((rows) => dispatch({
    type: 'FETCHED_GLOBAL_CASES',
    values: rows,
  }));

export const fetchGlobalDeaths = () => (dispatch) => fetchGlobalData(GLOBAL_DEATHS_URL)
  .then((rows) => dispatch({
    type: 'FETCHED_GLOBAL_DEATHS',
    values: rows,
  }));
