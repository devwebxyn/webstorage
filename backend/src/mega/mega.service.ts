// backend/src/mega/mega.service.ts

import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from 'megajs';

@Injectable()
export class MegaService implements OnModuleInit {
  private storage: Storage;
  private readonly logger = new Logger(MegaService.name);

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    try {
      this.logger.log('Authenticating with MEGA...');

      const email = this.configService.get<string>('MEGA_EMAIL');
      const password = this.configService.get<string>('MEGA_PASSWORD');

      if (!email || !password) {
        throw new Error('MEGA credentials are not set in .env');
      }

      // Authentikasi MEGA
     const storage = new Storage({ email, password });

    await new Promise<void>((resolve, reject) => {
     (storage as any).on('ready', () => resolve());
     (storage as any).on('error', (err: any) => reject(err)); // TypeScript fix
   });

this.storage = storage;


      this.storage = storage;
      this.logger.log('MEGA authentication successful.');
    } catch (error) {
      this.logger.error('Failed to authenticate with MEGA', error instanceof Error ? error.stack : error);
      throw error;
    }
  }

  getMegaStorage(): Storage {
    if (!this.storage) {
      throw new Error('MEGA Storage is not initialized.');
    }
    return this.storage;
  }
}
