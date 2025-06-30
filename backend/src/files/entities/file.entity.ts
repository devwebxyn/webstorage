import { z } from 'zod';
import { files } from '../../database/schema'; // Import files from the centralized schema

export const SelectFileSchema = z.object({
  id: z.string(),
  userId: z.string(),
  fileName: z.string(),
  path: z.string(),
  size: z.number(),
  type: z.string(), // Tambahkan type
  url: z.string(), // Tambahkan url
  isPublic: z.boolean(),
  storageProvider: z.string(),
  createdAt: z.date(),
});

export const InsertFileSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  fileName: z.string(),
  path: z.string(),
  size: z.number(),
  type: z.string(), // Tambahkan type
  url: z.string(), // Tambahkan url
  isPublic: z.boolean().optional(),
  storageProvider: z.string().optional(),
  createdAt: z.date().optional(),
});

export type File = z.infer<typeof SelectFileSchema>;
export type NewFile = z.infer<typeof InsertFileSchema>;