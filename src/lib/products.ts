import { products as productsTable } from "./db/schema";

export type Product = typeof productsTable.$inferSelect & {
  compareAt?: number;
  inStock?: boolean;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  image: string;
  count: number;
};
