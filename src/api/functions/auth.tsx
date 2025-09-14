// signup service

import { API_ROUTES } from "api/routes";
import { postRequest } from "utils/axios";

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface SignupResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export const signupUser = async (payload: SignupPayload): Promise<SignupResponse> => {
  return postRequest<SignupResponse>(API_ROUTES.REGISTER, payload);
};
