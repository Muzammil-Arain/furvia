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
  email: string;
  code: string;
}
export const verifyCode = async (payload: VerifyCodePayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.VERIFY_EMAIL, payload);
};

// Reset Password
export interface ResetPasswordPayload {
  email: string;
  password: string;
  password_confirmation: string;
  code: string; // OTP / verification code
}
export const resetPassword = async (payload: ResetPasswordPayload): Promise<AuthResponse> => {
  return postRequest<AuthResponse>(API_ROUTES.RESET_PASSWORD, payload);
};







//////////////////////////////

// import { loginUser, forgotPassword, verifyCode, resetPassword, signupUser } from "services/authService";

// // ✅ Login
// const doLogin = async () => {
//   try {
//     const res = await loginUser({ email: "test@test.com", password: "123456" });
//     console.log("Login success:", res);
//   } catch (err) {
//     console.log("Login error:", err);
//   }
// };

// // ✅ Forgot password
// const doForgot = async () => {
//   await forgotPassword({ email: "test@test.com" });
// };

// // ✅ Verify OTP
// const doVerify = async () => {
//   await verifyCode({ email: "test@test.com", code: "123456" });
// };

// // ✅ Reset password
// const doReset = async () => {
//   await resetPassword({
//     email: "test@test.com",
//     password: "newpassword",
//     password_confirmation: "newpassword",
//     code: "123456",
//   });
// };
