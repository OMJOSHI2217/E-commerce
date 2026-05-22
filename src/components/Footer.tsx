import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground">N</span>
            <span className="font-serif text-2xl">Noctura</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Considered objects for the modern home, sourced from independent makers and small ateliers around the world.
          </p>
          <form className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-border bg-background">
            <input
              type="email"
              placeholder="Email for new arrivals"
              className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="bg-gradient-primary px-5 text-sm font-medium text-primary-foreground">Subscribe</button>
          </form>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-foreground text-muted-foreground">Electronics</Link></li>
            <li><Link to="/shop" className="hover:text-foreground text-muted-foreground">Fashion</Link></li>
            <li><Link to="/shop" className="hover:text-foreground text-muted-foreground">Shoes</Link></li>
            <li><Link to="/shop" className="hover:text-foreground text-muted-foreground">Accessories</Link></li>
            <li><Link to="/shop" className="hover:text-foreground text-muted-foreground">Furniture</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Studio</h4>
          <ul className="space-y-2 text-sm">
            <li><a className="text-muted-foreground hover:text-foreground" href="#">About</a></li>
            <li><a className="text-muted-foreground hover:text-foreground" href="#">Journal</a></li>
            <li><a className="text-muted-foreground hover:text-foreground" href="#">Stores</a></li>
            <li><a className="text-muted-foreground hover:text-foreground" href="#">Contact</a></li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-surface hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-surface hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-surface hover:text-foreground"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Noctura Studio. All rights reserved.</p>
          <p>Crafted in midnight indigo.</p>
        </div>
      </div>
    </footer>
  );
}
