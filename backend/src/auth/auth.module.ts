// backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth.guard';
import { DatabaseModule } from 'src/database/database.module'; // <-- Gunakan DatabaseModule

@Module({
  imports: [ConfigModule, DatabaseModule], // <-- Daftarkan modul yang benar
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}