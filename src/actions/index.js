import {
  GLOBAL, US, DEATHS, CASES,
} from './const';

import fetchDataset from './fetch-dataset';

const fetchAllDatasets = (location) => () => (dispatch) => fetchDataset(location, DEATHS)(dispatch)
  .then(() => fetchDataset(location, CASES)(dispatch)).then(() => dispatch({
    type: `${location}_DATA_LOADED`,
  }))
  .catch((error) => {
    dispatch({
      type: `${location}_DATA_LOAD_ERROR`,
      error,
    });
  });

export const fetchGlobalData = fetchAllDatasets(GLOBAL);
export const fetchUSData = fetchAllDatasets(US);
