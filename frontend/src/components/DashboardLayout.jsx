import React from 'react';
import './DashboardLayout.css';

const DashboardLayout = ({ map, chart, controls }) => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>AquaLense Dashboard</h1>
      </header>
      
      <main className="dashboard-main-grid">
        <div className="map-area">
          {map}
        </div>
        
        <div className="sidebar-area">
          <div className="controls-area">
            {controls}
          </div>
          
          <div className="chart-area">
            {chart}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;