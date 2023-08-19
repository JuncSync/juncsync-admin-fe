export type BedResponse = {
  id: number;
  hospital_id: number;
  patient_id?: number;
  patient?: {
    id: string;
    name: string;
    birth_month: string;
    birth_day: string;
    birth_year: string;
    createdAt: string;
    diagnosis: string;
    eta_hour?: string;
    eta_min?: string;
    gender: string;
    hospital_id: number;
    severity?: string;
  };
};

export type Bed = {
  id: number;
  hospitalId: number;
  patientId?: number;
  patient?: {
    id: string;
    name: string;
    birthMonth: string;
    birthDay: string;
    birthYear: string;
    createdAt: string;
    diagnosis: string;
    etaHour?: string;
    etaMin?: string;
    gender: string;
    hospitalId: number;
    severity?: string;
  };
};
