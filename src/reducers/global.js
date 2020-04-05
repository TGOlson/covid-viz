const INITIAL_STATE = {
  cases: null,
  deaths: null,
  allCountries: null,
  filteredCountries: {
    Italy: true,
    US: true,
    UK: true,
    Singapore: true,
    France: false,
    Spain: true,
    Germany: false,
    'S. Korea': true,
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
        filteredCountries: {
          ...state.filteredCountries,
          [action.country]: !state.filteredCountries[action.country],
        },
      };

    default: return state;
  }
};
