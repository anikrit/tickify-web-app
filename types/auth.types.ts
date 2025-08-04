export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  name: string;
  role: string;
};

export type MeResponse = {
  user: User;
};
