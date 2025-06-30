// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  ENDPOINTS: {
    CONFIGS: '/api/configs',
  },
  TIMEOUT: 10000, // 10 seconds
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Common API headers
export const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
}; 