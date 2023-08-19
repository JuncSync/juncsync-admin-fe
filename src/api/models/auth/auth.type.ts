export type AuthPayload = {
  id: string;
  password: string;
};

export type UserInfoResponse = AuthPayload & {
  hospital_id: number;
};
