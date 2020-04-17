import {
  filteredCases, filteredDeaths, deathsTimestamp, casesTimestamp, filterBefore,
} from './accessors';

// Best data after this
const initialDate = new Date('3/1/2020');

const addChanges = ({ id, data }) => {
  const changes = data.map(({ x, y }, index) => {
    const prev = data[index - 1];
    const change = index === 0 ? 0 : y - prev.y;

    return { x, y, change };
  });

  return { id, data: changes };
};

const dayOverDayDelta = (accessor) => (reducer) => accessor(reducer)
  .map(addChanges)
  .map(
    ({ id, data }) => {
      const mapped = data.map(({ x, change }) => ({ x, y: change }));
      return { id, data: mapped };
    },
  );

const dayOverDayRate = (accessor) => (reducer) => accessor(reducer)
  .map(addChanges)
  .map(
    ({ id, data }) => {
      const mapped = data.map(({ x, y, change }) => ({ x, y: y === 0 ? 0 : change / y }));
      return { id, data: mapped };
    },
  );

const mortalityRate = (reducer) => filteredDeaths(reducer).map(({ id, data: deathData }) => {
  // TODO: inefficient to filter cases every map
  const caseData = filteredCases(reducer).find((x) => x.id === id).data;

  const mortalityData = deathData.map(({ x, y: deathCount }, index) => {
    const caseCount = caseData[index].y;
    const rate = caseCount === 0 ? 0 : deathCount / caseCount;
    return { x, y: rate };
  });

  return { id, data: mortalityData };
});

export const defaultChartId = 'deaths-cumulative';

export const makeSpec = (label) => ({
  // deaths
  'deaths-cumulative': {
    title: `Cumulative ${label} Deaths`,
    group: 'Deaths',
    label: 'Cumulative Count',
    getData: filterBefore(initialDate)(filteredDeaths),
    getUpdatedAt: deathsTimestamp,
    logScale: true,
    normalizeDays: 10,
  },
  'deaths-daily': {
    title: `Daily ${label} Deaths`,
    group: 'Deaths',
    label: 'Daily Count',
    getData: dayOverDayDelta(filterBefore(initialDate)(filteredDeaths)),
    getUpdatedAt: deathsTimestamp,
    logScale: true,
  },
  'deaths-change-rate': {
    title: `${label} Deaths Daily Rate of Change`,
    group: 'Deaths',
    label: 'Rate of Change',
    getData: dayOverDayRate(filterBefore(initialDate)(filteredDeaths)),
    getUpdatedAt: deathsTimestamp,
  },

  // cases
  'cases-cumulative': {
    title: `Cumulative ${label} Cases`,
    group: 'Cases',
    label: 'Cumulative Count',
    getData: filterBefore(initialDate)(filteredCases),
    getUpdatedAt: casesTimestamp,
    logScale: true,
    normalizeDays: 50,
  },
  'cases-daily': {
    title: `Daily ${label} Cases`,
    group: 'Cases',
    label: 'Daily Count',
    getData: dayOverDayDelta(filterBefore(initialDate)(filteredCases)),
    getUpdatedAt: casesTimestamp,
    logScale: true,
  },
  'cases-change-rate': {
    title: `${label} Cases Daily Rate of Change`,
    group: 'Cases',
    label: 'Rate of Change',
    getData: dayOverDayRate(filterBefore(initialDate)(filteredCases)),
    getUpdatedAt: casesTimestamp,
  },

  // other
  'mortality-rate': {
    title: `${label} Mortality Rate`,
    group: 'Other',
    label: 'Mortality Rate',
    getData: filterBefore(initialDate)(mortalityRate),
    // TODO: should really take most recent of the two
    getUpdatedAt: deathsTimestamp,
  },
});
