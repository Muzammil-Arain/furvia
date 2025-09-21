// authService.ts
import { API_ROUTES } from 'api/routes';
import { postRequest } from 'utils/axios';

// ==========================
// Interfaces
// ==========================
interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  data?: any;
}

// Signup
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  phone: string;
}
export const signupUser = async (payload: SignupPayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.REGISTER, payload);
};

// Login
export interface LoginPayload {
  email: string;
  password: string;
}
export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.LOGIN, payload);
};

// Forgot Password (send email / phone)
export interface ForgotPasswordPayload {
  email: string;
}
export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.FORGOT_PASSWORD, payload);
};

// Verification Code (OTP)
export interface VerifyCodePayload {
  otp: string;
}
export const verifyCode = async (payload: VerifyCodePayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.VERIFY_EMAIL, payload);
};

// Verification Code (OTP)
export interface VerifyOTPCodePayload {
  email: string;
  otp: string;
}
export const verifyOTP = async (payload: VerifyOTPCodePayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.OTP_VERIFICATION, payload);
};

// Reset Password
export interface ResetPasswordPayload {
  email: string;
  password: string;
  confirm_password: string;
  reset_token: string; // OTP / verification code
}
export const resetPassword = async (payload: ResetPasswordPayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.RESET_PASSWORD, payload);
};
