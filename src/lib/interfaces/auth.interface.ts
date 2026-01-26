export interface LoginCredentials {
  id: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  authorization: {
    token: string;
    expiresIn: number;
  };
  details: {
    hasStore: boolean;
    role: string[];
  };
}

export interface AuthError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetRequestResponse {
  success: boolean;
  message: string;
}

export interface PasswordResetVerifyResponse {
  success: boolean;
  message?: string;
  data?: { email?: string };
}

export interface PasswordReset {
  token: string;
  password: string;
  email: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message?: string;
}
