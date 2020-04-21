import { GLOBAL, US } from '../actions/const';
import * as GlobalDataSpec from '../data-specs/global';
import * as USDataSpec from '../data-specs/united-states';

import { initialChartState } from '../data-specs/utils';

const makeInitialState = ({
  filters, spec, idGroupings, abbreviations,
}) => ({
  cases: null,
  casesTimestamp: null,
  deaths: null,
  deathsTimestamp: null,
  allIds: null,
  filters,
  idGroupings,
  abbreviations,
  chartState: initialChartState(spec),
  loading: true,
  error: null,
});

const makeReducer = (namespace, initialState) => (state = initialState, action) => {
  switch (action.type) {
    case `${namespace}_FETCHED_DATASET_deaths`:
      return {
        ...state,
        deaths: action.value,
      };

    case `${namespace}_FETCHED_DATASET_confirmed`:
      return {
        ...state,
        allIds: action.value.map((x) => x.id),
        cases: action.value,
      };

    case `${namespace}_FETCHED_TIMESTAMP_deaths`:
      return {
        ...state,
        deathsTimestamp: action.value,
      };

    case `${namespace}_FETCHED_TIMESTAMP_confirmed`:
      return {
        ...state,
        casesTimestamp: action.value,
      };

    case `${namespace}_TOGGLE_ID_FILTER`:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.id]: !state.filters[action.id],
        },
      };

    case `${namespace}_FORM_CONTROL_TOGGLE`:
      return {
        ...state,
        chartState: {
          ...state.chartState,
          [action.value.chartId]: {
            ...state.chartState[action.value.chartId],
            ...action.value.update,
          },
        },
      };

    case `${namespace}_DATA_LOADED`:
      return {
        ...state,
        loading: false,
      };

    case `${namespace}_DATA_LOAD_ERROR`:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default: return state;
  }
};

export const globalReducer = makeReducer(GLOBAL, makeInitialState(GlobalDataSpec));
export const usReducer = makeReducer(US, makeInitialState(USDataSpec));
