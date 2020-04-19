import parseCsv from 'neat-csv';

import {
  GLOBAL, dataUrl, timestampUrl,
} from './const';

import { csvOptions, globalConfig, usConfig } from './csv-options';

// Object.keys converts keys to strings
// This is probably an inefficient solution, but oh well
const numberKeys = (obj) => Object.keys(obj).map((x) => parseInt(x, 10)).filter((x) => !isNaN(x));

// A little mutation, but this will get called a bunch
// so worth it for perf improvements on initial render
const combineRowsById = (csv) => {
  // map <id, row>
  const combined = {};

  const keys = numberKeys(csv[0]);

  for (let i = 0; i < csv.length; i++) {
    const row = csv[i];
    const prev = combined[row.id];

    if (!prev) {
      combined[row.id] = row;
    } else {
      for (let j = 0; j < keys.length; j++) {
        const key = numberKeys[i];
        prev[key] = row[key] + prev[key];
      }
    }
  }

  const rows = Object.values(combined);

  return rows.map((row) => {
    const data = keys.map((key) => ({
      x: key,
      y: row[key],
    }), []);

    return { id: row.id, data };
  });
};

const fetchData = (location, dataset) => fetch(dataUrl(location, dataset))
  .then((res) => res.text())
  .then((x) => {
    const config = location === GLOBAL ? globalConfig : usConfig;
    const options = csvOptions(config);

    return parseCsv(x, options);
  })
  .then((csv) => combineRowsById(csv));

const fetchTimestamp = (location, dataset) => fetch(timestampUrl(location, dataset))
  .then((res) => res.json())
  .then((data) => (data[0] ? data[0].commit.committer.date : null))
  .catch((err) => {
    console.error('Error fetching timestamps', err); // eslint-disable-line no-console
    return null;
  });

export default (namespace, dataset) => (dispatch) => fetchData(namespace, dataset).then((rows) => dispatch({
  type: `${namespace}_FETCHED_DATASET_${dataset}`,
  value: rows,
})).then(() => fetchTimestamp(namespace, dataset).then((timestamp) => dispatch({
  type: `${namespace}_FETCHED_TIMESTAMP_${dataset}`,
  value: timestamp,
})));
