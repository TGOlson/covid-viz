import {
  GLOBAL, US, DEATHS, CASES,
} from './const';

import fetchDataset from './fetch-dataset';

export const fetchGlobalData = () => (dispatch) => fetchDataset(GLOBAL, DEATHS)(dispatch)
  .then(() => fetchDataset(GLOBAL, CASES)(dispatch)).then(() => dispatch({
    type: `${GLOBAL}_DATA_LOADED`,
  }));

export const fetchUSData = () => (dispatch) => fetchDataset(US, DEATHS)(dispatch)
  .then(() => fetchDataset(US, CASES)(dispatch)).then(() => dispatch({
    type: `${US}_DATA_LOADED`,
  }));
