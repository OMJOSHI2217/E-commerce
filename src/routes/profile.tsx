import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { store, useUser } from "@/lib/store";
import { getOrdersFn } from "@/lib/api/orders";
import { useState, useEffect } from "react";
import { User, Package, Heart, Wallet, LogOut, Settings, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "My Profile — Noctura" }] }),
  beforeLoad: () => {
    if (!store.getUser()) {
      throw redirect({ to: '/login' });
    }
  },
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const user = useUser();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      getOrdersFn({ data: user.id }).then(setOrders).catch(console.error);
    }
  }, [user]);

  const handleSignOut = () => {
    store.setUser(null);
    navigate({ to: '/' });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur text-center">
            <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
              <User className="h-8 w-8" />
            </div>
            <h2 className="font-serif text-xl">{user?.name || "Member"}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>

          <nav className="flex flex-col gap-2">
            <Link to="/profile" className="flex items-center gap-3 rounded-lg bg-surface px-4 py-3 text-sm font-medium text-foreground">
              <User className="h-4 w-4" /> Account Overview
            </Link>
            <Link to="/orders" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-surface/50 hover:text-foreground">
              <Package className="h-4 w-4" /> Order History
            </Link>
            <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-surface/50 hover:text-foreground text-left">
              <Heart className="h-4 w-4" /> Wishlist
            </button>
            <button className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-surface/50 hover:text-foreground text-left">
              <Settings className="h-4 w-4" /> Settings
            </button>
            <button onClick={handleSignOut} className="mt-4 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-destructive transition hover:bg-destructive/10 text-left">
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <h1 className="font-serif text-4xl">Hello, {user?.name?.split(' ')[0] || "there"}</h1>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Wallet Card */}
            <div className="rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <Wallet className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Store Wallet</h3>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Available Balance</p>
                <p className="font-serif text-4xl">$150.00</p>
              </div>
            </div>

            {/* Wishlist Card */}
            <div className="rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground">
                  <Heart className="h-5 w-5" />
                </div>
                <h3 className="font-medium">Wishlist</h3>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Saved Items</p>
                  <p className="font-serif text-4xl">12</p>
                </div>
                <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                  View <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-2xl border border-border/60 bg-surface/40 p-6 backdrop-blur">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-serif text-2xl">Recent Orders</h3>
              <Link to="/orders" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            
            {orders.length === 0 ? (
              <div className="rounded-xl border border-border/40 bg-background/50 p-8 text-center">
                <Package className="mx-auto h-8 w-8 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                <Link to="/shop" className="mt-4 inline-block rounded-full border border-border px-6 py-2 text-sm font-medium hover:bg-surface">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order: any, i) => (
                  <div key={order.id || i} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/40 bg-background/50 p-4">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-lg bg-surface">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="font-medium">${order.total}</p>
                      <Link to="/tracking" className="rounded-full border border-border px-4 py-1.5 text-xs font-medium hover:bg-surface">
                        Track
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
