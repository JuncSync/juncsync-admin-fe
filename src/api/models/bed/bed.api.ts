import { HTTP_METHOD } from '@/constants/api';

import { axiosRequester } from '@/api/axios/axiosRequester';

import { PageQueryStrings } from '../common/common.type';
import { BedResponse } from './bed.type';

// 병상 조회
export const getBeds = async (
  pageQueryStrings: PageQueryStrings,
): Promise<BedResponse[]> => {
  const { isOk, data } = await axiosRequester<BedResponse[]>({
    method: HTTP_METHOD.GET,
    url: `/bed`,
    params: {
      s: pageQueryStrings.s,
    },
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
