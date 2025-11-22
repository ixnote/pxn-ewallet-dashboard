"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  // Check if already logged in
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || localStorage.getItem("auth_token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      id: formData.id,
      password: formData.password,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-block font-geist-sans font-extrabold text-3xl text-brand-main mb-2"
          >
            PXN Dashboard
          </Link>
          <p className="text-brand-ash text-sm">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-brand-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-brand-dark mb-6">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ID/Email Input */}
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-medium text-brand-dark mb-2"
              >
                Email Address or ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-brand-ash" />
                </div>
                <input
                  type="text"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-brand-ash/30 rounded-lg bg-brand-white text-brand-dark placeholder:text-brand-ash focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent transition-fx"
                  placeholder="Enter your email or ID"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-brand-dark mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-brand-ash" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-brand-ash/30 rounded-lg bg-brand-white text-brand-dark placeholder:text-brand-ash focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent transition-fx"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-ash hover:text-brand-main transition-fx"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-brand-main hover:text-brand-main/80 transition-fx"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-brand-main text-brand-white py-3 rounded-lg font-medium hover:bg-brand-main/90 focus:outline-none focus:ring-2 focus:ring-brand-main focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-fx flex items-center justify-center gap-2"
            >
              {loginMutation.isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-brand-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
