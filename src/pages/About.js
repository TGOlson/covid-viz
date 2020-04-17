import React from 'react';
import { NavLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import RightNav from '../components/RightNav';

const About = () => (
  <div id="main-container">
    <Container maxWidth="sm" id="main-content">
      <Typography variant="h4" gutterBottom>
        About This Project
      </Typography>
      <Typography variant="body2" gutterBottom>
        As the coronavirus spreads across the world,
        it can be hard to keep up with the day to day impact,
        as well as the variance of impact around the world.
        The goal of this project is to provide detailed but easy
        to understand visualizations to help people follow this pandemic.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Most charts provided offer multiple views. You can toggle log scale
        or visualize growth normalized by days since 50 cases in a specific region.
        There are also different cuts, such as cumulative growth or rate of change.
      </Typography>
      <Typography variant="body2">
        Not sure where to start? Try one of these:
      </Typography>
      <ul>
        <li>
          <Link
            variant="body2"
            component={NavLink}
            to="global/deaths-cumulative"
          >
            Cumulative Global Deaths
          </Link>
        </li>
        <li>
          <Link
            variant="body2"
            component={NavLink}
            to="united-states/cases-cumulative"
          >
            Cumulative US Cases
          </Link>
        </li>
      </ul>
      <Typography variant="h5" gutterBottom>Data</Typography>
      <Typography variant="body2" gutterBottom>
        All data provided by Center for Systems Science and Engineering at Johns Hopkins University
        (
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/CSSEGISandData/COVID-19">source</a>
        ).
      </Typography>
      <Typography variant="body2" gutterBottom>
        The underlying datasets from Johns Hopkins University are updated roughly every 12 hours,
        and all visualizations will show when the data was last updated.
      </Typography>
      <Typography variant="h5" gutterBottom>Questions or Feedback?</Typography>
      <Typography variant="body2" gutterBottom>
        Tweet me at
        {' '}
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/TyGuyO">@tyguyo</a>
        {', '}
        or open an issue on
        {' '}
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/TGOlson/covid-viz">GitHub</a>
        .
      </Typography>
    </Container>
    <RightNav base="/" spec={[]} />
  </div>
);

export default About;
