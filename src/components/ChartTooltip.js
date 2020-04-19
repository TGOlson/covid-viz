import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  xFormat: PropTypes.func,
  yFormat: PropTypes.func,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  dense: PropTypes.bool,
};

const defaultProps = {
  xFormat: (x) => x,
  yFormat: (x) => x,
  dense: false,
};

const ChartTooltip = ({
  label, color, xFormat, yFormat, x, y, dense,
}) => (
  <Card variant="outlined">
    <CardContent style={{ padding: dense ? '6px 6px 4px' : '8px 8px 6px' }}>
      <span style={{
        width: '12px',
        height: '12px',
        borderRadius: '6px',
        backgroundColor: color,
        display: 'inline-block',
        marginRight: '6px',
      }}
      />
      <Typography
        variant="body2"
        component="span"
        style={{ fontWeight: dense ? null : 500 }}
        gutterBottom
      >
        {label}
      </Typography>
      {dense && <Typography variant="body2" component="span"> - </Typography>}
      <Typography
        variant="body2"
        component={dense ? 'span' : 'p'}
      >
        {xFormat(x)}
      </Typography>
      {dense && <Typography variant="body2" component="span">: </Typography>}
      <Typography
        variant="body2"
        component={dense ? 'span' : 'p'}
        style={{ fontWeight: dense ? 500 : null }}
      >
        {yFormat(y)}
      </Typography>
    </CardContent>
  </Card>
);

ChartTooltip.propTypes = propTypes;
ChartTooltip.defaultProps = defaultProps;

export default ChartTooltip;
