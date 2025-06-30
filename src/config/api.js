// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    CONFIGS: '/configs',
  },
  TIMEOUT: 30000,
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