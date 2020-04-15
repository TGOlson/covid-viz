import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const propTypes = {
  id: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  xFormat: PropTypes.func,
  yFormat: PropTypes.func,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
};

const defaultProps = {
  xFormat: (x) => x,
  yFormat: (x) => x,
};

// TODO: format numbers
const ChartTooltip = ({
  id, color, xFormat, yFormat, x, y,
}) => (
  <Card variant="outlined">
    <CardContent style={{ padding: '8px 8px 6px' }}>
      <div style={{ marginBottom: '2px' }}>
        <span style={{
          width: '12px',
          height: '12px',
          borderRadius: '6px',
          backgroundColor: color,
          display: 'inline-block',
          marginRight: '6px',
        }}
        />
        <Typography variant="body2" component="span" style={{ fontWeight: 500 }} gutterBottom>{id}</Typography>
      </div>
      <Typography variant="body2">{xFormat(x)}</Typography>
      <Typography variant="body2">{yFormat(y)}</Typography>
    </CardContent>
  </Card>
);

ChartTooltip.propTypes = propTypes;
ChartTooltip.defaultProps = defaultProps;

export default ChartTooltip;
