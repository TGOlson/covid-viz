import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';

import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';

const propTypes = {
  spec: PropTypes.arrayOf(
    PropTypes.shape({
      group: PropTypes.string.isRequired,
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
  base: PropTypes.string.isRequired,
};

// <List component="nav" dense
//    subheader={<ListSubheader disableSticky component="div">Deaths</ListSubheader>}>
//   <ListItem button><ListItemText primary="Cumulative" /></ListItem>
//   <ListItem button><ListItemText primary="Daily" /></ListItem>
//   <ListItem button><ListItemText primary="Rate of Change" /></ListItem>
//   <ListItem button><ListItemText primary="Per Capita" /></ListItem>
// </List>
// <List component="nav" dense
//    subheader={<ListSubheader disableSticky component="div">Cases</ListSubheader>}>
//   <ListItem button><ListItemText primary="Cumulative" /></ListItem>
//   <ListItem button><ListItemText primary="Daily" /></ListItem>
//   <ListItem button><ListItemText primary="Rate of Change" /></ListItem>
//   <ListItem button><ListItemText primary="Per Capita" /></ListItem>
// </List>
// <List component="nav" dense
//    subheader={<ListSubheader disableSticky component="div">Other</ListSubheader>}>
//   <ListItem button><ListItemText primary="Mortality rate" /></ListItem>
//   <ListItem button><ListItemText primary="Full table" /></ListItem>
// </List>

const RightNav = ({ spec, base }) => (
  <div id="right-nav">
    {spec.map(({ group, pages }) => (
      <List
        key={group}
        component="nav"
      >
        <Typography variant="body1" gutterBottom style={{ paddingLeft: '12px' }}>{group}</Typography>
        {pages.map(({ id, label }) => (
          <li className="right-nav-item" key={id}>
            <Link
              color="textSecondary"
              underline="none"
              variant="body1"
              component={RouterLink}
              to={`${base}/${id}`}
              activeClassName="active"
            >
              {label}
            </Link>
          </li>
        ))}
      </List>
    ))}
  </div>
);

RightNav.propTypes = propTypes;

export default RightNav;
