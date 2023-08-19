import axios, { AxiosInstance } from 'axios';

import { BASE_API_URL } from '@/constants/api';

const createAxiosInstance = (): AxiosInstance => {
  const base = axios.create({
    baseURL: BASE_API_URL,
  });

  return base;
};

export const axiosInstance = createAxiosInstance();
