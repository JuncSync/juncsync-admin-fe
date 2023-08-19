import { HTTP_METHOD } from '@/constants/api';

import { axiosRequester } from '@/api/axios/axiosRequester';

// 환자 조회
export const getPatients = async () => {
  const { isOk, data } = await axiosRequester({
    method: HTTP_METHOD.GET,
    url: `/patient`,
  });
  return data;
};

// 환자 수정 Bed In
export const postPatientBedIn = async (patientId: string) => {
  const { isOk, data } = await axiosRequester({
    method: HTTP_METHOD.POST,
    url: `/patient/edit/${patientId}`,
  });
  return data;
};
