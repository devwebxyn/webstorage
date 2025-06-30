// backend/src/users/users.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { users } from '../database/schema';
import { User, NewUser } from './entities/user.entity';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  /**
   * Menemukan pengguna berdasarkan Clerk ID mereka. Jika tidak ditemukan, buat pengguna baru.
   * @param clerkUser Objek pengguna yang didapat dari token Clerk
   * @returns Data pengguna dari database
   */
  async findOrCreateFromClerk(clerkUser: {
    userId: string;
    email: string;
    name: string;
    [key: string]: any; // Untuk data tambahan dari Clerk
  }): Promise<User> {
    const db = this.databaseService.getDb();
    const clerkId = clerkUser.userId;

    // 1. Coba cari pengguna berdasarkan Clerk ID
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, clerkId),
    });

    if (existingUser) {
      this.logger.log(`User found in DB: ${clerkId}`);
      return existingUser;
    }

    // 2. Jika tidak ada, buat pengguna baru
    this.logger.log(`User not found. Creating new user in DB for Clerk ID: ${clerkId}`);

    const newUser: NewUser = {
      id: clerkId,
      email: clerkUser.email,
      name: clerkUser.name,
      clerkData: JSON.stringify(clerkUser), // Simpan semua data dari clerk
    };

    const createdUser = await db.insert(users).values(newUser).returning();

    this.logger.log(`Successfully created user: ${createdUser[0].id}`);
    return createdUser[0];
  }
}