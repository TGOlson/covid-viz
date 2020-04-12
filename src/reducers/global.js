const INITIAL_STATE = {
  cases: null,
  deaths: null,
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

    default: return state;
  }
};
