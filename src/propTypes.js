import PropTypes from 'prop-types';

export const ChartData = PropTypes.arrayOf(
  PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
