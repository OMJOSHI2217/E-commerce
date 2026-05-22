import { useState } from "react";
import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { Check, CreditCard, Truck, MapPin, Wallet, Banknote } from "lucide-react";
import { useCart, store } from "@/lib/store";
import { placeOrderFn } from "@/lib/api/orders";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Noctura" }] }),
  component: Checkout,
});

const field = "w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary";

function Section({ step, icon: Icon, title, children }: { step: number; icon: any; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur">
      <header className="mb-5 flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-sm font-medium text-primary-foreground">{step}</span>
        <h2 className="flex items-center gap-2 font-serif text-2xl"><Icon className="h-4 w-4 text-primary" />{title}</h2>
      </header>
      {children}
    </section>
  );
}

function Checkout() {
  const navigate = useNavigate();
  const user = store.getUser();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const items = useCart();
  const subtotal = items.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const shipping = 0;
  const tax = Math.round(subtotal * 0.08);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/cart" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">← Back to cart</Link>
      <h1 className="mt-2 font-serif text-5xl">Checkout</h1>

      <form onSubmit={async (e) => { 
        e.preventDefault(); 
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
          const order = { id: Math.random().toString(36).slice(2, 9), items, total: subtotal + shipping + tax, date: new Date().toISOString() };
          
          await placeOrderFn({ data: {
            id: order.id,
            userId: user.id,
            total: order.total,
            items: order.items
          }});

          store.addOrder(order);
          store.clearCart();
          navigate({ to: '/tracking' }); 
        } catch (error) {
          console.error("Failed to place order:", error);
          setIsSubmitting(false);
        }
      }} className="mt-10 grid gap-8 lg:grid-cols-[1fr_420px]">
        <div className="space-y-6">
          <Section step={1} icon={MapPin} title="Shipping address">
            <div className="grid gap-3 sm:grid-cols-2">
              <input required className={field} placeholder="Full name" />
              <input required type="email" className={field} placeholder="Email" />
              <input required className={`${field} sm:col-span-2`} placeholder="Street address" />
              <input required className={field} placeholder="City" />
              <input required className={field} placeholder="Postal code" />
              <input required className={`${field} sm:col-span-2`} placeholder="Country" />
            </div>
          </Section>

          <Section step={2} icon={Truck} title="Delivery method">
            <div className="grid gap-3">
              {[
                { name: "Standard", t: "5–7 business days", price: "Free" },
                { name: "Express", t: "2–3 business days", price: "$18" },
                { name: "Overnight", t: "Next business day", price: "$42" },
              ].map((m, i) => (
                <label key={m.name} className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background px-4 py-3 hover:border-primary">
                  <span className="flex items-center gap-3">
                    <input type="radio" name="ship" defaultChecked={i === 0} className="h-4 w-4 accent-primary" />
                    <span>
                      <span className="block text-sm font-medium">{m.name}</span>
                      <span className="block text-xs text-muted-foreground">{m.t}</span>
                    </span>
                  </span>
                  <span className="text-sm">{m.price}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section step={3} icon={CreditCard} title="Payment">
            <div className="mb-4 grid grid-cols-3 gap-3">
              <label className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 hover:border-primary transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:text-foreground'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="sr-only" />
                <CreditCard className="h-6 w-6" />
                <span className="text-xs font-medium">Card</span>
              </label>
              <label className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 hover:border-primary transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:text-foreground'}`}>
                <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="sr-only" />
                <Wallet className="h-6 w-6" />
                <span className="text-xs font-medium">PayPal</span>
              </label>
              <label className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-4 hover:border-primary transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-background text-muted-foreground hover:text-foreground'}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="sr-only" />
                <Banknote className="h-6 w-6" />
                <span className="text-xs font-medium">Cash on Delivery</span>
              </label>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="grid gap-3">
                <input required className={field} placeholder="Card number" />
                <div className="grid grid-cols-2 gap-3">
                  <input required className={field} placeholder="MM / YY" />
                  <input required className={field} placeholder="CVC" />
                </div>
                <input required className={field} placeholder="Name on card" />
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="rounded-lg border border-border bg-background p-4 text-center text-sm text-muted-foreground">
                You will be redirected to PayPal to complete your purchase securely.
              </div>
            )}
            
            {paymentMethod === 'cod' && (
              <div className="rounded-lg border border-border bg-background p-4 text-center text-sm text-muted-foreground">
                You will pay for your order in cash upon delivery.
              </div>
            )}
          </Section>
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur lg:sticky lg:top-24">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-3">
                <div className="h-14 w-14 overflow-hidden rounded-lg bg-surface">
                  <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm">{i.name}</p>
                  <p className="text-xs text-muted-foreground">Qty 1</p>
                </div>
                <span className="text-sm">${i.price}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-2 border-t border-border/60 pt-4 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-success">Free</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>${tax}</span></div>
          </div>
          <div className="flex items-baseline justify-between border-t border-border/60 pt-4">
            <span className="font-serif text-xl">Total</span>
            <span className="font-serif text-3xl">${subtotal + shipping + tax}</span>
          </div>
          <button disabled={isSubmitting} type="submit" className="w-full rounded-full bg-gradient-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-glow disabled:opacity-50">
            {isSubmitting ? "Processing..." : "Place order"}
          </button>
          <p className="text-center text-xs text-muted-foreground">Secured by 256-bit encryption</p>
        </aside>
      </form>
    </div>
  );
}
