import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";
import { orders, orderItems } from "../db/schema";
import { eq, desc } from "drizzle-orm";

export const placeOrderFn = createServerFn({ method: "POST" })
  .inputValidator((data: { 
    id: string; 
    userId: number; 
    total: number; 
    items: any[] 
  }) => data)
  .handler(async ({ data }) => {
    // 1. Insert order
    await db.insert(orders).values({
      id: data.id,
      userId: data.userId,
      total: data.total,
    });

    // 2. Insert order items
    const itemsToInsert = data.items.map(item => ({
      orderId: data.id,
      productId: item.id,
      name: item.name,
      brand: item.brand,
      price: item.price,
      qty: item.qty || 1,
      image: item.image,
    }));

    await db.insert(orderItems).values(itemsToInsert);

    return { success: true, orderId: data.id };
  });

export const getOrdersFn = createServerFn({ method: "GET" })
  .inputValidator((data: number) => data)
  .handler(async ({ data: userId }) => {
    const userOrders = await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.date));
    
    const populatedOrders = await Promise.all(userOrders.map(async (order) => {
      const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
      return {
        ...order,
        items
      };
    }));

    return populatedOrders;
  });
