import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in | MediFellow",
  description: "Access your MediFellow account to manage appointments.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-slate-200/70 backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/30">
        <div className="space-y-2 text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-slate-100 px-4 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            MediFellow
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sign in to manage your appointments and follow-ups.
            </p>
          </div>
        </div>
        <LoginForm />
      </div>
      <p className="mt-8 max-w-md text-center text-xs text-slate-500 dark:text-slate-400">
        By continuing, you agree to MediFellow’s{" "}
        <Link href="/terms" className="font-medium text-slate-900 underline dark:text-white">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="font-medium text-slate-900 underline dark:text-white">
          Privacy Policy
        </Link>
        .
      </p>
    </main>
  );
}

