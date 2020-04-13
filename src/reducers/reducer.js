import * as Global from '../data-specs/global';
import * as US from '../data-specs/united-states';
import { initialChartState } from '../data-specs/utils';

const initialState = ({ filters, spec, idGroupings }) => ({
  cases: null,
  casesTimestamp: null,
  deaths: null,
  deathsTimestamp: null,
  allIds: null,
  filters,
  idGroupings,
  chartState: initialChartState(spec),
  loading: true,
});

const INITIAL_STATE = {
  global: initialState(Global),
  US: initialState(US),
};

const runReducer = (state, action) => {
  switch (action.type) {
    case 'FETCHED_DATASET_deaths':
      return {
        ...state,
        deaths: action.value,
      };

    case 'FETCHED_DATASET_confirmed':
      return {
        ...state,
        allIds: action.value.map((x) => x.id),
        cases: action.value,
      };

    case 'FETCHED_TIMESTAMP_deaths':
      return {
        ...state,
        deathsTimestamp: action.value,
      };

    case 'FETCHED_TIMESTAMP_confirmed':
      return {
        ...state,
        casesTimestamp: action.value,
      };

    case 'TOGGLE_ID_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.id]: !state.filters[action.id],
        },
      };

    case 'FORM_CONTROL_TOGGLE':
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

    case 'DATA_LOADED':
      return {
        ...state,
        loading: false,
      };

    default: return state;
  }
};

export default (state = INITIAL_STATE, action) => {
  if (action.type.startsWith('global_')) {
    const localAction = {
      ...action,
      type: action.type.replace('global_', ''),
    };

    const localState = runReducer(state.global, localAction);

    return { ...state, global: localState };
  }

  if (action.type.startsWith('US_')) {
    const localAction = {
      ...action,
      type: action.type.replace('US_', ''),
    };

    const localState = runReducer(state.US, localAction);

    return { ...state, US: localState };
  }

  console.error('Unexpected action type', action.type);
  return state;
};
