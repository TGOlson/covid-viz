import React from 'react';
import { HashRouter, Route, Link } from "react-router-dom";

import './App.css';

import Overview from './pages/Overview';
import Details from './pages/Details';

import {fetchGlobalCases} from "./csse-data/global";

function App() {
  return (
    <HashRouter basename='/'>
      <div>
        <ul>
          <li><Link to="/">Overview</Link></li>
          <li><Link to="/details">Details</Link></li>
        </ul>
      <hr />
      <Route exact path="/" component={Overview} />
      <Route path="/details" component={Details} />
      </div>
   </HashRouter>
  );
}

// simple store, hydrated on page load
const store = {
  // array of days, matches to array values for cases/deaths
  dateRange: null,
  // array of country/array<int>
  allGlobalCases: null,
  filteredGlobalCases:null,
  // array of country/lat/long/array<int>
  globalDeaths: null,
  // array of state/lat/long/array<int>
  usCases: null,
  // array of state/lat/long/array<int>
  usDeaths: null,

  filteredCountries: ["Italy", "US", "Australia", "Singapore"]
}

fetchGlobalCases().then(({dates, rows}) => {
  store.dateRange = dates;
  store.allGlobalCases = rows;

  store.filteredGlobalCases = rows.filter(row => store.filteredCountries.includes(row.country))

  console.log(store);
});

export default App;
