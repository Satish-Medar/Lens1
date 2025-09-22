import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import MapComponent from '../components/MapComponent';
import ChartComponent from '../components/ChartComponent';

const Controls = () => (
  <div>
    <h3>Controls</h3>
    <p>Filter and analysis controls will go here</p>
  </div>
);

const Dashboard = () => {
  return (
    <DashboardLayout
      map={<MapComponent />}
      chart={<ChartComponent />}
      controls={<Controls />}
    />
  );
};

export default Dashboard;