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
import { getApiUrl } from "@/lib/config/api.config";

export const authApi = {
  async login(credentials: LoginCredentials) {
    const response = await axios.post<LoginResponse>(
      getApiUrl("/auth/login"),
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
      getApiUrl("/auth/password-request"),
      {
        email: data.email,
      }
    );
    return response.data;
  },

  async verifyPasswordResetToken(code: string) {
    const response = await axios.post<PasswordResetVerifyResponse>(
      getApiUrl(`/auth/password-request/verify/${code}`)
    );
    return response.data;
  },

  async resetPassword(data: PasswordReset) {
    const response = await axios.put<PasswordResetResponse>(
      getApiUrl("/auth/password-reset"),
      {
        token: data.token,
        password: data.password,
      }
    );
    return response.data;
  },
};
