import parseCsv from 'neat-csv';
import { Octokit } from '@octokit/rest';

import {
  GLOBAL, dataUrl, path, OWNER, REPO,
} from './const';

import globalCsvOptions from './global-csv-options';
import usCsvOptions from './us-csv-options';

const octokit = new Octokit();

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

const createDataAray = (row) => {
  const dateKeys = Object.keys(row).filter(isDateString);

  const data = dateKeys.map((key) => ({
    x: key,
    y: row[key],
  }), []);

  return { id: row.id, data };
};

const fetchData = (location, dataset) => fetch(dataUrl(location, dataset))
  .then((res) => res.text())
  .then((x) => parseCsv(x, (location === GLOBAL ? globalCsvOptions : usCsvOptions)))
  .then((csv) => Object.values(csv.reduce(combineRowsById, {}))
    .map(createDataAray));

const fetchTimestamp = (location, dataset) => octokit.repos.listCommits({
  owner: OWNER,
  repo: REPO,
  page: 1,
  per_page: 1,
  path: path(location, dataset),
}).then(({ data }) => (data[0] ? data[0].commit.committer.date : null))
  .catch((err) => {
    console.error('Error fetching timestamps', err); // eslint-disable-line no-console
    return null;
  });

export default (location, dataset) => (dispatch) => Promise.all([
  fetchData(location, dataset).then((rows) => dispatch({
    type: `FETCHED_DATASET_${location}_${dataset}`,
    value: rows,
  })),
  fetchTimestamp(location, dataset).then((timestamp) => dispatch({
    type: `FETCHED_TIMESTAMP_${location}_${dataset}`,
    value: timestamp,
  })),
]);
