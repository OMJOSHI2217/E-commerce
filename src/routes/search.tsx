import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { getProductsFn } from "@/lib/api/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — Noctura" }] }),
  loader: async () => {
    return { products: await getProductsFn() };
  },
  component: Search,
});

const suggestions = ["Cashmere knit", "Leather sneaker", "Brass lamp", "Velvet chair", "Gold chain"];

function Search() {
  const { products } = Route.useLoaderData();
  const [q, setQ] = useState("");
  const results = q ? products.filter((p) => (p.name + p.brand + p.category).toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Find</p>
      <h1 className="mt-2 font-serif text-5xl">Search the index</h1>

      <div className="mt-8 flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-4 focus-within:border-primary">
        <SearchIcon className="h-5 w-5 text-muted-foreground" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, brands, categories…" className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground" />
        {q && <button onClick={() => setQ("")} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>}
      </div>

      {!q && (
        <div className="mt-8">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Try</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button key={s} onClick={() => setQ(s)} className="rounded-full border border-border bg-surface/40 px-4 py-2 text-sm hover:border-primary hover:bg-surface">{s}</button>
            ))}
          </div>
        </div>
      )}

      {q && (
        <div className="mt-10">
          <p className="text-sm text-muted-foreground">{results.length} results for "{q}"</p>
          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
              {results.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-border/60 bg-surface/40 p-12 text-center">
              <p className="font-serif text-2xl">Nothing found</p>
              <p className="mt-2 text-sm text-muted-foreground">Try a different keyword or browse the full shop.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
