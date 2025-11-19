"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { supabase } from "@/utils/supabase";

type FormFields = {
  email: string;
  password: string;
  remember: boolean;
};

const initialState: FormFields = {
  email: "",
  password: "",
  remember: false,
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function LoginForm() {
  const [form, setForm] = useState<FormFields>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const emailIsValid = /\S+@\S+\.\S+/.test(form.email);
  const passwordIsValid = form.password.trim().length >= 6;
  const formIsValid = emailIsValid && passwordIsValid;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formIsValid) {
      setError("Please enter a valid email and password (min 6 characters).");
      return;
    }

    startTransition(async () => {
      try {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

        if (signInError) {
          setError(signInError.message);
          return;
        }

        setSuccess("Successfully signed in!");
        window.location.href = "/dashboard";
      } catch (submissionError) {
        console.error(submissionError);
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <label className="block text-sm font-medium" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={handleInputChange}
          aria-invalid={!emailIsValid && form.email.length > 0}
          aria-describedby="email-help"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none ring-0 transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-900/60 dark:focus:border-white dark:focus:ring-white/10"
          placeholder="you@example.com"
          required
        />
        <p id="email-help" className="text-xs text-slate-500 dark:text-slate-400">
          We’ll email appointment reminders here.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleInputChange}
          aria-invalid={!passwordIsValid && form.password.length > 0}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none ring-0 transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:border-slate-700 dark:bg-slate-900/60 dark:focus:border-white dark:focus:ring-white/10"
          placeholder="••••••••"
          required
        />
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleInputChange}
              className="size-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="font-medium text-slate-900 underline-offset-4 hover:underline dark:text-white"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition enabled:hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
        <div className="text-center text-sm text-slate-600 dark:text-slate-300">
          New to MediFellow?{" "}
          <Link
            href="/signup"
            className="font-medium text-slate-900 underline-offset-4 hover:underline dark:text-white"
          >
            Create an account
          </Link>
        </div>
      </div>

      <div
        aria-live="polite"
        className="min-h-5 text-sm font-medium text-red-600 dark:text-red-400"
      >
        {error}
      </div>
      <div
        aria-live="polite"
        className="min-h-5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
      >
        {success}
      </div>
    </form>
  );
}

