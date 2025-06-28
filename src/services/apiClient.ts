// src/services/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Sesuaikan URL backend-mu
  headers: {
    'Accept': 'application/json',
  },
});

// Gunakan flag untuk memastikan interceptor hanya sekali dipasang
let isInterceptorAttached = false;

export const setupAxiosInterceptor = (getToken: () => Promise<string | null>) => {
  if (isInterceptorAttached) return;

  apiClient.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  isInterceptorAttached = true;
};

export default apiClient;
