import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden rounded-xl bg-surface shadow-card"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.compareAt && (
          <span className="absolute left-3 top-3 rounded-full bg-gold/90 px-2.5 py-1 text-xs font-medium tracking-wide text-background">
            Sale
          </span>
        )}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-foreground backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
        >
          <Heart className="h-4 w-4" />
        </button>
        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            className="pointer-events-auto flex w-full items-center justify-center gap-2 rounded-lg bg-background/90 px-4 py-2.5 text-sm font-medium backdrop-blur transition hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingBag className="h-4 w-4" /> Add to cart
          </button>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{product.brand}</p>
          <Link to="/product/$id" params={{ id: product.id }} className="mt-1 block truncate font-serif text-lg leading-tight">
            {product.name}
          </Link>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span>{product.rating}</span>
            <span>·</span>
            <span>{product.reviews}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-serif text-lg">${product.price}</p>
          {product.compareAt && (
            <p className="text-xs text-muted-foreground line-through">${product.compareAt}</p>
          )}
        </div>
      </div>
    </div>
  );
}
