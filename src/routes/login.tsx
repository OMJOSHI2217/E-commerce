import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { store } from "@/lib/store";
import { useState } from "react";
import { loginUserFn } from "@/lib/api/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Noctura" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await loginUserFn({ data: { email, password } });
      store.setUser(res.user);
      navigate({ to: '/' });
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    }
  };

  return (
    <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl place-items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-glow opacity-60" />
      <div className="w-full max-w-md rounded-3xl border border-border/60 bg-surface/60 p-8 backdrop-blur shadow-card sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Welcome back</p>
        <h1 className="mt-2 font-serif text-4xl">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Pick up where you left off.</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input name="email" required type="email" placeholder="you@studio.com" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot?</a>
            </div>
            <input name="password" required type="password" placeholder="••••••••" className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
          </div>
          <button type="submit" className="w-full rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">Sign in</button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
        </div>
        <button onClick={(e) => { e.preventDefault(); alert('Google login not implemented yet'); }} type="button" className="w-full rounded-full border border-border bg-background px-6 py-3 text-sm font-medium hover:bg-surface">Continue with Google</button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here? <Link to="/register" className="text-primary hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
