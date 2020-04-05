import React from 'react';
import PropTypes from 'prop-types';

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
    <div key={region}>
      <h3>{region}</h3>
      <ul>
        {countries.map((country) => (
          <li key={country} onClick={() => onFilterToggle(country)}>
            {country}
            {' '}
            {filteredCountries[country] ? 'X' : ''}
          </li>
        ))}
      </ul>
    </div>
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
