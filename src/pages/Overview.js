import React from 'react';
// import { HashRouter, Route, Link } from "react-router-dom";

import LineChart from '../components/LineChart'
// import './App.css';

function Overview() {
  return (
    <div style={{height: '700px', maxWidth:'900px'}}>
    <LineChart />
    </div>
  );
}

export default Overview;
