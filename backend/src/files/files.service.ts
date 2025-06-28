// backend/src/files/files.service.ts
import { Injectable, UnauthorizedException, NotFoundException, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateFileDto } from './dto/create-file.dto';
import { File } from './entities/file.entity'; // Pastikan entity File diimpor

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(private db: DatabaseService) {}

  async create(createFileDto: CreateFileDto, userId: string): Promise<File> {
    const { fileName, path, size, isPublic } = createFileDto; // Destruktur isPublic
    this.logger.log(`Creating file: ${fileName} for user: ${userId}, isPublic: ${isPublic}`);
    const [newFile] = await this.db.getPool().query('INSERT INTO files (user_id, file_name, path, size, is_public, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *',
      [userId, fileName, path, size, isPublic] // Tambahkan is_public
    ).then(res => res.rows);
    return newFile;
  }

  async findAllForUser(userId: string): Promise<File[]> {
    this.logger.log(`Finding all files for user: ${userId}`);
    const result = await this.db.getPool().query('SELECT * FROM files WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
  }

  // Tambahkan metode untuk mengambil file publik (opsional, tergantung kebutuhan)
  async findPublicFiles(): Promise<File[]> {
    this.logger.log('Finding all public files.');
    const result = await this.db.getPool().query('SELECT * FROM files WHERE is_public = TRUE ORDER BY created_at DESC');
    return result.rows;
  }

  // ... (findOne, remove, dll. tetap sama atau disesuaikan)
}