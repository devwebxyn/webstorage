import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { MegaService } from '../mega/mega.service';
import { FilesService } from '../files/files.service';
import { Express } from 'express';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor(
    private readonly megaService: MegaService,
    private readonly filesService: FilesService,
  ) {}

  async uploadToMega(file: Express.Multer.File, userId: string): Promise<any> {
    this.logger.log(`Attempting to upload "${file.originalname}" for user ${userId}.`);

    try {
      // Langkah 1: Mendapatkan koneksi storage MEGA
      this.logger.log('Getting MEGA storage instance...');
      const storage = this.megaService.getMegaStorage();
      if (!storage) {
        throw new Error('MEGA storage instance is not available.');
      }
      this.logger.log('MEGA storage instance obtained successfully.');

      // Langkah 2: Mengunggah file ke MEGA
      this.logger.log(`Uploading file to MEGA's cloud...`);
      const megaFile = await storage.upload({
        name: file.originalname,
        size: file.size,
      }, file.buffer).complete;

      if (!megaFile || !megaFile.nodeId) {
        throw new Error('Failed to get file details from MEGA after upload.');
      }
      this.logger.log(`File uploaded to MEGA successfully. Node ID: ${megaFile.nodeId}`);

      // Langkah 3: Menyimpan metadata ke database
      this.logger.log('Saving file metadata to the database...');
      const createdFileInDb = await this.filesService.create({
        fileName: file.originalname,
        path: megaFile.nodeId,
        size: megaFile.size ?? 0, // Pastikan menggunakan size dari megaFile jika ada, atau dari file Multer
        storageProvider: 'mega',
        isPublic: false,
        type: file.mimetype, // Tambahkan mimetype file
        url: `https://mega.nz/file/${megaFile.nodeId}`, // Tambahkan URL file
      }, userId);
      this.logger.log(`Metadata saved to DB successfully. DB ID: ${createdFileInDb.id}`);

      // Langkah 4: Mengembalikan data ke frontend
      return {
        id: createdFileInDb.id,
        fileName: createdFileInDb.fileName,
        size: createdFileInDb.size,
        url: createdFileInDb.url, // Pastikan URL juga dikembalikan
      };

    } catch (error) {
      // Menangkap SEMUA error yang mungkin terjadi dan mencatatnya
      this.logger.error(`An error occurred during the MEGA upload process: ${error.message}`, error.stack);
      
      // Memberikan pesan error yang jelas ke frontend
      throw new InternalServerErrorException('Gagal mengunggah file ke server. Silakan coba lagi.');
    }
  }
}