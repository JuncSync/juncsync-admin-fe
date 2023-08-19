import { HTTP_METHOD } from '@/constants/api';

import { axiosRequester } from '@/api/axios/axiosRequester';

import { AuthPayload } from './auth.type';

// 로그인: 계정 로그인
export const postLogin = async (payload: AuthPayload) => {
  const { isOk, data } = await axiosRequester({
    method: HTTP_METHOD.POST,
    url: `/admin/login`,
    data: payload,
  });
  return data;
};

// 유저 조회: 유저 정보 조회
export const getUserInfo = async (): Promise<
  AuthPayload & {
    hospital_id: number;
  }
> => {
  const { isOk, data } = await axiosRequester<
    AuthPayload & {
      hospital_id: number;
    }
  >({
    method: HTTP_METHOD.GET,
    url: `/admin/info`,
  });
  return data;
};
