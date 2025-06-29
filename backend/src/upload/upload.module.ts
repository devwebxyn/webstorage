// backend/src/upload/upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { MegaModule } from '../mega/mega.module';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module'; // <-- 1. Impor AuthModule

@Module({
  imports: [
    MegaModule, 
    FilesModule,
    AuthModule, // <-- 2. Tambahkan AuthModule di sini
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}