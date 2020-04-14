import parseCsv from 'neat-csv';

import {
  GLOBAL, dataUrl, timestampUrl,
} from './const';

import { csvOptions, globalConfig, usConfig } from './csv-options';

const isDateString = (s) => !isNaN(s); // eslint-disable-line no-restricted-globals

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

const createDataArray = (row) => {
  const dateKeys = Object.keys(row).filter(isDateString);

  const data = dateKeys.map((key) => ({
    x: key,
    y: row[key],
  }), []);

  return { id: row.id, data };
};

const fetchData = (location, dataset) => fetch(dataUrl(location, dataset))
  .then((res) => res.text())
  .then((x) => {
    const config = location === GLOBAL ? globalConfig : usConfig;
    const options = csvOptions(config);

    return parseCsv(x, options);
  })
  .then((csv) => Object.values(csv.reduce(combineRowsById, {}))
    .map(createDataArray));

const fetchTimestamp = (location, dataset) => fetch(timestampUrl(location, dataset))
  .then((res) => res.json())
  .then((data) => (data[0] ? data[0].commit.committer.date : null))
  .catch((err) => {
    console.error('Error fetching timestamps', err); // eslint-disable-line no-console
    return null;
  });

export default (namespace, dataset) => (dispatch) => Promise.all([
  fetchData(namespace, dataset).then((rows) => dispatch({
    type: `${namespace}_FETCHED_DATASET_${dataset}`,
    value: rows,
  })),
  fetchTimestamp(namespace, dataset).then((timestamp) => dispatch({
    type: `${namespace}_FETCHED_TIMESTAMP_${dataset}`,
    value: timestamp,
  })),
]);
