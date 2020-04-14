import React from 'react';
import PropTypes from 'prop-types';

import deepEqual from 'deep-equal';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CheckIcon from '@material-ui/icons/Check';

const propTypes = {
  filteredIds: PropTypes.objectOf(PropTypes.bool).isRequired,
  idGroupings: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilterToggle: PropTypes.func.isRequired,
};

class IdSelector extends React.Component {
  constructor(props) {
    super(props);

    const toggleState = props.idGroupings.reduce((accum, { label }) => ({
      ...accum,
      [label]: true,
    }), {});

    this.state = { toggleState };
  }

  componentDidUpdate(prevProps) {
    const { idGroupings } = this.props;

    // TODO: should really be moved to reducer state to avoid this checking
    // this also create a UI jumping bug
    const groupingChange = !deepEqual(prevProps.idGroupings, idGroupings);

    if (groupingChange) {
      const toggleState = idGroupings.reduce((accum, { label }) => ({
        ...accum,
        [label]: true,
      }), {});

      this.setState({ toggleState });
    }
  }

  onToggle = (label) => {
    const { toggleState } = this.state;
    const newToggleState = {
      ...toggleState,
      [label]: !toggleState[label],
    };

    this.setState({
      toggleState: newToggleState,
    });
  }


  render() {
    const { filteredIds, idGroupings, onFilterToggle } = this.props;
    const { toggleState } = this.state;

    const icon = <ListItemIcon><CheckIcon color="primary" fontSize="small" /></ListItemIcon>;

    const item = (id) => (
      <ListItem key={id} button onClick={() => onFilterToggle(id)}>
        <ListItemText key={id} primary={id} style={{ marginLeft: '24px' }} primaryTypographyProps={{ variant: 'body2' }} />
        {filteredIds[id] ? icon : null}
      </ListItem>
    );

    return (
      <div style={{ marginTop: '12px', marginBottom: '36px' }}>
        {idGroupings.map(({ label, ids }) => (
          <List component="nav" key={label} dense disablePadding>
            <ListItem button onClick={() => this.onToggle(label)}>
              <ListItemText
                primary={label}
                style={{ marginLeft: '6px' }}
                primaryTypographyProps={{ variant: 'body2', style: { fontWeight: 500 } }}
              />
            </ListItem>
            <Collapse in={toggleState[label]} timeout="auto" unmountOnExit>
              <List component="nav" dense disablePadding>
                {ids.map(item)}
              </List>
            </Collapse>
          </List>
        ))}
      </div>
    );
  }
}

IdSelector.propTypes = propTypes;

export default IdSelector;
