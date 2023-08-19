import axios, { AxiosInstance } from 'axios';

import { BASE_API_URL, RESPONSE_ERROR } from '@/constants/api';

const createAxiosInstance = (): AxiosInstance => {
  const base = axios.create({
    baseURL: BASE_API_URL,
  });

  return base;
};

export const axiosInstance = createAxiosInstance();

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === RESPONSE_ERROR.UNAUTHORIZED) {
      window.location.href = '/login';
      return Promise.resolve(error.message);
    }

    return Promise.resolve(error.response);
  },
);
