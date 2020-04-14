// locations
export const US = 'US';
export const GLOBAL = 'global';

// datasets
export const DEATHS = 'deaths';
export const CASES = 'confirmed';

export const OWNER = 'CSSEGISandData';
export const REPO = 'COVID-19';

const BASE_DATA_URL = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master';
const BASE_TIMESTAMP_URL = 'https://api.github.com/repos/CSSEGISandData/COVID-19/commits';

const BASE_PATH = 'csse_covid_19_data/csse_covid_19_time_series';

// helpers
export const path = (location, dataset) => `${BASE_PATH}/time_series_covid19_${dataset}_${location}.csv`;
export const dataUrl = (location, dataset) => `${BASE_DATA_URL}/${path(location, dataset)}`;

const f = (s) => s.replace(/\//g, '%2F');
export const timestampUrl = (location, dataset) => `${BASE_TIMESTAMP_URL}?path=${f(path(location, dataset))}&page=1&per_page=1&ref=master`;

// data
export const GLOBAL_DEATHS_URL = dataUrl(GLOBAL, DEATHS);
export const GLOBAL_CASES_URL = dataUrl(GLOBAL, CASES);

// timestamps
export const GLOBAL_DEATHS_TIMESTAMP_URL = timestampUrl(GLOBAL, DEATHS);
export const GLOBAL_CASES_TIMESTAMP_URL = timestampUrl(GLOBAL, CASES);
