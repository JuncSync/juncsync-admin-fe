import { queryKeys } from '@/react-query/queryKeys';
import { useQuery } from '@tanstack/react-query';

import { getBeds } from '@/api/models/bed/bed.api';
import { PageQueryStrings } from '@/api/models/common/common.type';

export const useGetBedsQuery = (pageQueryString: PageQueryStrings) => {
  const { data, isLoading, isSuccess, isError, isFetching, isFetched } =
    useQuery([queryKeys.GetBeds, pageQueryString.s], () =>
      getBeds(pageQueryString.s),
    );

  return { data, isLoading, isSuccess, isError, isFetching, isFetched };
};
