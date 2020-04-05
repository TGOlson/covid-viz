const INITIAL_STATE = {
  cases: null,
  deaths: null,
  allCountries: null,
  filteredCountries: {
    Italy: true,
    US: true,
    'United Kingdom': true,
    Singapore: true,
    France: true,
    Spain: true,
    Germany: true,
    'Korea, South': true,
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
