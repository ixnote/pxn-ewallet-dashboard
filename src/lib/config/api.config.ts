/**
 * API Configuration
 * 
 * This file centralizes the API base URL configuration.
 * NEXT_PUBLIC_API_URL is embedded at build time, so it must be set before building.
 * 
 * For Heroku: 
 * 1. Set NEXT_PUBLIC_API_URL in Heroku config vars BEFORE deploying
 * 2. Or trigger a rebuild after setting the env var
 * 
 * IMPORTANT: If you set the env var AFTER building, you MUST rebuild the app!
 */

// Get the API base URL - this is embedded at build time
// If not set during build, it will be undefined/empty string
const getBaseUrl = (): string => {
  // NEXT_PUBLIC_* vars are replaced at build time, so we can't check runtime
  // But we can provide a fallback or better error handling
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  
  if (!baseUrl && typeof window !== "undefined") {
    // Only log error in browser to avoid server-side noise
    console.error(
      "⚠️ NEXT_PUBLIC_API_URL is not set!",
      "\nPlease set it in Heroku config vars and rebuild the app:",
      "\n1. Go to Heroku Dashboard > Settings > Config Vars",
      "\n2. Add NEXT_PUBLIC_API_URL=https://api.pxnapp.com/api/v1",
      "\n3. Redeploy the app"
    );
  }
  
  return baseUrl;
};

// Export the base URL
export const API_BASE_URL = getBaseUrl();

// Helper to construct full API URLs
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = API_BASE_URL;
  
  if (!baseUrl) {
    // If base URL is not set, return endpoint with error indicator
    // This will cause the API call to fail, but with a clear error
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    console.error(`API URL not configured. Attempting: ${cleanEndpoint}`);
    return cleanEndpoint;
  }
  
  // Ensure endpoint starts with /
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // Ensure baseUrl doesn't end with /
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBaseUrl}${cleanEndpoint}`;
};
