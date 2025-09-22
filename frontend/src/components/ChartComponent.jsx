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

      {/* Interactive Chart Visualization */}
      <div style={{ 
        height: 'calc(100% - 160px)', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: 'white' }}>
          <strong>📊 Water Level Distribution</strong>
        </div>
        {stats && data ? (
          <div style={{ padding: '15px', height: 'calc(100% - 50px)', overflow: 'auto' }}>
            {/* Simple Bar Chart */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', marginBottom: '10px', color: '#666' }}>
                Water Levels by Station (meters below ground level)
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'end', 
                gap: '2px', 
                height: '120px',
                padding: '10px',
                backgroundColor: 'white',
                borderRadius: '4px',
                overflow: 'auto'
              }}>
                {data.slice(0, 15).map((station, index) => {
                  const level = station.water_level_mbgl || 0;
                  const maxLevel = Math.max(...data.map(s => s.water_level_mbgl || 0));
                  const height = maxLevel > 0 ? (level / maxLevel) * 80 : 10;
                  
                  return (
                    <div key={index} style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      minWidth: '15px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: `${height}px`,
                        backgroundColor: level > stats.avg ? '#dc3545' : '#28a745',
                        borderRadius: '2px 2px 0 0',
                        transition: 'height 0.3s'
                      }} title={`${station.station_id}: ${level}m`} />
                      <div style={{ 
                        fontSize: '8px', 
                        color: '#666', 
                        transform: 'rotate(-45deg)',
                        marginTop: '5px',
                        width: '20px'
                      }}>
                        {(station.station_id || `S${index + 1}`).slice(-3)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: '10px', color: '#666', marginTop: '5px' }}>
                🟢 Below Average • 🔴 Above Average
              </div>
            </div>
            
            {/* Distribution Chart */}
            <div>
              <div style={{ fontSize: '12px', marginBottom: '10px', color: '#666' }}>
                Data Distribution
              </div>
              <div style={{ 
                display: 'flex', 
                gap: '10px',
                flexWrap: 'wrap'
              }}>
                <div style={{ 
                  flex: 1, 
                  minWidth: '100px',
                  padding: '8px', 
                  backgroundColor: '#e8f5e8', 
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#28a745' }}>
                    {stats.min}m
                  </div>
                  <div style={{ fontSize: '10px', color: '#666' }}>Minimum</div>
                </div>
                <div style={{ 
                  flex: 1, 
                  minWidth: '100px',
                  padding: '8px', 
                  backgroundColor: '#e3f2fd', 
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1976d2' }}>
                    {stats.avg}m
                  </div>
                  <div style={{ fontSize: '10px', color: '#666' }}>Average</div>
                </div>
                <div style={{ 
                  flex: 1, 
                  minWidth: '100px',
                  padding: '8px', 
                  backgroundColor: '#ffebee', 
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#d32f2f' }}>
                    {stats.max}m
                  </div>
                  <div style={{ fontSize: '10px', color: '#666' }}>Maximum</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            color: '#666'
          }}>
            Loading chart data...
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartComponent;