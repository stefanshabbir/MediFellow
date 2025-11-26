import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-4xl space-y-12 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            MediFellow
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            Manage your medical appointments and follow-ups with ease. 
            A modern healthcare management platform designed for you.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-8 text-base">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>

        <div className="grid gap-6 pt-8 sm:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 text-left shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Easy Scheduling</h3>
            <p className="text-sm text-muted-foreground">
              Book and manage your appointments effortlessly with our intuitive interface.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-left shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Follow-up Reminders</h3>
            <p className="text-sm text-muted-foreground">
              Never miss an appointment with automated reminders and notifications.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 text-left shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">
              Your health information is protected with enterprise-grade security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
