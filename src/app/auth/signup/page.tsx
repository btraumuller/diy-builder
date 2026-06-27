"use client";

import { useState, useActionState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { signupAction } from "./actions";

type AccountType = "diy" | "contractor" | "";

const CONTRACTOR_TYPES = [
  "General Contractor",
  "Electrician",
  "Plumber",
  "HVAC Technician",
  "Carpenter",
  "Painter",
  "Roofer",
  "Flooring Specialist",
  "Mason / Concrete",
  "Drywall / Plasterer",
  "Tile Setter",
  "Landscaper",
  "Cabinet Maker",
  "Welder / Metalworker",
  "Insulation Installer",
  "Other",
];

const inputClass =
  "border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#004990] focus:ring-1 focus:ring-[#004990]";

export default function SignUpPage() {
  const [accountType, setAccountType] = useState<AccountType>("");
  const [contractorType, setContractorType] = useState("");
  const [state, action, isPending] = useActionState(signupAction, {});

  function handleAccountType(type: AccountType) {
    setAccountType(type);
    setContractorType("");
  }

  const isSubmittable =
    accountType === "diy" ||
    (accountType === "contractor" && contractorType !== "");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-lg shadow-md w-full max-w-md p-8">
        {/* Header strip */}
        <div className="bg-[#004990] -mx-8 -mt-8 px-8 py-5 rounded-t-lg mb-8">
          <h1 className="text-white text-2xl font-bold">Create Account</h1>
          <p className="text-blue-200 text-sm mt-1">Join DIY Builder today</p>
        </div>

        {state.success ? (
          <div className="text-center py-6">
            <p className="text-green-700 font-semibold text-lg mb-2">Account created!</p>
            <Link href="/auth/signin" className="text-[#004990] text-sm font-semibold hover:underline">
              Log in now →
            </Link>
          </div>
        ) : (
          <form action={action} className="flex flex-col gap-5">
            {/* Name row */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="firstName" className="text-sm font-semibold text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="Jane"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label htmlFor="lastName" className="text-sm font-semibold text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  placeholder="Doe"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>

            {/* Account type */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-gray-700">
                I am a… <span className="text-red-500">*</span>
              </span>
              {/* Hidden input carries the value into FormData */}
              <input type="hidden" name="accountType" value={accountType} />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleAccountType("diy")}
                  className={`flex-1 border-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                    accountType === "diy"
                      ? "border-[#004990] bg-[#004990] text-white"
                      : "border-gray-300 text-gray-600 hover:border-[#004990] hover:text-[#004990]"
                  }`}
                >
                  DIY Enthusiast
                </button>
                <button
                  type="button"
                  onClick={() => handleAccountType("contractor")}
                  className={`flex-1 border-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                    accountType === "contractor"
                      ? "border-[#004990] bg-[#004990] text-white"
                      : "border-gray-300 text-gray-600 hover:border-[#004990] hover:text-[#004990]"
                  }`}
                >
                  Contractor
                </button>
              </div>
            </div>

            {/* Contractor type — revealed when contractor is selected */}
            {accountType === "contractor" && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="contractorType" className="text-sm font-semibold text-gray-700">
                    What type of contractor are you? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="contractorType"
                    name="contractorType"
                    required
                    value={contractorType}
                    onChange={(e) => setContractorType(e.target.value)}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="" disabled>Select a specialty…</option>
                    {CONTRACTOR_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* "Other" free-text */}
                {contractorType === "Other" && (
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contractorOther" className="text-sm font-semibold text-gray-700">
                      Please describe your specialty <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contractorOther"
                      name="contractorOther"
                      type="text"
                      required
                      placeholder="e.g. Pool Builder"
                      className={inputClass}
                    />
                  </div>
                )}
              </div>
            )}

            {state.error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
                {state.error}
              </p>
            )}

            <button
              type="submit"
              disabled={!isSubmittable || isPending}
              className="bg-[#004990] text-white font-semibold py-2.5 rounded hover:bg-[#003a73] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-1"
            >
              {isPending ? "Creating account…" : "Create Account"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google OAuth */}
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="flex items-center justify-center gap-3 border border-gray-300 rounded py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.1-6.1C34.46 3.09 29.5 1 24 1 14.82 1 7.07 6.48 3.58 14.19l7.1 5.52C12.38 13.67 17.73 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.52 24.5c0-1.64-.15-3.22-.42-4.75H24v9h12.67c-.55 2.96-2.2 5.47-4.68 7.16l7.18 5.57C43.27 37.65 46.52 31.53 46.52 24.5z"/>
                <path fill="#FBBC05" d="M10.68 28.29A14.6 14.6 0 0 1 9.5 24c0-1.49.26-2.93.68-4.29l-7.1-5.52A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.58 10.74l8.1-6.45z"/>
                <path fill="#34A853" d="M24 47c5.5 0 10.12-1.82 13.5-4.94l-7.18-5.57c-1.81 1.22-4.13 1.95-6.32 1.95-6.27 0-11.62-4.17-13.32-9.79l-8.1 6.45C7.07 41.52 14.82 47 24 47z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Sign up with Google
            </button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-[#004990] font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
