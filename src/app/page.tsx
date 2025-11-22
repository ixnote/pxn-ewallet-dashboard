"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Always redirect to login page
    router.push("/login");
  }, [router]);

  // Show loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-ashbg">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-brand-main border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-brand-ash">Redirecting...</p>
      </div>
    </div>
  );
}
