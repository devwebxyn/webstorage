import {
  pgTable,
  varchar,
  timestamp,
  serial,
  text,
  integer,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';
import { z } from 'zod';

// Tabel USERS: ID dari Clerk (string, bukan identity), maka gunakan varchar dan pastikan bukan identity
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey().notNull(), // ID dari Clerk, bukan autoincrement
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  clerkData: text('clerk_data'), // Tipe text lebih cocok untuk data JSON panjang
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabel FILES: UUID auto generate, cocok untuk distributed ID
export const files = pgTable('files', {
  id: uuid('id').primaryKey().defaultRandom(), // UUID cocok untuk scalable ID
  userId: varchar('user_id', { length: 255 }).notNull(),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  path: text('path').notNull(),
  size: integer('size').notNull(),
  type: varchar('type', { length: 100 }).notNull(),
  url: text('url').notNull(),
  isPublic: boolean('is_public').default(false).notNull(),
  storageProvider: varchar('storage_provider', { length: 4, enum: ['mega'] }).default('mega').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const SelectFileSchema = z.object({
  id: z.string(), // dari z.number() menjadi z.string()
  // ...existing code...
});
export const InsertFileSchema = z.object({
  id: z.string().optional(), // dari z.number().optional() menjadi z.string().optional()
  // ...existing code...
});
 