// backend/src/database/database.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool;

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    if (!databaseUrl) {
      this.logger.error('DATABASE_URL is not defined in .env');
      throw new Error('DATABASE_URL is not defined');
    }

    // ✅ Pool dengan SSL self-signed
    this.pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false, // HANYA untuk dev/test, jangan dipakai di production
      },
    });

    this.pool.on('error', (err: Error) => {
      this.logger.error(`Unexpected error on idle client: ${err.message}`, err.stack);
    });
  }

  async onModuleInit() {
    try {
      const client = await this.pool.connect();
      this.logger.log('✅ Database connected successfully');
      client.release();
    } catch (error) {
      this.logger.error('❌ Failed to connect to database: ' + error.message, error.stack);
      throw error;
    }
  }

  async onModuleDestroy() {
    this.logger.log('🧹 Closing database connection pool...');
    await this.pool.end();
    this.logger.log('✅ Database connection pool closed');
  }

  // Untuk akses manual jika diperlukan
  getPool(): Pool {
    return this.pool;
  }
}
