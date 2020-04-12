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
    case 'FETCHED_GLOBAL_CASES':
      return {
        ...state,
        allCountries: action.values.map((x) => x.id),
        cases: action.values,
      };

    case 'FETCHED_GLOBAL_DEATHS':
      return {
        ...state,
        deaths: action.values,
      };

    case 'TOGGLE_COUNTRY_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.country]: !state.filters[action.country],
        },
      };

    case 'GLOBAL_FORM_CONTROL_TOGGLE':
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

    case 'GLOBAL_DEATHS_TIMESTAMP_LOADED':
      return {
        ...state,
        deathsTimestamp: action.value
      }

    case 'GLOBAL_CASES_TIMESTAMP_LOADED':
      return {
        ...state,
        casesTimestamp: action.value
      }

    default: return state;
  }
};
