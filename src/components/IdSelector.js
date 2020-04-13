import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import CheckIcon from '@material-ui/icons/Check';


const propTypes = {
  // allCountries: PropTypes.arrayOf(PropTypes.string),
  filteredIds: PropTypes.objectOf(PropTypes.bool).isRequired,
  idGroupings: PropTypes.array.isRequired,
  onFilterToggle: PropTypes.func.isRequired,
};

const defaultProps = {
  allCountries: null,
};

const IdSelector = (props) => {
  const { filteredIds, idGroupings, onFilterToggle } = props;

  const subheader = (label) => <ListSubheader disableSticky component="div">{label}</ListSubheader>;

  const icon = <ListItemIcon><CheckIcon color="primary" fontSize="small" /></ListItemIcon>;

  const item = (id) => (
    <ListItem key={id} button onClick={() => onFilterToggle(id)}>
      <ListItemText key={id} primary={id} style={{ marginLeft: '24px' }} />
      {filteredIds[id] ? icon : null}
    </ListItem>
  );

  return idGroupings.map(({ label, ids }) => (
    <List component="nav" key={label} dense subheader={subheader(label)}>
      {ids.map(item)}
    </List>
  ));
};

IdSelector.propTypes = propTypes;
IdSelector.defaultProps = defaultProps;

export default IdSelector;
