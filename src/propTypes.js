import PropTypes from 'prop-types';

export const ChartData = PropTypes.arrayOf(
  PropTypes.shape({
    x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
);
