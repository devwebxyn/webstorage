// backend/src/users/entities/user.entity.ts
import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(), // ID dari Clerk, contoh: 'user_xxxxxxxx'
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  clerkData: varchar('clerk_data'), // Kolom untuk menyimpan data mentah dari Clerk jika perlu
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const InsertUserSchema = createInsertSchema(users);
export const SelectUserSchema = createSelectSchema(users);

export type User = z.infer<typeof SelectUserSchema>;
export type NewUser = z.infer<typeof InsertUserSchema>;