import PropTypes from 'prop-types';

export const ChartData = PropTypes.arrayOf(
  PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
);

export const Reducer = PropTypes.shape({
  cases: ChartData,
  deaths: ChartData,
  filters: PropTypes.objectOf(PropTypes.bool).isRequired,
  chartState: PropTypes.objectOf(
    PropTypes.shape({
      logScale: PropTypes.bool,
      normalizeDays: PropTypes.bool,
    }),
  ).isRequired,
});

export const ChartSpec = PropTypes.shape({
  title: PropTypes.string,
  group: PropTypes.string,
  label: PropTypes.string,
  getData: PropTypes.func,
  getUpdatedAt: PropTypes.func,
  logScale: PropTypes.bool,
  normalizeDays: PropTypes.number,
});
