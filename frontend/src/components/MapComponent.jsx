import React, { useRef, useEffect, useState } from 'react';

const MapComponent = ({ data, recommendations }) => {
  const [mapError, setMapError] = useState(false);
  const mapContainer = useRef(null);
  const map = useRef(null);

  // Try to initialize Mapbox map with error handling
  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Dynamically import Mapbox GL to handle missing token gracefully
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');
        
        // Set a placeholder token - user needs to replace this
        mapboxgl.default.accessToken = 'pk.eyJ1IjoidGVzdCIsImEiOiJjbDB0ZXRvemUwMDAwM2ptcnl4cGZqbzF4In0.test';
        
        if (map.current) return; // initialize map only once
        
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [77.6004, 14.6819], // Anantpur coordinates
          zoom: 10
        });

        // Add markers for data points
        if (data && data.length > 0) {
          data.forEach(station => {
            if (station.longitude && station.latitude) {
              new mapboxgl.default.Marker({ color: '#007bff' })
                .setLngLat([station.longitude, station.latitude])
                .setPopup(new mapboxgl.default.Popup().setHTML(
                  `<h6>Station: ${station.station_id}</h6><p>Water Level: ${station.water_level_mbgl} mbgl</p>`
                ))
                .addTo(map.current);
            }
          });
        }

        // Add recommendation markers
        if (recommendations && recommendations.length > 0) {
          recommendations.forEach(rec => {
            if (rec.longitude && rec.latitude) {
              new mapboxgl.default.Marker({ color: '#28a745', scale: 1.2 })
                .setLngLat([rec.longitude, rec.latitude])
                .setPopup(new mapboxgl.default.Popup().setHTML(
                  `<h6>Recommendation!</h6><p>Station: ${rec.station_id}</p><p>Score: ${rec.ahp_score}</p>`
                ))
                .addTo(map.current);
            }
          });
        }
      } catch (error) {
        console.warn('Mapbox initialization failed:', error);
        setMapError(true);
      }
    };

    initializeMap();
  }, [data, recommendations]);

  // Fallback UI if Mapbox fails to load
  if (mapError) {
    return (
      <div style={{ height: '100%', width: '100%', padding: '20px' }}>
        <div style={{ 
          height: '100%', 
          border: '2px solid #007bff', 
          borderRadius: '8px', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <h4 style={{ color: '#007bff', marginBottom: '20px' }}>🗺️ Groundwater Monitoring Stations</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px',
            maxHeight: '400px',
            overflow: 'auto',
            width: '100%',
            padding: '20px'
          }}>
            {data && data.length > 0 ? data.map((station, index) => (
              <div key={station.station_id || index} style={{
                backgroundColor: '#ffffff',
                border: '2px solid #007bff',
                borderRadius: '8px',
                padding: '15px',
                textAlign: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{ fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
                  📍 {station.station_id || `Station ${index + 1}`}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  <div>💧 Water Level: {station.water_level_mbgl || 'N/A'} mbgl</div>
                  <div>🌡️ Temperature: {station.Temperature || 'N/A'}°C</div>
                  {station.latitude && station.longitude && (
                    <div style={{ marginTop: '5px' }}>
                      📍 {station.latitude.toFixed(3)}, {station.longitude.toFixed(3)}
                    </div>
                  )}
                </div>
                {recommendations && recommendations.some(rec => rec.station_id === station.station_id) && (
                  <div style={{ 
                    marginTop: '10px', 
                    color: '#28a745', 
                    fontWeight: 'bold',
                    fontSize: '12px'
                  }}>
                    ⭐ RECOMMENDED
                  </div>
                )}
              </div>
            )) : (
              <div style={{ textAlign: 'center', color: '#666' }}>
                No monitoring stations available
              </div>
            )}
          </div>
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            backgroundColor: '#fff3cd', 
            border: '1px solid #ffeaa7',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#856404',
            textAlign: 'center'
          }}>
            To see the interactive map, please add your Mapbox access token to the MapComponent.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div ref={mapContainer} style={{ height: '100%', borderRadius: '8px' }} />
    </div>
  );
};

export default MapComponent;