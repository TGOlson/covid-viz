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

export const filterBefore = (date) => (accessor) => (reducer) => {
  const ts = new Date(date).getTime();

  return accessor(reducer).map(({ id, data }) => ({
    id,
    data: data.filter(({ x }) => x >= ts),
  }));
};

export const filteredDeaths = withFilters(deaths);
export const filteredCases = withFilters(cases);

export const deathsTimestamp = (reducer) => reducer.deathsTimestamp;
export const casesTimestamp = (reducer) => reducer.casesTimestamp;
