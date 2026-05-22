import { createServerFn } from "@tanstack/react-start";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const registerUserFn = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string; email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const existingUser = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (existingUser.length > 0) {
      throw new Error("User already exists");
    }

    // In production, we'd hash the password here with bcrypt or argon2. For demonstration, we'll store it in plain text.
    const newUser = await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: data.password,
    }).returning();

    return { success: true, user: { id: newUser[0].id, name: newUser[0].name, email: newUser[0].email } };
  });

export const loginUserFn = createServerFn({ method: "POST" })
  .inputValidator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const user = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (user.length === 0 || user[0].password !== data.password) {
      throw new Error("Invalid email or password");
    }

    return { success: true, user: { id: user[0].id, name: user[0].name, email: user[0].email } };
  });
