import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { getCategoriesFn, getProductsFn } from "@/lib/api/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Noctura" },
      { name: "description", content: "Browse the full catalog of considered objects." },
    ],
  }),
  loader: async () => {
    const [products, categories] = await Promise.all([getProductsFn(), getCategoriesFn()]);
    return { products, categories };
  },
  component: Shop,
});

function Shop() {
  const { products, categories } = Route.useLoaderData();
  const [cat, setCat] = useState<string | null>(null);
  const [sort, setSort] = useState("featured");
  const [price, setPrice] = useState(1500);

  const list = useMemo(() => {
    let l = products.filter((p) => (!cat || p.category === cat) && p.price <= price);
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "rating") l = [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [cat, sort, price]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="border-b border-border/60 pb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catalog</p>
        <h1 className="mt-2 font-serif text-5xl">Shop everything</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">{list.length} pieces, hand-picked from independent ateliers.</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar filters */}
        <aside className="space-y-8">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Category
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setCat(null)} className={`flex w-full justify-between rounded-md px-3 py-2 text-sm hover:bg-surface ${!cat ? "bg-surface text-foreground" : "text-muted-foreground"}`}>
                  All <span className="text-xs">{products.length}</span>
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <button onClick={() => setCat(c.slug)} className={`flex w-full justify-between rounded-md px-3 py-2 text-sm hover:bg-surface ${cat === c.slug ? "bg-surface text-foreground" : "text-muted-foreground"}`}>
                    {c.name} <span className="text-xs">{products.filter(p => p.category === c.slug).length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Price</h4>
            <input type="range" min={50} max={1500} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full accent-primary" />
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>$50</span>
              <span className="text-foreground">Up to ${price}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Brand</h4>
            <div className="space-y-2 text-sm">
              {["Lumen", "Atelier Nord", "Form & Foot", "Maison Or", "North Studio", "Quill"].map((b) => (
                <label key={b} className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" className="h-4 w-4 rounded border-border bg-surface accent-primary" />
                  <span>{b}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Rating</h4>
            <div className="space-y-2 text-sm">
              {[4.5, 4, 3.5].map((r) => (
                <label key={r} className="flex items-center gap-2 text-muted-foreground">
                  <input type="radio" name="rating" className="h-4 w-4 accent-primary" />
                  <span>{r}+ stars</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Availability</h4>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-border bg-surface accent-primary" />
              <span>In stock only</span>
            </label>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <p className="text-sm text-muted-foreground">{list.length} results</p>
            <label className="relative inline-flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="appearance-none rounded-md border border-border bg-surface py-2 pl-3 pr-8 text-sm">
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 h-4 w-4 text-muted-foreground" />
            </label>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
