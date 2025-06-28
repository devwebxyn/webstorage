// backend/src/database/database.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  onModuleInit() {
    // Inisialisasi connection pool menggunakan URL dari .env
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }

  // Fungsi ini akan menutup semua koneksi saat aplikasi berhenti
  async onModuleDestroy() {
    await this.pool.end();
  }

  // Fungsi untuk mendapatkan akses ke pool agar bisa dipakai di service lain
  getPool(): Pool {
    return this.pool;
  }
}