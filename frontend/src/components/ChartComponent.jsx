import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data }) => {
  // Prepare chart data from actual groundwater data
  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.slice(0, 10).map((station, index) => ({
      station: station.station_id || `Station ${index + 1}`,
      'Water Level': station.water_level_mbgl || 0,
      'Temperature': station.Temperature || 0
    }));
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading chart data...</p>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%', padding: '10px' }}>
      <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Groundwater Monitoring Stations</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="station" 
            angle={-45}
            textAnchor="end"
            height={80}
            fontSize={10}
          />
          <YAxis 
            label={{ value: 'Water Level (mbgl)', angle: -90, position: 'insideLeft' }} 
            fontSize={10}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="Water Level" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;