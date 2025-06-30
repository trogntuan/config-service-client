import axios from 'axios';
import { getApiUrl, getHeaders, API_CONFIG } from '../config/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: getHeaders(),
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const configService = {
  // Get all configurations
  getAllConfigs: async () => {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.CONFIGS);
    return response.data;
  },

  // Get configuration by ID
  getConfigById: async (id) => {
    const response = await apiClient.get(`${API_CONFIG.ENDPOINTS.CONFIGS}/${id}`);
    return response.data;
  },

  // Create new configuration
  createConfig: async (configData) => {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.CONFIGS, configData);
    return response.data;
  },

  // Update configuration
  updateConfig: async (id, configData) => {
    const response = await apiClient.put(`${API_CONFIG.ENDPOINTS.CONFIGS}/${id}`, configData);
    return response.data;
  },

  // Delete configuration
  deleteConfig: async (id) => {
    const response = await apiClient.delete(`${API_CONFIG.ENDPOINTS.CONFIGS}/${id}`);
    return response.data;
  },
};

export default configService; 