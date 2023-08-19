import { HTTP_METHOD } from '@/constants/api';

import { axiosRequester } from '@/api/axios/axiosRequester';

import { PatientAdmissionPayload, PatientBedInPayload } from './patient.type';

// Patient Admission
export const postPatientAdmission = async (
  payload: PatientAdmissionPayload,
) => {
  const { isOk, data } = await axiosRequester({
    method: HTTP_METHOD.POST,
    url: `/patient/admission`,
    data: {
      bed_id: payload.bedId,
      patient_id: payload.patientId,
      name: payload.name,
      gender: payload.gender,
      diagnosis: payload.diagnosis,
      birth_year: payload.birthYear,
      birth_month: payload.birthMonth,
      birth_day: payload.birthDay,
      severity: payload.severity,
      eta_hour: payload.etaHour,
      eta_min: payload.etaMin,
    },
  });
  return data;
};

// Patient Bed In (Edit)
export const putPatientBedIn = async ({
  patientId,
  payload,
}: {
  patientId: string;
  payload: PatientBedInPayload;
}) => {
  const { isOk, data } = await axiosRequester({
    method: HTTP_METHOD.PUT,
    url: `/patient/edit/${patientId}`,
    data: {
      name: payload.name,
      gender: payload.gender,
      diagnosis: payload.diagnosis,
      birth_year: payload.birthYear,
      birth_month: payload.birthMonth,
      birth_day: payload.birthDay,
      severity: payload.severity,
      eta_hour: payload.etaHour,
      eta_min: payload.etaMin,
    },
  });
  return data;
};
