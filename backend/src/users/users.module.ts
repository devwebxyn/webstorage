// backend/src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService],
  exports: [UsersService], // Ekspor service agar bisa digunakan di modul lain (seperti AuthModule)
})
export class UsersModule {}