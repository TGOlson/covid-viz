const BASE_PATH = 'csse_covid_19_data/csse_covid_19_time_series';
const DEATHS_PATH = `${BASE_PATH}/time_series_covid19_deaths_global.csv`;
const CASES_PATH = `${BASE_PATH}/time_series_covid19_confirmed_global.csv`;

// data
const BASE_DATA_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master';

export const GLOBAL_DEATHS_URL = `${BASE_DATA_URL}/${DEATHS_PATH}`;
export const GLOBAL_CASES_URL = `${BASE_DATA_URL}/${CASES_PATH}`;

// timestamps
const BASE_TIMESTAMP_URL = 'https://api.github.com/repos/CSSEGISandData/COVID-19/commits';

const p = (s) => s.replace(/\//g, '%2F');
const params = 'page=1&per_page=1&ref=master';

export const GLOBAL_DEATHS_TIMESTAMP_URL = `${BASE_TIMESTAMP_URL}?path=${p(DEATHS_PATH)}&${params}`;
export const GLOBAL_CASES_TIMESTAMP_URL = `${BASE_TIMESTAMP_URL}?path=${p(CASES_PATH)}&${params}`;
// https://api.github.com/repos/CSSEGISandData/COVID-19/commits?path=csse_covid_19_data%2Fcsse_covid_19_time_series%2Ftime_series_covid19_deaths_global.csv&page=1&per_page=1&ref=master
