import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const products = await sql`SELECT id, name, category, price FROM products`;
  console.log(JSON.stringify(products, null, 2));
}

main();
