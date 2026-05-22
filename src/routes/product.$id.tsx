import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getProductsFn } from "@/lib/api/products";
import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  loader: async ({ params }) => {
    const products = await getProductsFn();
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product, products };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Noctura` },
      { name: "description", content: loaderData?.product.description },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-5xl">Not found</h1>
      <p className="mt-3 text-muted-foreground">That piece is no longer in our index.</p>
      <Link to="/shop" className="mt-6 inline-block rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground">Back to shop</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="font-serif text-4xl">Something went wrong</h1>
      <button onClick={reset} className="mt-6 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground">Try again</button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: _product, products } = Route.useLoaderData();
  const product = _product as Product;
  const [qty, setQty] = useState(1);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 text-xs uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> · <Link to="/shop" className="hover:text-foreground">Shop</Link> · <span className="text-foreground">{product.category}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl bg-surface shadow-card">
            <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[product.image, product.image, product.image, product.image].map((src, i) => (
              <button key={i} className={`overflow-hidden rounded-lg border bg-surface ${i === 0 ? "border-primary" : "border-border"}`}>
                <img src={src} alt="" className="aspect-square w-full object-cover opacity-80" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{product.brand}</p>
          <h1 className="mt-2 font-serif text-5xl leading-tight">{product.name}</h1>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" /> {product.rating}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">{product.reviews} reviews</span>
            <span className="text-muted-foreground">·</span>
            <span className={product.inStock !== false ? "text-success" : "text-warning"}>
              {product.inStock !== false ? "In stock" : "Backorder"}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-serif text-4xl">${product.price}</span>
            {product.compareAt && <span className="text-muted-foreground line-through">${product.compareAt}</span>}
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface-elevated">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-surface-elevated">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button className="flex-1 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90">
              Add to cart — ${product.price * qty}
            </button>
            <button aria-label="Wishlist" className="grid h-12 w-12 place-items-center rounded-full border border-border hover:bg-surface">
              <Heart className="h-4 w-4" />
            </button>
          </div>
          <Link to="/checkout" className="mt-3 block w-full rounded-full border border-border bg-background px-6 py-3 text-center text-sm font-medium hover:bg-surface">
            Buy now
          </Link>

          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-border/60 pt-6 text-xs">
            <div className="flex items-start gap-2"><Truck className="h-4 w-4 text-primary" /><span className="text-muted-foreground">Free shipping<br />over $250</span></div>
            <div className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-primary" /><span className="text-muted-foreground">2-year<br />guarantee</span></div>
            <div className="flex items-start gap-2"><RotateCcw className="h-4 w-4 text-primary" /><span className="text-muted-foreground">30-day<br />returns</span></div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-24 border-t border-border/60 pt-12">
        <h2 className="font-serif text-3xl">Reviews</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            { n: "Marco P.", r: 5, t: "Exceeded every expectation. Packaging alone is art." },
            { n: "Selin K.", r: 5, t: "Quiet luxury, exactly as advertised." },
            { n: "Owen J.", r: 4, t: "Fast shipping, beautifully built. Slight color variance from photos." },
            { n: "Petra L.", r: 5, t: "I've ordered from Noctura three times now. Never disappointed." },
          ].map((r) => (
            <div key={r.n} className="rounded-2xl border border-border/60 bg-surface/40 p-5">
              <div className="flex items-center justify-between">
                <span className="font-medium">{r.n}</span>
                <span className="flex">{Array.from({ length: r.r }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />)}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-serif text-3xl">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
