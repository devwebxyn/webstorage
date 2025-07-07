// backend/src/mega/mega.service.ts

import { Injectable, OnModuleInit, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Storage } from 'megajs';

// Extend the Storage type to include the logout method
type MegaStorage = Storage & {
  logout?(): Promise<void>;
};

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000;
const CONNECTION_TIMEOUT_MS = 30000;

@Injectable()
export class MegaService implements OnModuleInit, OnModuleDestroy {
  private storage: MegaStorage | null = null;
  private readonly logger = new Logger(MegaService.name);
  private isInitializing = false;
  private initializationPromise: Promise<void> | null = null;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    await this.initializeWithRetry();
  }

  async onModuleDestroy(): Promise<void> {
    if (this.storage) {
      try {
        if (typeof this.storage.logout === 'function') {
          await this.storage.logout();
        }
        this.logger.log('Successfully logged out from MEGA');
      } catch (error) {
        this.logger.error('Error during MEGA logout', error);
      }
    }
  }

  private async initializeWithRetry(attempt = 1): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.initialize(attempt);
    return this.initializationPromise;
  }

  private async initialize(attempt: number): Promise<void> {
    if (this.storage) return;
    if (this.isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.initialize(attempt);
    }

    this.isInitializing = true;
    this.logger.log(`Authenticating with MEGA (Attempt ${attempt}/${MAX_RETRIES})...`);

    try {
      const email = this.configService.get<string>('MEGA_EMAIL');
      const password = this.configService.get<string>('MEGA_PASSWORD');

      if (!email || !password) {
        throw new Error('MEGA credentials are not set in .env');
      }

      // Create storage instance with proper typing
      const storage = new Storage({
        email,
        password,
        keepalive: true,
        autologin: true,
        autoload: true,
      });

      // Wait for connection with timeout
      await new Promise<void>((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          cleanup();
          reject(new Error('MEGA connection timeout'));
        }, CONNECTION_TIMEOUT_MS);

        const onReady = () => {
          cleanup();
          // Set up event listeners for file operations
          storage.on('delete', (file: any) => {
            this.logger.warn('File deleted from MEGA:', file);
            this.handleConnectionError();
          });
          resolve();
        };

        const onDelete = (file: any) => {
          cleanup();
          reject(new Error('MEGA file operation failed'));
        };

        const cleanup = () => {
          clearTimeout(timeoutId);
          storage.off('ready', onReady);
          storage.off('delete', onDelete);
        };

        storage.once('ready', onReady);
        storage.once('delete', onDelete);
      });

      this.storage = storage;
      this.logger.log('Successfully connected to MEGA');
    } catch (error) {
      this.logger.error(`MEGA connection failed (Attempt ${attempt}/${MAX_RETRIES}):`, error);
      
      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * attempt;
        this.logger.log(`Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.initialize(attempt + 1);
      }
      
      throw new Error(`Failed to connect to MEGA after ${MAX_RETRIES} attempts: ${error.message}`);
    } finally {
      this.isInitializing = false;
      this.initializationPromise = null;
    }
  }

  private async handleConnectionError(): Promise<void> {
    this.logger.warn('MEGA connection lost, attempting to reconnect...');
    try {
      if (this.storage) {
        if (typeof this.storage.logout === 'function') {
          await this.storage.logout();
        }
        this.storage = null;
      }
      await this.initializeWithRetry();
    } catch (error) {
      this.logger.error('Failed to reconnect to MEGA:', error);
    }
  }

  async getMegaStorage(): Promise<Storage> {
    if (!this.storage) {
      await this.initializeWithRetry();
    }
    
    if (!this.storage) {
      throw new Error('MEGA storage is not available');
    }
    
    return this.storage;
  }
}
