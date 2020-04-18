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
export const deaths = (reducer) => reducer.deaths;
export const cases = (reducer) => reducer.cases;

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

const addChanges = ({ id, data }) => {
  const changes = data.map(({ x, y }, index) => {
    const prev = data[index - 1];
    const change = index === 0 ? 0 : y - prev.y;

    return { x, y, change };
  });

  return { id, data: changes };
};

export const dayOverDayDelta = (accessor) => (reducer) => accessor(reducer)
  .map(addChanges)
  .map(
    ({ id, data }) => {
      const mapped = data.map(({ x, change }) => ({ x, y: change }));
      return { id, data: mapped };
    },
  );

export const dayOverDayRate = (accessor) => (reducer) => accessor(reducer)
  .map(addChanges)
  .map(
    ({ id, data }) => {
      const mapped = data.map(({ x, y, change }) => ({ x, y: y === 0 ? 0 : change / y }));
      return { id, data: mapped };
    },
  );

export const movingAverage = (n) => (accessor) => (reducer) => accessor(reducer)
  .map(({ id, data }) => {
    const averages = data.map(({ x }, index) => {
      if (index < 6) {
        return { x, y: null };
      }

      const prevVals = [...Array(n).keys()].map((offset) => data[index - offset].y);
      const avg = prevVals.reduce((acc, v) => acc + v, 0) / n;

      return { x, y: avg };
    });

    return { id, data: averages };
  });

export const mortalityRate = (reducer) => filteredDeaths(reducer).map(({ id, data: deathData }) => {
  // TODO: inefficient to filter cases every map
  const caseData = filteredCases(reducer).find((x) => x.id === id).data;

  const mortalityData = deathData.map(({ x, y: deathCount }, index) => {
    const caseCount = caseData[index].y;
    const rate = caseCount === 0 ? 0 : deathCount / caseCount;
    return { x, y: rate };
  });

  return { id, data: mortalityData };
});
