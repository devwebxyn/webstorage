// backend/src/files/files.service.ts
import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateFileDto } from './dto/create-file.dto';
import { files, FileEntity, InsertFile } from './entities/file.entity';
import { eq, and } from 'drizzle-orm';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  // backend/src/files/files.service.ts
// ...
  async create(createFileDto: CreateFileDto, userId: string): Promise<FileEntity> {
    const db = this.databaseService.getDb();
    
    // Membangun objek data yang sesuai dengan skema 'InsertFile'
    const newFileData: InsertFile = {
      ...createFileDto, // Mengambil semua properti dari DTO
      userId: userId,   // Menambahkan userId dari parameter
    };

    this.logger.log(`Attempting to insert file record for user ${userId}: ${JSON.stringify(newFileData)}`);

    try {
      // Menjalankan query insert dengan Drizzle
      const result = await db.insert(files).values(newFileData).returning();
      
      this.logger.log(`Successfully inserted file with ID: ${result[0].id}`);
      return result[0];

    } catch (error) {
      this.logger.error(`Database insert failed for user ${userId}. Error: ${error.message}`, error.stack);
      // Memberikan error yang lebih spesifik agar frontend tahu ada masalah database
      throw new InternalServerErrorException('Gagal menyimpan data file ke database.');
    }
  }
// ...

  async findAll(userId: string, filters: { isPublic?: boolean }): Promise<FileEntity[]> {
    const db = this.databaseService.getDb();
    const conditions = [eq(files.userId, userId)];

    if (filters.isPublic !== undefined) {
      conditions.push(eq(files.isPublic, filters.isPublic));
    }
    
    return db.select().from(files).where(and(...conditions));
  }

  async findPublicFiles(): Promise<FileEntity[]> {
    const db = this.databaseService.getDb();
    return db.select().from(files).where(eq(files.isPublic, true));
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<FileEntity | null> {
    const db = this.databaseService.getDb();
    
    try {
      const result = await db.update(files)
        .set(updateFileDto)
        .where(eq(files.id, id))
        .returning();
      
      return result.length > 0 ? result[0] : null;
    } catch (error) {
       this.logger.error(`Database update failed for file ID ${id}. Error: ${error.message}`, error.stack);
       throw new InternalServerErrorException('Gagal memperbarui data file di database.');
    }
  }
}