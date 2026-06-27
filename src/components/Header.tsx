"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <header className="w-full bg-[#004990] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-bold tracking-wide hover:text-[#f0a500] transition-colors"
        >
          DIY Builder
        </Link>

        {/* Auth controls */}
        {!loading && (
          <div className="flex items-center gap-4">
            {session ? (
              <>
                <span className="text-sm text-blue-200 hidden sm:block">
                  {session.user?.email}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-white text-[#004990] text-sm font-semibold px-4 py-2 rounded hover:bg-[#f0a500] hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="text-sm text-blue-200 hover:text-white underline underline-offset-2 transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/auth/signin"
                  className="bg-white text-[#004990] text-sm font-semibold px-4 py-2 rounded hover:bg-[#f0a500] hover:text-white transition-colors"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
