/**
 * Get the authentication token from localStorage
 * @returns The auth token or empty string if not available
 */
export function getAuthToken(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return (
    localStorage.getItem("authToken") ||
    localStorage.getItem("auth_token") ||
    ""
  );
}

/**
 * Get authorization headers with Bearer token
 * @returns Headers object with Authorization header
 */
export function getAuthHeaders(): { Authorization: string } {
  const token = getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}
