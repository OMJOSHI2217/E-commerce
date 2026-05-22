import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { getCategoriesFn, getProductsFn } from "@/lib/api/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noctura — Considered objects for the modern home" },
      { name: "description", content: "Discover editorial-grade electronics, fashion, and furniture from independent makers." },
    ],
  }),
  loader: async () => {
    const [products, categories] = await Promise.all([getProductsFn(), getCategoriesFn()]);
    return { products, categories };
  },
  component: Home,
});

function Home() {
  const { products, categories } = Route.useLoaderData();

  return (
    <div>
      {/* HERO BENTO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-90" aria-hidden />
        <div className="absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 bg-glow blur-3xl" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:px-6 lg:grid-cols-6 lg:px-8 lg:py-16">
          {/* Main hero cell */}
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-surface/40 p-8 backdrop-blur-sm shadow-card lg:col-span-4 lg:row-span-2 lg:p-12">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> New Season · Volume 04
            </div>
            <h1 className="mt-6 max-w-2xl font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Objects worth <em className="text-gradient not-italic">keeping</em>, made for the long night.
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              A curated index of editorial-grade goods from independent ateliers — built slowly, shipped quietly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow transition hover:opacity-90">
                Shop the collection
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link to="/shop" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-6 py-3 text-sm font-medium backdrop-blur hover:bg-surface">
                Browse new arrivals
              </Link>
            </div>
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-[420px] w-[420px] opacity-90">
              <img src={heroImg} alt="Featured product" className="h-full w-full rounded-full object-cover" />
            </div>
          </div>

          {/* Offer */}
          <div className="relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/20 via-surface to-surface p-6 shadow-card lg:col-span-2">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Members Only</p>
            <h3 className="mt-2 font-serif text-3xl">Free express shipping over $250</h3>
            <p className="mt-2 text-sm text-muted-foreground">Plus complimentary engraving on jewelry & leather goods.</p>
            <Link to="/register" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-gold">
              Join Noctura <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Feature tiles */}
          <div className="grid grid-cols-3 gap-4 lg:col-span-2">
            {[
              { icon: Truck, label: "Carbon-neutral delivery" },
              { icon: ShieldCheck, label: "2-year guarantee" },
              { icon: RotateCcw, label: "30-day returns" },
            ].map((f) => (
              <div key={f.label} className="flex flex-col items-start gap-2 rounded-2xl border border-border/60 bg-surface/40 p-4 backdrop-blur-sm">
                <f.icon className="h-5 w-5 text-primary" />
                <p className="text-xs leading-snug text-muted-foreground">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES BENTO */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">01 · Index</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Shop by category</h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1">
            All categories <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {categories.map((c, i) => (
            <Link
              key={c.slug}
              to="/shop"
              className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-card ${
                i === 0 ? "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" : "aspect-square"
              }`}
            >
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <h3 className="font-serif text-2xl">{c.name}</h3>
                  <p className="text-xs text-muted-foreground">{c.count} pieces</p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-background/60 backdrop-blur transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">02 · Selected</p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Featured this week</h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline-flex sm:items-center sm:gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-primary p-10 shadow-glow sm:p-16">
          <div className="grain absolute inset-0" aria-hidden />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">Editorial</p>
              <h3 className="mt-2 font-serif text-4xl text-primary-foreground sm:text-5xl">The Night Issue, now shipping.</h3>
              <p className="mt-4 max-w-md text-primary-foreground/80">Twelve studios. One mood. A limited drop of pieces designed for the small hours.</p>
              <Link to="/shop" className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:bg-surface-elevated">
                Read the index <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {products.slice(2, 5).map((p) => (
                <div key={p.id} className="aspect-[3/4] overflow-hidden rounded-xl">
                  <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">03 · Voices</p>
        <h2 className="mt-2 font-serif text-4xl sm:text-5xl">From our readers</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { q: "The most considered storefront I've shopped this year. Every package feels intentional.", a: "Yuki M.", r: "Tokyo" },
            { q: "Their cashmere knit is the only sweater I've worn this winter. Built to outlast a decade.", a: "Daniel R.", r: "Copenhagen" },
            { q: "I bought the velvet chair on a whim and it transformed the whole apartment. No notes.", a: "Amara O.", r: "Lagos" },
          ].map((t) => (
            <figure key={t.a} className="rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur-sm">
              <blockquote className="font-serif text-2xl leading-snug">"{t.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 text-sm">
                <span className="h-9 w-9 rounded-full bg-gradient-primary" />
                <span>
                  <span className="block">{t.a}</span>
                  <span className="block text-xs text-muted-foreground">{t.r}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
