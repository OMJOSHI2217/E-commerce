import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";
import { products, categories } from "../db/schema";

export const getProductsFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await db.select().from(products);
  });

export const getCategoriesFn = createServerFn({ method: "GET" })
  .handler(async () => {
    return await db.select().from(categories);
  });
