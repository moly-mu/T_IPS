export interface SpecialistLoginInput {
  email: string;
  password: string;
}

export interface SpecialistLoginResult {
  user?: any;
  credential?: any;
  error?: string;
}