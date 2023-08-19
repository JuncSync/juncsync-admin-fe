export type PatientAdmissionPayload = {
  bedId: number;
  patientId: string;
  name: string;
  gender: string;
  diagnosis: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  severity?: string;
  etaHour?: number;
  etaMin?: number;
};

export type PatientBedInPayload = {
  name: string;
  gender: string;
  diagnosis: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  severity?: string;
  etaHour?: number;
  etaMin?: number;
};
