import { queryKeys } from '@/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';

import { postPatientBedIn } from '@/api/models/patient/patient.api';

export const usePostPatientBedInMutation = (patientId: string) => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostPatientBedIn],
    () => postPatientBedIn(patientId),
  );

  return { mutate, isLoading, isSuccess, isError };
};
