import { queryKeys } from '@/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';

import {
  postPatientAdmission,
  putPatientBedIn,
} from '@/api/models/patient/patient.api';

export const usePostPatientAdmission = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostPatientAdmission],
    postPatientAdmission,
  );

  return { mutate, isLoading, isSuccess, isError };
};

export const usePutPatientBedInMutation = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PutPatientBedIn],
    putPatientBedIn,
  );

  return { mutate, isLoading, isSuccess, isError };
};
