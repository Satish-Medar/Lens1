import React from 'react';

const MapComponent = ({ data, recommendations }) => {
  return (
    <div style={{ height: '100%', padding: '1rem' }}>
      <h3>Groundwater Data Map</h3>
      
      {/* Data Summary */}
      <div style={{ marginBottom: '1rem', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <p><strong>Data Points:</strong> {data?.length || 0} locations</p>
        {recommendations?.length > 0 && (
          <p><strong>Recommendations:</strong> {recommendations.length} optimal locations identified</p>
        )}
      </div>

      {/* Interactive Map Visualization */}
      <div style={{ 
        height: 'calc(100% - 120px)', 
        border: '1px solid #ddd', 
        borderRadius: '8px',
        backgroundColor: '#f0f8ff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '10px', borderBottom: '1px solid #ddd', backgroundColor: 'white' }}>
          <strong>🗺️ Monitoring Stations Map</strong>
        </div>
        <div style={{ 
          position: 'relative', 
          height: 'calc(100% - 50px)', 
          padding: '20px',
          overflow: 'auto'
        }}>
          {data && data.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '10px',
              height: '100%'
            }}>
              {data.slice(0, 12).map((station, index) => (
                <div key={station.station_id || index} style={{
                  backgroundColor: '#ffffff',
                  border: '2px solid #007bff',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  ':hover': { transform: 'scale(1.02)' }
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <div style={{ fontWeight: 'bold', color: '#007bff', fontSize: '12px' }}>
                    📍 {station.station_id || `Station ${index + 1}`}
                  </div>
                  <div style={{ fontSize: '11px', marginTop: '5px' }}>
                    <div>💧 {station.water_level_mbgl ? `${station.water_level_mbgl}m` : 'N/A'}</div>
                    <div>🌡️ {station.Temperature ? `${station.Temperature}°C` : 'N/A'}</div>
                    {station.latitude && station.longitude && (
                      <div style={{ fontSize: '10px', color: '#666' }}>
                        📍 {station.latitude.toFixed(3)}, {station.longitude.toFixed(3)}
                      </div>
                    )}
                  </div>
                  {recommendations && Array.isArray(recommendations) && recommendations.some(rec => rec.station_id === station.station_id) && (
                    <div style={{ 
                      marginTop: '5px', 
                      fontSize: '10px', 
                      color: '#28a745', 
                      fontWeight: 'bold' 
                    }}>
                      ⭐ RECOMMENDED
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '100%',
              color: '#666'
            }}>
              Loading monitoring stations...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;