"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  useRequestPasswordReset,
  useVerifyPasswordResetToken,
  useResetPassword,
} from "@/hooks/useAuth";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";

type Step = "request" | "verify" | "reset" | "success";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const requestMutation = useRequestPasswordReset();
  const verifyMutation = useVerifyPasswordResetToken();
  const resetMutation = useResetPassword();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    requestMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setStep("verify");
        },
      }
    );
  };

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    verifyMutation.mutate(code, {
      onSuccess: () => {
        setStep("reset");
      },
    });
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return;
    }

    resetMutation.mutate(
      {
        token: code,
        password: password,
      },
      {
        onSuccess: () => {
          setStep("success");
        },
      }
    );
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-brand-main hover:text-brand-main/80 mb-6 transition-fx text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Login</span>
          </Link>
          <div className="text-center">
            <Link
              href="/"
              className="inline-block font-geist-sans font-extrabold text-3xl text-brand-main mb-2"
            >
              PXN Dashboard
            </Link>
            <p className="text-brand-ash text-sm">Reset your password</p>
          </div>
        </div>

        {/* Step 1: Request Reset */}
        {step === "request" && (
          <div className="bg-brand-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">
              Forgot Password?
            </h2>
            <p className="text-brand-ash text-sm mb-6">
              Enter your email address and we&apos;ll send you an OTP to reset
              your password.
            </p>

            <form onSubmit={handleRequestReset} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brand-dark mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-brand-ash" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-brand-ash/30 rounded-lg bg-brand-white text-brand-dark placeholder:text-brand-ash focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent transition-fx"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={requestMutation.isPending}
                className="w-full bg-brand-main text-brand-white py-3 rounded-lg font-medium hover:bg-brand-main/90 focus:outline-none focus:ring-2 focus:ring-brand-main focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-fx flex items-center justify-center gap-2"
              >
                {requestMutation.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand-white border-t-transparent rounded-full animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Verify Token */}
        {step === "verify" && (
          <div className="bg-brand-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">
              Verify OTP
            </h2>
            <p className="text-brand-ash text-sm mb-6">
              Enter the 6-digit OTP sent to your email and phone number.
            </p>

            <form onSubmit={handleVerifyToken} className="space-y-6">
              <div>
                <label
                  htmlFor="code"
                  className="block text-sm font-medium text-brand-dark mb-2"
                >
                  OTP Code
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  required
                  maxLength={6}
                  className="block w-full px-3 py-2 border border-brand-ash/30 rounded-lg bg-brand-white text-brand-dark placeholder:text-brand-ash focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent transition-fx text-center text-2xl tracking-widest"
                  placeholder="000000"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep("request");
                    setCode("");
                  }}
                  className="flex-1 border border-brand-ash/30 text-brand-dark py-3 rounded-lg font-medium hover:bg-brand-ashbg transition-fx"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={verifyMutation.isPending || code.length !== 6}
                  className="flex-1 bg-brand-main text-brand-white py-3 rounded-lg font-medium hover:bg-brand-main/90 focus:outline-none focus:ring-2 focus:ring-brand-main focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-fx flex items-center justify-center gap-2"
                >
                  {verifyMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-white border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === "reset" && (
          <div className="bg-brand-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">
              Reset Password
            </h2>
            <p className="text-brand-ash text-sm mb-6">
              Enter your new password. Make sure it&apos;s strong and secure.
            </p>

            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-brand-dark mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-brand-ash" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-10 py-2 border border-brand-ash/30 rounded-lg bg-brand-white text-brand-dark placeholder:text-brand-ash focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent transition-fx"
                    placeholder="Enter new password"
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-brand-dark mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-brand-ash" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="block w-full pl-10 pr-10 py-2 border border-brand-ash/30 rounded-lg bg-brand-white text-brand-dark placeholder:text-brand-ash focus:outline-none focus:ring-2 focus:ring-brand-main focus:border-transparent transition-fx"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-ash hover:text-brand-main transition-fx"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {password &&
                  confirmPassword &&
                  password !== confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep("verify");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  className="flex-1 border border-brand-ash/30 text-brand-dark py-3 rounded-lg font-medium hover:bg-brand-ashbg transition-fx"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={
                    resetMutation.isPending ||
                    password !== confirmPassword ||
                    password.length < 6
                  }
                  className="flex-1 bg-brand-main text-brand-white py-3 rounded-lg font-medium hover:bg-brand-main/90 focus:outline-none focus:ring-2 focus:ring-brand-main focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-fx flex items-center justify-center gap-2"
                >
                  {resetMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-brand-white border-t-transparent rounded-full animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <div className="bg-brand-white rounded-xl shadow-lg p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-brand-dark mb-2">
              Password Reset Successful!
            </h2>
            <p className="text-brand-ash text-sm mb-6">
              Your password has been reset successfully. You will be redirected
              to the login page.
            </p>
            <button
              onClick={handleBackToLogin}
              className="w-full bg-brand-main text-brand-white py-3 rounded-lg font-medium hover:bg-brand-main/90 transition-fx"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
