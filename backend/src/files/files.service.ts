// backend/src/files/files.service.ts
import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateFileDto } from './dto/create-file.dto';
import { files } from '../database/schema';
import { File, NewFile } from './entities/file.entity';
import { eq, and } from 'drizzle-orm';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createFileDto: CreateFileDto, userId: string): Promise<File> {
    const db = this.databaseService.getDb();
    
    const newFileData: NewFile = {
      ...createFileDto,
      userId: userId,
    };

    this.logger.log(`Attempting to insert file record for user ${userId}: ${JSON.stringify(newFileData)}`);

    try {
      const result = await db.insert(files).values(newFileData).returning({
        id: files.id,
        userId: files.userId,
        fileName: files.fileName,
        path: files.path,
        size: files.size,
        isPublic: files.isPublic,
        storageProvider: files.storageProvider,
        createdAt: files.createdAt,
        type: files.type,
        url: files.url,
      });
      
      this.logger.log(`Successfully inserted file with ID: ${result[0].id}`);
      return result[0];

    } catch (error) {
      this.logger.error(`Database insert failed for user ${userId}. Error: ${error.message}`, error);
      throw new InternalServerErrorException('Gagal menyimpan data file ke database.');
    }
  }

  async findAll(userId: string, filters: { isPublic?: boolean }): Promise<File[]> {
    const db = this.databaseService.getDb();
    const conditions = [eq(files.userId, userId)];

    if (filters.isPublic !== undefined) {
      conditions.push(eq(files.isPublic, filters.isPublic));
    }
    
    return db.select({
      id: files.id,
      userId: files.userId,
      fileName: files.fileName,
      path: files.path,
      size: files.size,
      isPublic: files.isPublic,
      storageProvider: files.storageProvider,
      createdAt: files.createdAt,
      type: files.type,
      url: files.url,
    }).from(files).where(and(...conditions));
  }

  async findPublicFiles(): Promise<File[]> {
    const db = this.databaseService.getDb();
    return db.select({
      id: files.id,
      userId: files.userId,
      fileName: files.fileName,
      path: files.path,
      size: files.size,
      isPublic: files.isPublic,
      storageProvider: files.storageProvider,
      createdAt: files.createdAt,
      type: files.type,
      url: files.url,
    }).from(files).where(eq(files.isPublic, true));
  }

  async update(id: string, updateFileDto: UpdateFileDto): Promise<File | null> {
    const db = this.databaseService.getDb();
    
    try {
      const result = await db.update(files)
        .set(updateFileDto)
        .where(eq(files.id, id))
        .returning({
          id: files.id,
          userId: files.userId,
          fileName: files.fileName,
          path: files.path,
          size: files.size,
          isPublic: files.isPublic,
          storageProvider: files.storageProvider,
          createdAt: files.createdAt,
          type: files.type,
          url: files.url,
        });
      
      return result.length > 0 ? result[0] as File : null;
    } catch (error) {
       this.logger.error(`Database update failed for file ID ${id}. Error: ${error.message}`, error.stack);
       throw new InternalServerErrorException('Gagal memperbarui data file di database.');
    }
  }
}