import axios from 'axios';

// The base URL for our backend API
// In Replit, we use relative URLs since both frontend and backend are served from the same domain
const API_BASE_URL = '/api/v1';

/**
 * Fetches the clean district data from the backend.
 */
export const fetchDistrictData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/district-data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching district data:", error);
    throw error; // Re-throw the error to be handled by the component
  }
};

/**
 * Fetches the AHP recommendations from the backend.
 */
export const fetchRecommendations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/recommendations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    throw error;
  }
};