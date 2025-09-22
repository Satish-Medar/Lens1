import React from 'react';

const ChartComponent = ({ data }) => {
  // Calculate basic statistics from the data
  const stats = React.useMemo(() => {
    if (!data || data.length === 0) return null;
    
    const waterLevels = data.map(point => point.water_level_mbgl).filter(level => level != null);
    const avg = waterLevels.reduce((sum, level) => sum + level, 0) / waterLevels.length;
    const min = Math.min(...waterLevels);
    const max = Math.max(...waterLevels);
    
    return { avg: avg.toFixed(2), min, max, count: waterLevels.length };
  }, [data]);

  return (
    <div style={{ height: '100%', padding: '1rem' }}>
      <h3>Data Analysis</h3>
      
      {stats ? (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ marginBottom: '10px', padding: '8px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
            <strong>Water Level Statistics</strong>
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
            <p><strong>Average:</strong> {stats.avg} m</p>
            <p><strong>Minimum:</strong> {stats.min} m</p>
            <p><strong>Maximum:</strong> {stats.max} m</p>
            <p><strong>Data Points:</strong> {stats.count}</p>
          </div>
        </div>
      ) : (
        <p style={{ color: '#666' }}>Loading data...</p>
      )}

      {/* Placeholder for actual charts */}
      <div style={{ 
        height: 'calc(100% - 160px)', 
        border: '2px dashed #ccc', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: '8px',
        backgroundColor: '#f8f9fa'
      }}>
        <h4 style={{ color: '#666', margin: '0 0 10px 0' }}>Data Visualization</h4>
        <p style={{ color: '#888', margin: 0, textAlign: 'center' }}>
          Charts will show:<br/>
          • Water level trends<br/>
          • Regional distribution<br/>
          • Analysis results
        </p>
      </div>
    </div>
  );
};

export default ChartComponent;