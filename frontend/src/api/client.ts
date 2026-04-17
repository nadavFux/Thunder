import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authorization
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging (could be replaced with a proper logger)
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });

    // Handle specific error codes
    if (error.response?.status === 401) {
      // Clear token and potentially redirect to login
      localStorage.removeItem('token');
    }

    return Promise.reject(error);
  }
);
