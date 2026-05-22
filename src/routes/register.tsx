import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { registerUserFn } from "@/lib/api/auth";
export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Join Noctura" }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      return setError("Passwords do not match");
    }

    try {
      await registerUserFn({ data: { name, email, password } });
      navigate({ to: '/login' });
    } catch (err: any) {
      setError(err.message || "Failed to register");
    }
  };

  return (
    <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl place-items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-glow opacity-60" />
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-surface/60 p-8 backdrop-blur shadow-card sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Members get free shipping</p>
        <h1 className="mt-2 font-serif text-4xl">Join Noctura</h1>
        <p className="mt-2 text-sm text-muted-foreground">A quiet account for considered shoppers.</p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Full name</label>
            <input name="name" required className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Ada Lovelace" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input name="email" required type="email" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="you@studio.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Password</label>
              <input name="password" required type="password" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="••••••••" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Confirm</label>
              <input name="confirm" required type="password" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="••••••••" />
            </div>
          </div>
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border bg-surface accent-primary" />
            <span>Send me dispatches from the studio (no more than once a month).</span>
          </label>
          <button type="submit" className="w-full rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">Create account</button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already a member? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
