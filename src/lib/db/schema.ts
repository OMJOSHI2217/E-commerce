import { pgTable, serial, text, integer, timestamp, varchar, real } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orders = pgTable('orders', {
  id: varchar('id', { length: 255 }).primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  total: integer('total').notNull(),
  date: timestamp('date').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: varchar('order_id', { length: 255 }).references(() => orders.id).notNull(),
  productId: varchar('product_id', { length: 255 }),
  name: varchar('name', { length: 255 }).notNull(),
  brand: varchar('brand', { length: 255 }),
  price: integer('price').notNull(),
  qty: integer('qty').notNull(),
  image: text('image'),
});

export const products = pgTable('products', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: integer('price').notNull(),
  category: varchar('category', { length: 255 }).notNull(),
  image: text('image').notNull(),
  rating: real('rating').notNull(),
  reviews: integer('reviews').notNull(),
  brand: varchar('brand', { length: 255 }).notNull(),
  description: text('description').notNull(),
});

export const categories = pgTable('categories', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  image: text('image').notNull(),
  count: integer('count').notNull(),
});
