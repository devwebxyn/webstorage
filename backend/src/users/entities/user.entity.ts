import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { users } from '../../database/schema'; // Import users from the centralized schema

export const SelectUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  clerkData: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const InsertUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable().optional(),
  clerkData: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof SelectUserSchema>;
export type NewUser = z.infer<typeof InsertUserSchema>;