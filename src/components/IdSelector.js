import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const propTypes = {
  allCountries: PropTypes.arrayOf(PropTypes.string),
  filteredCountries: PropTypes.objectOf(PropTypes.bool).isRequired,
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
    countries: ['UK', 'Spain', 'France', 'Germany'],
  },
  {
    region: 'Europe',
    countries: ['Italy', 'Switzerland', 'Belgium', 'Netherlands'],
  },
  {
    region: 'APAC',
    countries: ['Singapore', 'Taiwan', 'Japan', 'S. Korea', 'Australia'],
  },
];

// TODO: this assumes country toggle only
// Eventually need to add state toggle
function CountrySelector({ allCountries, filteredCountries, onFilterToggle }) {
  // todo: add a search bar for all countries or something

  const defaultGroupings = groupings.map(({ region, countries }) => (
    <FormControl component="fieldset" key={region} margin="dense" size="small">
      <FormLabel component="legend">{region}</FormLabel>
      <FormGroup>
        {countries.map((country) => {
          const checkbox = (
            <Checkbox
              checked={filteredCountries[country]}
              size="small"
              name={country}
              color="primary"
              onChange={() => onFilterToggle(country)}
            />
          );

          return <FormControlLabel key={country} control={checkbox} label={country} />;
        })}
      </FormGroup>
    </FormControl>
  ));

  return (
    <ExpansionPanel elevation="0">
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="body1">Select countries...</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {defaultGroupings}
      </ExpansionPanelDetails>
    </ExpansionPanel>

  );
}

CountrySelector.propTypes = propTypes;
CountrySelector.defaultProps = defaultProps;

export default CountrySelector;
