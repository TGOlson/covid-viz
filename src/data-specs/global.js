import {
  filteredCases, filteredDeaths, deathsTimestamp, casesTimestamp,
} from './accessors';

const computeDayOverDayChange = ({ id, data }) => {
  const changes = data.map(({ x, y }, index) => {
    const prev = data[index - 1];
    const change = (index === 0 || prev.y === 0) ? 0 : ((y - prev.y) / prev.y);

    return { x, y: change };
  });

  return { id, data: changes };
};

const filterBeforeDate = (date) => ({ id, data }) => ({
  id,
  data: data.filter(({ x }) => x >= new Date(date).getTime()),
});

const dayOverDayChangeInCases = (reducer) => filteredCases(reducer).map(computeDayOverDayChange).map(filterBeforeDate('3/5/2020'));
const dayOverDayChangeInDeaths = (reducer) => filteredDeaths(reducer).map(computeDayOverDayChange).map(filterBeforeDate('3/5/2020'));

const mortalityRate = (reducer) => filteredDeaths(reducer).map(({ id, data: deathData }) => {
  // TODO: inefficient to filter cases every map
  const caseData = filteredCases(reducer).find((x) => x.id === id).data;

  const mortalityData = deathData.map(({ x, y: deathCount }, index) => {
    const caseCount = caseData[index].y;
    const rate = caseCount === 0 ? 0 : deathCount / caseCount;
    return { x, y: rate };
  });

  return { id, data: mortalityData };
}).map(filterBeforeDate('3/5/2020'));

export const defaultChartId = 'deaths-cumulative';

export const spec = {
  // deaths
  'deaths-cumulative': {
    title: 'Cumulative Global Deaths',
    group: 'Deaths',
    label: 'Cumulative',
    getData: filteredDeaths,
    getUpdatedAt: deathsTimestamp,
    logScale: true,
    normalizeDays: 10,
  },
  'deaths-change-rate': {
    title: ' Global Deaths Daily Rate of Change',
    group: 'Deaths',
    label: 'Rate of Change',
    getData: dayOverDayChangeInDeaths,
    getUpdatedAt: deathsTimestamp,
  },

  // cases
  'cases-cumulative': {
    title: 'Cumulative Global Cases',
    group: 'Cases',
    label: 'Cumulative',
    getData: filteredCases,
    getUpdatedAt: casesTimestamp,
    logScale: true,
    normalizeDays: 50,
  },
  'cases-change-rate': {
    title: ' Global Cases Daily Rate of Change',
    group: 'Cases',
    label: 'Rate of Change',
    getData: dayOverDayChangeInCases,
    getUpdatedAt: casesTimestamp,
  },

  // other
  'mortality-rate': {
    title: 'Mortality Rate',
    group: 'Other',
    label: 'Mortality Rate',
    getData: mortalityRate,
    // TODO: should really take most recent of the two
    getUpdatedAt: deathsTimestamp,
  },
};
