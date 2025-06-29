// backend/src/files/entities/file.entity.ts
import { pgTable, serial, text, integer, boolean, timestamp, varchar } from 'drizzle-orm/pg-core';

// Ini adalah skema tabel yang benar dan robust untuk kasus Anda
export const files = pgTable('files', {
  // `id` sebagai serial (auto-increment integer) dan primary key.
  id: serial('id').primaryKey(),
  
  // `userId` harus `text` atau `varchar` untuk menampung ID panjang dari Clerk.
  userId: varchar('user_id', { length: 255 }).notNull(),
  
  // `fileName` dan `path` juga sebaiknya `text` atau `varchar`.
  // `path` akan menyimpan Node ID dari MEGA (contoh: UJoDARja), jadi varchar cukup.
  fileName: varchar('file_name', { length: 255 }).notNull(),
  path: text('path').notNull(),
  
  // `size` dalam bytes, jadi `integer` sudah benar.
  size: integer('size').notNull(),
  
  isPublic: boolean('is_public').default(false).notNull(),
  storageProvider: varchar('storage_provider', { length: 50 }).default('mega').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Mengekspor tipe data untuk digunakan di seluruh aplikasi
export type FileEntity = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;