import { queryKeys } from '@/react-query/queryKeys';
import { useQuery } from '@tanstack/react-query';

import { getPatients } from '@/api/models/patient/patient.api';

export const useGetPatientsQuery = () => {
  const { data, isLoading, isSuccess, isError, isFetching, isFetched } =
    useQuery([queryKeys.GetPatients], getPatients);

  return { data, isLoading, isSuccess, isError, isFetching, isFetched };
};
