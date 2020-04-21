import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


import RightNav from '../components/RightNav';
import FormattedLineChart from '../components/FormattedLineChart';

import { Reducer } from '../propTypes';
import { GLOBAL, US } from '../actions/const';
import * as globalSpec from '../data-specs/global';
import * as usSpec from '../data-specs/united-states';
import { toNavSpec } from '../data-specs/utils';

const propTypes = {
  store: PropTypes.shape({
    global: Reducer.isRequired,
    US: Reducer.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const getNamespace = (path) => {
  switch (path) {
    case '/global': return GLOBAL;
    case '/united-states': return US;
    default: throw new Error(`Unexpected match fail 'getNamespace': ${path}`);
  }
};

const getSpec = (namespace) => {
  switch (namespace) {
    case GLOBAL: return globalSpec;
    case US: return usSpec; // TODO;
    default: throw new Error(`Unexpected match fail 'getSpec': ${namespace}`);
  }
};

const getReducer = (namespace, store) => {
  switch (namespace) {
    case GLOBAL: return store.global;
    case US: return store.US; // TODO;
    default: throw new Error(`Unexpected match fail 'getReducer': ${namespace}`);
  }
};

const VizPage = (props) => {
  const {
    store,
    match,
    location,
    dispatch,
  } = props;

  const namespace = getNamespace(match.path);
  const { spec, defaultChartId } = getSpec(namespace);
  const reducer = getReducer(namespace, store);
  const basePath = match.path;


  const render = (content) => (
    <div id="main-container">
      <Container maxWidth="md" id="main-content">
        {content}
      </Container>
      <RightNav base={basePath} spec={toNavSpec(spec)} />
    </div>
  );

  const chartId = location.pathname.split('/')[2];
  const chartSpec = spec[chartId];

  // redirect to default if no matches
  if (!chartId || !chartSpec) {
    return <Redirect to={`${basePath}/${defaultChartId}`} />;
  }

  if (reducer.loading) {
    return render(
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="body2" style={{ marginBottom: '24px', fontStyle: 'italic' }}>Fetching most recent data</Typography>
          <CircularProgress />
        </div>
      </div>,
    );
  }

  if (reducer.error) {
    return render(
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '120px' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography variant="body2">
            There was an error loading the most recent dataset.
            Refresh the page to try loading again.
          </Typography>
          <Typography variant="body2">
            If the issue persists, there may be a problem with the
            {' '}
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/CSSEGISandData/COVID-19">source data</a>
            .
          </Typography>
        </div>
      </div>,
    );
  }

  if (chartSpec.component) {
    return render(chartSpec.component(reducer));
  }

  const chartState = reducer.chartState[chartId];

  const data = chartSpec.getData(reducer);
  const updatedAt = chartSpec.getUpdatedAt(reducer);

  const onControlToggle = (key) => dispatch({
    type: `${namespace}_FORM_CONTROL_TOGGLE`,
    value: { chartId, update: { [key]: !chartState[key] } },
  });

  return render(
    <FormattedLineChart
      // from spec
      title={chartSpec.title}
      data={data}
      updatedAt={updatedAt}
      logScaleToggle={chartSpec.logScale}
      normalizeDaysToggle={chartSpec.normalizeDays}
      chartState={chartState}
      group={chartSpec.group}
      label={chartSpec.label}

        // from state
      logScale={chartState.logScale}
      normalizeDays={chartState.normalizeDays}

      // other
      onControlToggle={onControlToggle}
      abbreviations={reducer.abbreviations}
    />,
  );
};

VizPage.propTypes = propTypes;

const mapStateToProps = (store) => ({ store });

export default connect(mapStateToProps)(VizPage);
