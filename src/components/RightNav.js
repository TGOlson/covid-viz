import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

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

const RightNav = ({ spec }) => (
  <div id="right-nav">
    {spec.map(({ group, pages }) => (
      <List
        key={group}
        component="nav"
        dense
        subheader={<ListSubheader disableSticky component="div">{group}</ListSubheader>}
      >
        {pages.map(({ id, label }) => (
          <ListItem key={id} button component={Link} to={id}>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    ))}
  </div>
);

RightNav.propTypes = propTypes;

export default RightNav;
