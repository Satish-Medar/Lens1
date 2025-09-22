import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import MapComponent from '../components/MapComponent';
import ChartComponent from '../components/ChartComponent';
import { fetchDistrictData, fetchRecommendations } from '../api/apiService';

const Controls = ({ onAnalysisClick, loading }) => (
  <div>
    <h3>Controls</h3>
    <p>Run groundwater analysis to get location recommendations</p>
    <button 
      onClick={onAnalysisClick} 
      disabled={loading}
      style={{
        padding: '10px 20px',
        backgroundColor: loading ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer'
      }}
    >
      {loading ? 'Running Analysis...' : 'Run AHP Analysis'}
    </button>
  </div>
);

const Dashboard = () => {
  const [districtData, setDistrictData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial district data when the component loads
  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchDistrictData();
        setDistrictData(data);
      } catch (err) {
        setError("Failed to load district data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); // Empty array means this runs only once on mount

  // Handle the click event for the analysis button
  const handleAnalysisClick = async () => {
    try {
      setError(null);
      setLoading(true);
      const recs = await fetchRecommendations();
      setRecommendations(recs);
    } catch (err) {
      setError("Failed to run analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      map={<MapComponent data={districtData} recommendations={recommendations} />}
      chart={<ChartComponent data={districtData} />}
      controls={<Controls onAnalysisClick={handleAnalysisClick} loading={loading} />}
    />
  );
};

export default Dashboard;