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

      {/* Placeholder for actual map */}
      <div style={{ 
        height: 'calc(100% - 120px)', 
        border: '2px dashed #ccc', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: '8px',
        backgroundColor: '#f8f9fa'
      }}>
        <h4 style={{ color: '#666', margin: '0 0 10px 0' }}>Interactive Map</h4>
        <p style={{ color: '#888', margin: 0, textAlign: 'center' }}>
          Map visualization will show:<br/>
          • Groundwater monitoring locations<br/>
          • Water level data points<br/>
          • Recommended recharge sites
        </p>
      </div>
    </div>
  );
};

export default MapComponent;