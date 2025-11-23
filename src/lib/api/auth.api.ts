import axios from "axios";
import type {
  LoginCredentials,
  LoginResponse,
  PasswordResetRequest,
  PasswordResetRequestResponse,
  PasswordResetVerifyResponse,
  PasswordReset,
  PasswordResetResponse,
} from "@/lib/interfaces/auth.interface";

export const authApi = {
  async login(credentials: LoginCredentials) {
    const response = await axios.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        id: credentials.id,
        password: credentials.password,
      }
    );
    return response.data;
  },

  async logout() {
    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("tokenExpiration");
    }
  },

  async requestPasswordReset(data: PasswordResetRequest) {
    const response = await axios.post<PasswordResetRequestResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/password-request`,
      {
        email: data.email,
      }
    );
    return response.data;
  },

  async verifyPasswordResetToken(code: string) {
    const response = await axios.post<PasswordResetVerifyResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/password-request/verify/${code}`
    );
    return response.data;
  },

  async resetPassword(data: PasswordReset) {
    const response = await axios.put<PasswordResetResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/password-reset`,
      {
        token: data.token,
        password: data.password,
      }
    );
    return response.data;
  },
};
