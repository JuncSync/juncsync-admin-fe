import { HTTP_METHOD } from '@/constants/api';

import { axiosRequester } from '@/api/axios/axiosRequester';

import { Bed } from './bed.type';

// 병상 조회
export const getBeds = async (): Promise<Bed[]> => {
  const { isOk, data } = await axiosRequester<Bed[]>({
    method: HTTP_METHOD.GET,
    url: `/bed`,
  });
  return data;
};

// 환자 In
export const postBedIn = async (bedId: string) => {
  const { isOk, data } = await axiosRequester({
    method: HTTP_METHOD.POST,
    url: `/bed/in/${bedId}`,
  });
  return data;
};

// 환자 Out (discharged)
export const postBedOut = async (bedId: string) => {
  const { isOk, data } = await axiosRequester({
    method: HTTP_METHOD.POST,
    url: `/bed/out/${bedId}`,
  });
  return data;
};
