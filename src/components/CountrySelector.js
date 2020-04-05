import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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
    countries: ['UK', 'Spain', 'France', 'Germany', 'Italy', 'Switzerland', 'Belgium', 'Netherlands'],
  },
  {
    region: 'APAC',
    countries: ['Singapore', 'Taiwan', 'Japan', 'S. Korea', 'Australia'],
  },
];

function CountrySelector({ allCountries, filteredCountries, onFilterToggle }) {
  if (!allCountries) return <p>loading...</p>;

  const defaultGroupings = groupings.map(({ region, countries }) => (
    <FormControl component="fieldset" key={region}>
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
    <div style={{ display: 'inline-flex' }}>
      {defaultGroupings}
    </div>
  );
}

CountrySelector.propTypes = propTypes;
CountrySelector.defaultProps = defaultProps;

export default CountrySelector;
