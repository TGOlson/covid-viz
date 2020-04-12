/*
  Assumes reducer shape of
  {
    cases: ChartData,
    casesTimestamp: string,
    deaths: ChartData,
    deathsTimestamp, string,
    filters: {string: bool}
  }
*/

// base accessors
const deaths = (reducer) => reducer.deaths;
const cases = (reducer) => reducer.cases;

// TODO: reducer should be made generic
const filters = (reducer) => reducer.filters;

const withFilters = (baseAccessor) => (reducer) => {
  const data = baseAccessor(reducer);
  const fs = filters(reducer);

  return data.filter(({ id }) => fs[id]);
};

export const filteredDeaths = withFilters(deaths);
export const filteredCases = withFilters(cases);

export const deathsTimestamp = (reducer) => reducer.deathsTimestamp;
export const casesTimestamp = (reducer) => reducer.casesTimestamp;
