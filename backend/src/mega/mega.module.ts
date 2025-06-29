// backend/src/mega/mega.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MegaService } from './mega.service';

@Module({
  imports: [ConfigModule], // Pastikan ConfigModule diimpor
  providers: [MegaService],
  exports: [MegaService],
})
export class MegaModule {}