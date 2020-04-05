const INITIAL_STATE = {
  cases: null,
  deaths: null,
  filteredCountries: ['Italy', 'US', 'United Kingdom', 'Singapore', 'France', 'Spain', 'Germany'],
  logScale: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCHED_GLOBAL_CASES':
      return {
        ...state,
        cases: action.values,
      };

    case 'FETCHED_GLOBAL_DEATHS':
      return {
        ...state,
        deaths: action.values,
      };

    default: return state;
  }
};
