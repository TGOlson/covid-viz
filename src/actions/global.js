import {GLOBAL_CASES_URL, GLOBAL_DEATHS_URL} from './const';

export const fetchGlobalCases = () => (dispatch) =>
  fetchGlobalData(GLOBAL_CASES_URL)
    .then(({dateRange, rows}) => {
      dispatch({
        type: 'FETCHED_DATE_RANGE',
        dateRange,
      });

      dispatch({
        type: 'FETCHED_GLOBAL_CASES',
        values: rows,
      });
    })

export const fetchGlobalDeaths = () => (dispatch) =>
  fetchGlobalData(GLOBAL_DEATHS_URL)
    .then(({rows}) => {
      dispatch({
        type: 'FETCHED_GLOBAL_DEATHS',
        values: rows,
      });
    })


const fetchGlobalData = (url) =>
  fetch(url)
    .then(res => res.text())
    .then(csv => {
      // Need to split on commas that aren't surrounded in quotes... somehow...
      const [header, ...rawRows] = csv.trim().split('\n').map(r => r.split(','));
      const dateRange = header.slice(4);

      const rows = rawRows
        .map(parseRow)
        .reduce(combineRowsByCountry, {});

      return {dateRange, rows};
    });


const parseRow = (row) => {
  // const state = row[0]
  const country = row[1]
  // const lat = row[2]
  // const long = row[3]
  const values = row.slice(4).map(x => parseInt(x));

  return {country, values};
};

const combineRowsByCountry = (accum, row) => {
  const prevValue = accum[row.country];

  const nextValue = prevValue
    ? ({
      country: row.country,
      values: addArray(prevValue.values, row.values)
    })
    : row;

  return {
    ...accum,
    [row.country]: nextValue,
  }
}

// add two array of ints, up to length of first array
const addArray = (xs, ys) => xs.reduce((accum, x, index) =>
  [...accum, x + ys[index]]
, [])
