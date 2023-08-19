import { queryKeys } from '@/react-query/queryKeys';
import { useQuery } from '@tanstack/react-query';

import { getBeds } from '@/api/models/bed/bed.api';

export const useGetBedsQuery = () => {
  const { data, isLoading, isSuccess, isError, isFetching, isFetched } =
    useQuery([queryKeys.GetBeds], getBeds);

  return { data, isLoading, isSuccess, isError, isFetching, isFetched };
};
