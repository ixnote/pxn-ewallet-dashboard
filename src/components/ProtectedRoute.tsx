"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Spinner from "./spinner/Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  // List of auth pages that don't require authentication checks
  const authPages = ["/login", "/forgot-password"];
  const isAuthPage = authPages.includes(pathname);
  const [isChecking, setIsChecking] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Track if component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only check auth after component is mounted on client
    if (!isMounted) return;

    // Skip auth checks entirely for auth pages
    if (isAuthPage) {
      setIsChecking(false);
      return;
    }

    const checkAuth = () => {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("auth_token");
      const userRoleStr = localStorage.getItem("userRole");

      let userRoles: string[] = [];
      if (userRoleStr) {
        try {
          userRoles = JSON.parse(userRoleStr);
        } catch {
          userRoles = [];
        }
      }

      const isAdmin =
        userRoles.includes("admin") || userRoles.includes("super");

      if (!token) {
        // User is not authenticated and trying to access protected route
        router.push("/login");
        return;
      }

      if (token && !isAdmin) {
        // User is authenticated but not admin, redirect to login
        localStorage.removeItem("authToken");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiration");
        router.push("/login");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router, pathname, isAuthPage, isMounted]);

  // During SSR and initial mount, render children to avoid hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  // Skip auth check loading for auth pages
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Show loading while checking authentication (client-side only)
  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-brand-ashbg">
        <div className="text-center">
          <Spinner />
          <p className="text-brand-ash mt-4">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
