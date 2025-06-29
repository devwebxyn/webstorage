import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService], // Ekspor service agar bisa dipakai modul lain
})
export class FilesModule {}