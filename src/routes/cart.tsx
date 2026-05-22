import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X, Tag } from "lucide-react";
import { useCart, store } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Noctura" }] }),
  component: Cart,
});

function Cart() {
  const items = useCart();

  const subtotal = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const shipping = subtotal > 250 ? 0 : 18;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Bag</p>
      <h1 className="mt-2 font-serif text-5xl">Your cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-border/60 bg-surface/40 p-12 text-center">
              <p className="font-serif text-2xl">Your bag is empty</p>
              <Link to="/shop" className="mt-4 inline-block rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground">Browse shop</Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-2xl border border-border/60 bg-surface/40 p-4">
                <Link to="/product/$id" params={{ id: item.id }} className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-surface">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.brand}</p>
                      <Link to="/product/$id" params={{ id: item.id }} className="font-serif text-xl">{item.name}</Link>
                    </div>
                    <button onClick={() => store.setCart(items.filter((i) => i.id !== item.id))} aria-label="Remove" className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-surface hover:text-foreground">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex items-center gap-1 rounded-full border border-border bg-background px-1 py-1">
                      <button onClick={() => store.setCart(items.map((i) => i.id === item.id ? { ...i, qty: Math.max(1, (i.qty || 1) - 1) } : i))} className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-7 text-center text-sm">{item.qty || 1}</span>
                      <button onClick={() => store.setCart(items.map((i) => i.id === item.id ? { ...i, qty: (i.qty || 1) + 1 } : i))} className="grid h-7 w-7 place-items-center rounded-full hover:bg-surface">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="font-serif text-xl">${item.price * item.qty}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="h-fit rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping}`}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>Calculated at checkout</dd></div>
          </dl>
          <div className="my-5 flex overflow-hidden rounded-full border border-border bg-background">
            <span className="grid place-items-center pl-4 text-muted-foreground"><Tag className="h-4 w-4" /></span>
            <input placeholder="Promo code" className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground" />
            <button className="px-4 text-sm font-medium hover:bg-surface">Apply</button>
          </div>
          <div className="flex items-baseline justify-between border-t border-border/60 pt-4">
            <span className="font-serif text-xl">Total</span>
            <span className="font-serif text-3xl">${total}</span>
          </div>
          <Link to="/checkout" className="mt-6 block w-full rounded-full bg-gradient-primary px-6 py-3 text-center text-sm font-medium text-primary-foreground shadow-glow">
            Checkout
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
