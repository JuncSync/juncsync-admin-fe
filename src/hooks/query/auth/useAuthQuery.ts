import { queryKeys } from '@/react-query/queryKeys';
import { useQuery } from '@tanstack/react-query';

import { getUserInfo } from '@/api/models/auth/auth.api';

export const useUserInfoQuery = () => {
  const { data, isLoading, isSuccess, isError, isFetching, isFetched } =
    useQuery([queryKeys.GetUserInfo], getUserInfo);

  return { data, isLoading, isSuccess, isError, isFetching, isFetched };
};
