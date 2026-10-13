
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("email");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendOTP = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to send OTP.");
      }

      setStep("otp");
      setMessage("A 6 digit verification code has been sent.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "OTP verification failed.");
      }

      const redirectTo = searchParams.get("redirect");

      // Only permit same-site relative paths.
      const safeRedirect =
        redirectTo &&
          redirectTo.startsWith("/") &&
          !redirectTo.startsWith("//") &&
          !redirectTo.startsWith("/\\")
          ? redirectTo
          : "/";

      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome to Kickxwear
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Sign in securely using a one-time email code.
        </p>

        {step === "email" ? (
          <form onSubmit={sendOTP} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand px-4 cursor-pointer py-3 font-medium text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send verification code"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOTP} className="mt-6 space-y-4">
            <p className="text-sm text-gray-600">
              Enter the six-digit code sent to <strong>{email}</strong>.
            </p>

            <div>
              <label
                htmlFor="otp"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Verification code
              </label>

              <input
                id="otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                required
                value={otp}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="000000"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-xl tracking-[0.4em] outline-none focus:border-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full rounded-lg bg-brand px-4 py-3 font-medium text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify and sign in"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setStep("email");
                setOtp("");
                setError("");
                setMessage("");
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 disabled:opacity-60"
            >
              Change email address
            </button>
          </form>
        )}

        {message && (
          <p role="status" className="mt-4 text-sm text-green-700">
            {message}
          </p>
        )}

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
