import axios, { AxiosError, AxiosInstance } from 'axios';
import { getToken } from './token';
import { processErrorHandle } from './process-error-handle';

const BACKEND_URL = 'http://localhost:5000';
const REQUEST_TIMEOUT = 5000;

const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status !== 401) {
        processErrorHandle(error.message);
      }
      throw error;
    }
  );

  return api;
};

export { createAPI };
