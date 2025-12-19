import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth.api";
import type {
  LoginCredentials,
  PasswordResetRequest,
  PasswordReset,
} from "@/lib/interfaces/auth.interface";
import { useRouter } from "next/navigation";
import { success, error } from "@/helpers/Alert";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      // Check if user has admin role
      const roles = data.details?.role || [];
      const isAdmin = roles.includes("admin") || roles.includes("super");

      if (!isAdmin) {
        error("Access denied. Admin privileges required.");
        return;
      }

      // Store token and user info
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", data.authorization.token);
        localStorage.setItem("auth_token", data.authorization.token);
        localStorage.setItem("userRole", JSON.stringify(roles));
        // Store expiration if needed
        if (data.authorization.expiresIn) {
          const expirationTime =
            Date.now() + data.authorization.expiresIn * 1000;
          localStorage.setItem("tokenExpiration", expirationTime.toString());
        }
        // Initialize activity timestamp for inactivity tracking
        localStorage.setItem("lastActivityTimestamp", Date.now().toString());
      }

      // Invalidate queries to refresh data
      queryClient.invalidateQueries();

      // Show success message
      success("Login successful");

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (err: unknown) => {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err.response as { data?: { message?: string; error?: string } })
              ?.data?.message ||
            (err.response as { data?: { message?: string; error?: string } })
              ?.data?.error
          : err && typeof err === "object" && "message" in err
          ? (err.message as string)
          : undefined;
      error(errorMessage || "Login failed. Please check your credentials.");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all queries
      queryClient.clear();

      // Redirect to login
      router.push("/login");
    },
  });
}

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (data: PasswordResetRequest) =>
      authApi.requestPasswordReset(data),
    onSuccess: (data) => {
      success(data.message || "Password reset OTP sent successfully");
    },
    onError: (err: unknown) => {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err.response as { data?: { message?: string } })?.data?.message
          : err && typeof err === "object" && "message" in err
          ? (err.message as string)
          : undefined;
      error(
        errorMessage || "Failed to send password reset OTP. Please try again."
      );
    },
  });
}

export function useVerifyPasswordResetToken() {
  return useMutation({
    mutationFn: (code: string) => authApi.verifyPasswordResetToken(code),
    onSuccess: (data) => {
      success(data.message || "Token verified successfully");
    },
    onError: (err: unknown) => {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err.response as { data?: { message?: string } })?.data?.message
          : err && typeof err === "object" && "message" in err
          ? (err.message as string)
          : undefined;
      error(errorMessage || "Invalid or expired token. Please try again.");
    },
  });
}

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: PasswordReset) => authApi.resetPassword(data),
    onSuccess: (data) => {
      success(data.message || "Password reset successfully");
      // Redirect to login after successful password reset
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    },
    onError: (err: unknown) => {
      const errorMessage =
        err && typeof err === "object" && "response" in err
          ? (err.response as { data?: { message?: string } })?.data?.message
          : err && typeof err === "object" && "message" in err
          ? (err.message as string)
          : undefined;
      error(errorMessage || "Failed to reset password. Please try again.");
    },
  });
}
