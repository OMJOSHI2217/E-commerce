import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Calendar } from "lucide-react";
import { store } from "@/lib/store";
import { getOrdersFn } from "@/lib/api/orders";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "Order History — Noctura" }] }),
  component: OrdersPage,
});

function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = store.getUser();

  useEffect(() => {
    if (user) {
      getOrdersFn({ data: user.id }).then(res => {
        setOrders(res);
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <div className="p-16 text-center">Loading orders...</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-serif text-4xl mb-10">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-surface/40 p-16 text-center backdrop-blur">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-surface mb-6">
            <Package className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="font-serif text-2xl mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-8">When you place an order, it will appear here.</p>
          <Link to="/shop" className="inline-block rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order, i) => (
            <div key={order.id || i} className="overflow-hidden rounded-2xl border border-border/60 bg-surface/40 backdrop-blur">
              <div className="border-b border-border/60 bg-surface/60 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Order Placed</p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(order.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Total</p>
                    <p className="text-sm font-medium">${order.total}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Order #</p>
                    <p className="text-sm font-medium">{order.id}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/tracking`} className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition hover:border-primary hover:text-primary">
                    Track Order
                  </Link>
                </div>
              </div>
              <div className="px-6 py-6">
                <ul className="divide-y divide-border/60">
                  {order.items.map((item: any) => (
                    <li key={item.id} className="flex py-6 first:pt-0 last:pb-0">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface border border-border/40">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-6 flex flex-1 flex-col justify-center">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{item.brand}</p>
                            <h3 className="font-serif text-lg">{item.name}</h3>
                          </div>
                          <p className="font-medium">${item.price}</p>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">Qty: {item.qty || 1}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
