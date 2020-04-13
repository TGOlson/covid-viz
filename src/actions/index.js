import {
  GLOBAL, US, DEATHS, CASES,
} from './const';

import fetchDataset from './fetch-dataset';

export const fetchGlobalData = () => (dispatch) => Promise.all([
  fetchDataset(GLOBAL, DEATHS)(dispatch),
  fetchDataset(GLOBAL, CASES)(dispatch),
]).then(() => dispatch({
  type: `${GLOBAL}_DATA_LOADED`,
}));

export const fetchUSData = () => (dispatch) => Promise.all([
  fetchDataset(US, DEATHS)(dispatch),
  fetchDataset(US, CASES)(dispatch),
]).then(() => dispatch({
  type: `${US}_DATA_LOADED`,
}));
