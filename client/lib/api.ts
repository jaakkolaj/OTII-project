// src/lib/api.ts
import axios, { AxiosError } from 'axios';

export interface ApiError {
  status: 'error';
  statusCode: number;
  message: string;
  errors?: Array<{ field: string; message: string }>;
  code?: string;
  requestId?: string;
}

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api', // localhost:5001 for backend server
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Hae token client-side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    // Normalisoi virhe
    const apiError: ApiError = {
      status: 'error',
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors,
      code: error.response?.data?.code,
      requestId: error.response?.data?.requestId,
    };

    // Automaattinen uloskirjautuminen 401-virheellä
    if (apiError.statusCode === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    return Promise.reject(apiError);
  }
);

export default api;