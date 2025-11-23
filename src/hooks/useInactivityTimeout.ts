import { useEffect, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const INACTIVITY_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds
const LAST_ACTIVITY_KEY = "lastActivityTimestamp";

export function useInactivityTimeout() {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auth pages that don't need inactivity tracking
  const authPages = ["/login", "/forgot-password"];
  const isAuthPage = authPages.includes(pathname);

  // Clear all auth data and redirect to login
  const handleLogout = useCallback(() => {
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userId");
      localStorage.removeItem("tokenExpiration");
      localStorage.removeItem(LAST_ACTIVITY_KEY);
    }

    // Clear timeouts
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Redirect to login
    router.push("/login");
  }, [router]);

  // Check inactivity and set timeout if needed
  const checkInactivity = useCallback(() => {
    if (typeof window === "undefined") return;

    const storedLastActivity = localStorage.getItem(LAST_ACTIVITY_KEY);
    if (!storedLastActivity) {
      // No stored activity, use current time
      const now = Date.now();
      localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
      lastActivityRef.current = now;

      // Set timeout for full duration
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, INACTIVITY_TIMEOUT);
      return;
    }

    const lastActivity = parseInt(storedLastActivity, 10);
    const timeSinceLastActivity = Date.now() - lastActivity;

    if (timeSinceLastActivity >= INACTIVITY_TIMEOUT) {
      // Already exceeded timeout, log out immediately
      handleLogout();
    } else {
      // Set timeout for remaining time
      const remainingTime = INACTIVITY_TIMEOUT - timeSinceLastActivity;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        handleLogout();
      }, remainingTime);
    }
  }, [handleLogout]);

  // Reset the inactivity timer
  const resetTimer = useCallback(() => {
    const now = Date.now();
    lastActivityRef.current = now;

    // Store last activity in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(LAST_ACTIVITY_KEY, now.toString());
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for full duration
    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, INACTIVITY_TIMEOUT);
  }, [handleLogout]);

  // Activity event handlers
  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  useEffect(() => {
    // Don't track inactivity on auth pages
    if (isAuthPage) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    // Check if user is logged in
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken") ||
          localStorage.getItem("auth_token")
        : null;

    if (!token) {
      // Clear any stored activity timestamp if not logged in
      if (typeof window !== "undefined") {
        localStorage.removeItem(LAST_ACTIVITY_KEY);
      }
      return;
    }

    // Check inactivity first (to handle page refresh case)
    checkInactivity();

    // Also set up a periodic check every minute to catch cases where
    // the page was open in another tab and activity happened there
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(checkInactivity, 60 * 1000); // Check every minute

    // List of events that indicate user activity
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Add event listeners
    events.forEach((event) => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    // Cleanup function
    return () => {
      // Clear timeout and interval
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Remove event listeners
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isAuthPage, handleActivity, resetTimer, checkInactivity]);

  // Reset timer when route changes (if on protected route)
  useEffect(() => {
    if (!isAuthPage && typeof window !== "undefined") {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("auth_token");

      if (token) {
        resetTimer();
      }
    }
  }, [pathname, isAuthPage, resetTimer]);
}
