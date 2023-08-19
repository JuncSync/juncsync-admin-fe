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
