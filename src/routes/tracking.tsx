import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Truck, CheckCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/tracking")({
  head: () => ({ meta: [{ title: "Order Tracking — Noctura" }] }),
  component: TrackingPage,
});

function TrackingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-6">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h1 className="font-serif text-4xl mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We've received it and are getting it ready.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-surface/40 p-8 backdrop-blur mt-8">
        <h2 className="font-serif text-2xl mb-6">Tracking Status</h2>
        
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border"></div>
          
          <div className="space-y-8">
            <div className="relative flex gap-6">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow">
                <Package className="h-5 w-5" />
              </div>
              <div className="pt-3">
                <h3 className="font-medium text-lg leading-none">Order Placed</h3>
                <p className="text-sm text-muted-foreground mt-2">We have received your order.</p>
              </div>
            </div>

            <div className="relative flex gap-6">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <div className="pt-3">
                <h3 className="font-medium text-lg leading-none">Processing</h3>
                <p className="text-sm text-muted-foreground mt-2">Your items are being carefully packaged.</p>
              </div>
            </div>

            <div className="relative flex gap-6 opacity-50">
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background text-muted-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="pt-3">
                <h3 className="font-medium text-lg leading-none">In Transit</h3>
                <p className="text-sm text-muted-foreground mt-2">Your order is on the way to you.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80 border border-border"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
