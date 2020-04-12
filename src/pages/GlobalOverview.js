import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LineChart from '../components/LineChart';

import RightNav from '../components/RightNav';

import { spec, defaultChartId } from '../data-specs/global';
import { toNavSpec } from '../data-specs/utils';

const propTypes = {
  // TODO: type this out
  reducer: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,
};

const getChartId = (pathname) => pathname.split('/')[2] || defaultChartId;

function GlobalOverview(props) {
  const {
    reducer,
    location,
  } = props;

  const chartId = getChartId(location.pathname);

  // TODO: should actually route to default when no match
  const chartSpec = spec[chartId] || spec[defaultChartId];

  const data = (reducer.deaths && reducer.cases) ? chartSpec.getData(reducer) : [];
  const updatedAt = chartSpec.getUpdatedAt(reducer);

  const dimension = { height: '500px', maxWidth: '800px' };

  return (
    <div id="main-container">
      <Container maxWidth="md" id="main-content">
        <Typography variant="h4" style={{ marginBottom: '24px' }}>{chartSpec.title}</Typography>
        <Paper
          variant="outlined"
          style={{
            marginTop: '12px',
            marginBottom: '6px',
            margin: 'auto',
            padding: '0 32px 18px',
          }}
        >
          <Container style={dimension} disableGutters>
            <LineChart data={data} />
          </Container>
        </Paper>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          style={{
            textAlign: 'center', fontStyle: 'italic', marginBottom: '12px', marginTop: '12px',
          }}
        >
          {`Data last updated at ${new Date(updatedAt).toLocaleDateString()}.`}
        </Typography>
      </Container>
      <RightNav spec={toNavSpec(spec)} />
    </div>
  );
}

GlobalOverview.propTypes = propTypes;

const mapStateToProps = ({ global }) => ({ reducer: global });

export default connect(mapStateToProps)(GlobalOverview);
