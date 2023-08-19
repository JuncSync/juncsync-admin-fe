import { queryKeys } from '@/react-query/queryKeys';
import { useMutation } from '@tanstack/react-query';

import {
  postPatientAdmission,
  putPatientBedIn,
} from '@/api/models/patient/patient.api';
import { PatientBedInPayload } from '@/api/models/patient/patient.type';

export const usePostPatientAdmission = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PostPatientAdmission],
    postPatientAdmission,
  );

  return { mutate, isLoading, isSuccess, isError };
};

export const usePutPatientBedInMutation = (
  patientId: string,
  payload: PatientBedInPayload,
) => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    [queryKeys.PutPatientBedIn],
    () => putPatientBedIn(patientId, payload),
  );

  return { mutate, isLoading, isSuccess, isError };
};
