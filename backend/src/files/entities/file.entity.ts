// backend/src/files/entities/file.entity.ts
// Ini hanya contoh, sesuaikan dengan definisi Drizzle Anda
import { pgTable, serial, text, integer, boolean, timestamp } from 'drizzle-orm/pg-core';

export const files = pgTable('files', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(), // Asumsi user_id adalah string dari Clerk
  fileName: text('file_name').notNull(),
  path: text('path').notNull(), // Jalur lengkap di storage
  size: integer('size').notNull(), // Ukuran dalam bytes
  isPublic: boolean('is_public').notNull().default(false), // <-- Tambahkan kolom ini
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export type File = typeof files.$inferSelect; // Tipe untuk selected file
export type InsertFile = typeof files.$inferInsert; // Tipe untuk insert