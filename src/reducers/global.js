import { spec } from '../data-specs/global';
import { initialChartState } from '../data-specs/utils';

const INITIAL_STATE = {
  cases: null,
  casesTimestamp: null,
  deaths: null,
  deathsTimestamp: null,
  allCountries: null,
  filters: {
    Italy: true,
    US: true,
    UK: true,
    Singapore: true,
    France: false,
    Spain: false,
    Germany: false,
    'S. Korea': false,
  },
  chartState: initialChartState(spec),
  loading: true, // TODO: use this
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCHED_DATASET_global_deaths':
      return {
        ...state,
        deaths: action.value,
      };

    case 'FETCHED_DATASET_global_confirmed':
      return {
        ...state,
        allCountries: action.value.map((x) => x.id),
        cases: action.value,
      };

    case 'FETCHED_TIMESTAMP_global_deaths':
      return {
        ...state,
        deathsTimestamp: action.value,
      };

    case 'FETCHED_TIMESTAMP_global_confirmed':
      return {
        ...state,
        casesTimestamp: action.value,
      };

    case 'TOGGLE_COUNTRY_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.country]: !state.filters[action.country],
        },
      };

    case 'FORM_CONTROL_TOGGLE_global':
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

    case 'GLOBAL_DATA_LOADED':
      return {
        ...state,
        loading: false,
      };

    default: return state;
  }
};
