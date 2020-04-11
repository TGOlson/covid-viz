import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const RightNav = () => (
  <div>
    <List component="nav" dense subheader={<ListSubheader disableSticky component="div">Deaths</ListSubheader>}>
      <ListItem button><ListItemText primary="Cumulative" /></ListItem>
      <ListItem button><ListItemText primary="Daily" /></ListItem>
      <ListItem button><ListItemText primary="Rate of Change" /></ListItem>
      <ListItem button><ListItemText primary="Per Capita" /></ListItem>
    </List>
    <List component="nav" dense subheader={<ListSubheader disableSticky component="div">Cases</ListSubheader>}>
      <ListItem button><ListItemText primary="Cumulative" /></ListItem>
      <ListItem button><ListItemText primary="Daily" /></ListItem>
      <ListItem button><ListItemText primary="Rate of Change" /></ListItem>
      <ListItem button><ListItemText primary="Per Capita" /></ListItem>
    </List>
    <List component="nav" dense subheader={<ListSubheader disableSticky component="div">Other</ListSubheader>}>
      <ListItem button><ListItemText primary="Mortality rate" /></ListItem>
    </List>
  </div>
);

export default RightNav;
