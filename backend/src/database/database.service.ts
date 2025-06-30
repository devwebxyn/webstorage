// backend/src/database/database.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import schema from './schema'; // <-- PERBAIKAN: Impor dari file skema gabungan

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;
  private db: NodePgDatabase<typeof schema>;

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    if (!databaseUrl) {
      this.logger.error('DATABASE_URL is not defined in .env');
      throw new Error('DATABASE_URL is not defined');
    }
    this.pool = new Pool({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false },
    });
    this.pool.on('error', (err: Error) => {
      this.logger.error(`Unexpected error on idle client: ${err.message}`, err.stack);
    });
    
    // PERBAIKAN: Inisialisasi Drizzle dengan skema gabungan
    this.db = drizzle(this.pool, { schema });
  }

  async onModuleInit() {
    try {
      const client = await this.pool.connect();
      this.logger.log('✅ Database connected successfully');
      client.release();
    } catch (error) {
      this.logger.error('❌ Failed to connect to database: ' + (error as Error).message, (error as Error).stack);
      throw error;
    }
  }

  async onModuleDestroy() {
    this.logger.log('🧹 Closing database connection pool...');
    await this.pool.end();
    this.logger.log('✅ Database connection pool closed');
  }

  getDb(): NodePgDatabase<typeof schema> {
    return this.db;
  }
}