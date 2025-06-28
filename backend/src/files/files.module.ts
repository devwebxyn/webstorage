// backend/src/files/files.module.ts
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module'; // <-- Gunakan DatabaseModule

@Module({
  // Daftarkan modul yang benar untuk menyediakan dependensi
  imports: [AuthModule, DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}