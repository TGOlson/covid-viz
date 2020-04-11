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
  onFilterToggle: PropTypes.func.isRequired,
};

const defaultProps = {
  allCountries: null,
};

// Default groupings
const groupings = [
  {
    region: 'Americas',
    countries: ['US', 'Canada', 'Mexico', 'Brazil'],
  },
  {
    region: 'Europe',
    countries: ['UK', 'Spain', 'France', 'Germany', 'Italy', 'Switzerland', 'Belgium', 'Netherlands'],
  },
  {
    region: 'APAC',
    countries: ['Singapore', 'Taiwan', 'Japan', 'S. Korea', 'Australia'],
  },
];

// TODO: this assumes country toggle only
// Eventually need to add state toggle

class CountrySelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredIds: props.filteredIds,
    };
  }

  onFilterToggle = (id) => {
    const filteredIds = {
      ...this.state.filteredIds,
      [id]: !this.state.filteredIds[id],
    };

    this.setState({
      filteredIds,
    }, () => this.props.onFilterToggle(id));
  }

  render() {
    const { filteredIds } = this.state;

    const subheader = (region) => <ListSubheader disableSticky component="div">{region}</ListSubheader>;

    const icon = <ListItemIcon><CheckIcon color="primary" fontSize="small" /></ListItemIcon>;

    const item = (id) => (
      <ListItem key={id} button onClick={() => this.onFilterToggle(id)}>
        <ListItemText key={id} primary={id} style={{ marginLeft: '24px' }} />
        {filteredIds[id] ? icon : null}
      </ListItem>
    );

    return groupings.map(({ region, countries }) => (
      <List component="nav" key={region} dense subheader={subheader(region)}>
        {countries.map(item)}
      </List>
    ));
  }
}

CountrySelector.propTypes = propTypes;
CountrySelector.defaultProps = defaultProps;

export default CountrySelector;
