const INITIAL_STATE = {
  dateRange: null,
  global: {
    cases: null,
    deaths: null,
    filteredCountries: ['Italy', 'US', 'United Kingdom', 'Singapore', 'France', 'Spain', 'Germany'],
    logScale: true,
  },
  unitedStates: {
    cases: null,
    deaths: null,
  },
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCHED_DATE_RANGE':
      return {
        ...state,
        dateRange: action.dateRange
      };

    case 'FETCHED_GLOBAL_CASES':
      return {
        ...state,
        global: {
          ...state.global,
          cases: action.values
        }
      }

    case 'FETCHED_GLOBAL_DEATHS':
      return {
        ...state,
        global: {
          ...state.global,
          deaths: action.values
        }
      }

    case 'TOGGLE_GLOBAL_LOG_SCALE':
      return {
        ...state,
        global: {
          ...state.global,
          logScale: !state.global.logScale
        }
      }

    default: return state;
  }
}
