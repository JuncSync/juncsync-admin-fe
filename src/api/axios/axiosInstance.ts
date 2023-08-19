import axios, { AxiosInstance } from 'axios';

import { BASE_API_URL, RESPONSE_ERROR } from '@/constants/api';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/key';

import { deleteCookie } from '@/utils/cookie';

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
      deleteCookie(COOKIE_ACCESS_TOKEN_KEY);
      window.location.href = '/login';
      return Promise.resolve(error.message);
    }

    return Promise.resolve(error.response);
  },
);
