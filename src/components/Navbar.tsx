import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, Clock } from "lucide-react";
import { useState } from "react";
import { useCart, useUser } from "@/lib/store";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "New" },
  { to: "/shop", label: "Sale" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const cartItems = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
  
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-md md:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">N</span>
          <span className="font-serif text-2xl tracking-tight">Noctura</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link to="/search" aria-label="Search" className="hidden h-9 w-9 place-items-center rounded-md text-muted-foreground transition hover:bg-surface hover:text-foreground sm:grid">
            <Search className="h-4 w-4" />
          </Link>
          <Link to={user ? "/profile" : "/login"} aria-label={user ? "Profile" : "Account"} className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition hover:bg-surface hover:text-foreground">
            <User className="h-4 w-4" />
          </Link>
          {user && (
            <Link to="/orders" aria-label="Order History" className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition hover:bg-surface hover:text-foreground">
              <Clock className="h-4 w-4" />
            </Link>
          )}
          <Link to="/cart" aria-label="Cart" className="relative grid h-9 w-9 place-items-center rounded-md text-muted-foreground transition hover:bg-surface hover:text-foreground">
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
