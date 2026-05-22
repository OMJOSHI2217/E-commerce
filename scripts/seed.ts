import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { products, categories } from "../src/lib/db/schema";
import * as dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const categoriesData = [
  { id: "c1", slug: "electronics", name: "Electronics", image: "/images/p-electronics.jpg", count: 124 },
  { id: "c2", slug: "fashion", name: "Fashion", image: "/images/p-fashion.jpg", count: 287 },
  { id: "c3", slug: "shoes", name: "Shoes", image: "/images/p-shoes.jpg", count: 96 },
  { id: "c4", slug: "accessories", name: "Accessories", image: "/images/p-accessories.jpg", count: 152 },
  { id: "c5", slug: "furniture", name: "Furniture", image: "/images/p-furniture.jpg", count: 64 },
];

const productsData = [
  { id: "aurora-cans", name: "Aurora Wireless Headphones", brand: "Lumen", category: "electronics", price: 349, rating: 4.8, reviews: 1284, image: "/images/p-electronics.jpg", description: "Studio-grade active noise cancellation with 40h battery and spatial audio." },
  { id: "cashmere-knit", name: "Heirloom Cashmere Knit", brand: "Atelier Nord", category: "fashion", price: 285, rating: 4.7, reviews: 412, image: "/images/p-fashion.jpg", description: "Hand-loomed Mongolian cashmere with a relaxed crew silhouette." },
  { id: "court-low", name: "Court Low Leather Sneaker", brand: "Form & Foot", category: "shoes", price: 195, rating: 4.6, reviews: 856, image: "/images/p-shoes.jpg", description: "Italian full-grain leather on a vulcanized cup sole." },
  { id: "halo-chain", name: "Halo 14k Chain Necklace", brand: "Maison Or", category: "accessories", price: 520, rating: 4.9, reviews: 233, image: "/images/p-accessories.jpg", description: "Solid 14k recycled gold, hand-finished in Florence." },
  { id: "velvet-lounge", name: "Velvet Lounge Chair", brand: "North Studio", category: "furniture", price: 1290, rating: 4.7, reviews: 78, image: "/images/p-furniture.jpg", description: "Mid-century silhouette in cobalt velvet on solid walnut." },
  { id: "harbor-tote", name: "Harbor Leather Tote", brand: "Quill", category: "accessories", price: 410, rating: 4.5, reviews: 167, image: "/images/p-bag.jpg", description: "Vegetable-tanned navy leather, ages into a quiet patina." },
  { id: "ember-lamp", name: "Ember Brass Table Lamp", brand: "North Studio", category: "furniture", price: 320, rating: 4.6, reviews: 92, image: "/images/p-lamp.jpg", description: "Mouth-blown glass dome on a solid brass column." },
  { id: "aurora-cans-2", name: "Aurora Studio Monitors", brand: "Lumen", category: "electronics", price: 780, rating: 4.8, reviews: 142, image: "/images/p-electronics.jpg", description: "Reference near-field monitors with class-D amplification." },
];

async function main() {
  console.log("Seeding categories...");
  for (const cat of categoriesData) {
    await db.insert(categories).values(cat).onConflictDoNothing();
  }
  
  console.log("Seeding products...");
  for (const prod of productsData) {
    await db.insert(products).values(prod).onConflictDoNothing();
  }
  
  console.log("Done seeding!");
}

main().catch(console.error);
