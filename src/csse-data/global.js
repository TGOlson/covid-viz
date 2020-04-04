import {GLOBAL_CASES_URL} from './const';

export const fetchGlobalCases = () =>
  fetch(GLOBAL_CASES_URL)
    .then(res => res.text())
    .then(csv => {
      // Need to split on commas that aren't surrounded in quotes... somehow...
      const [header, ...rawRows] = csv.trim().split('\n').map(r => r.split(','));
      const dates = header.slice(4);

      const rows = Object.values(rawRows
        .map(parseRow)
        .reduce(combineRowsByCountry, {}));

      return {dates, rows};
    })

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
