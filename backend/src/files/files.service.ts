// backend/src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService {
  constructor(private db: DatabaseService) {}

  async findAllForUser(userId: number) {
    const pool = this.db.getPool();
    const result = await pool.query('SELECT * FROM files WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
  }

  async create(createFileDto: CreateFileDto, userId: number) {
    const { fileName, path, size } = createFileDto;
    const pool = this.db.getPool();
    const result = await pool.query(
      'INSERT INTO files (user_id, file_name, path, size, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [userId, fileName, path, size]
    );
    return result.rows[0];
  }
}