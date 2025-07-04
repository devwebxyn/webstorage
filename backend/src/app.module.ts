// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module'; // <-- Impor modul database kita yang baru
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { MegaModule } from './mega/mega.module'; // Impor MegaModule
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    // Daftarkan ConfigModule agar .env bisa dibaca
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    // Daftarkan semua modul fungsional kita
    DatabaseModule, // <-- Gunakan DatabaseModule, bukan PrismaModule
    AuthModule,
    FilesModule,
    MegaModule, // Daftarkan MegaModule di sini
    UploadModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}