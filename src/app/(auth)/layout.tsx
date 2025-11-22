"use client";

import "@/app/globals.css";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="min-h-screen bg-brand-ashbg">{children}</div>;
}
