// backend/src/files/files.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  private readonly logger = new Logger(FilesController.name);

  constructor(private readonly filesService: FilesService) {}

  @Get()
  async findAll(@Req() req: Request) {
    try {
      const userId = req.user?.userId; // ✅ gunakan userId, bukan clerk_id
      this.logger.log(`findAll: Request received for user: ${userId}`);
      if (!userId) {
        this.logger.error('findAll: User ID tidak ditemukan di req.user setelah AuthGuard.');
        throw new UnauthorizedException('User ID tidak ditemukan.');
      }
      const files = await this.filesService.findAllForUser(userId);
      this.logger.log(`findAll: Berhasil mengambil ${files.length} file untuk user ${userId}.`);
      return files;
    } catch (error) {
      this.logger.error(`findAll: Gagal mengambil file: ${error.message}`, error.stack);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Gagal mengambil file.');
    }
  }

  @Get('public')
  async findPublicFiles() {
    try {
      this.logger.log('findPublicFiles: Request received for public files.');
      const publicFiles = await this.filesService.findPublicFiles();
      this.logger.log(`findPublicFiles: Berhasil mengambil ${publicFiles.length} file publik.`);
      return publicFiles;
    } catch (error) {
      this.logger.error(`findPublicFiles: Gagal mengambil file publik: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Gagal mengambil file publik.');
    }
  }

  @Post()
  async create(@Body() createFileDto: CreateFileDto, @Req() req: Request) {
    try {
      const userId = req.user?.userId; // ✅ gunakan userId, bukan clerk_id
      this.logger.log(`create: Request received to create file for user: ${userId}`);
      if (!userId) {
        this.logger.error('create: User ID tidak ditemukan di req.user setelah AuthGuard.');
        throw new UnauthorizedException('User ID tidak ditemukan.');
      }
      const newFile = await this.filesService.create(createFileDto, userId);
      this.logger.log(`create: File ${newFile.fileName} (Public: ${newFile.isPublic}) berhasil dibuat.`);
      return newFile;
    } catch (error) {
      this.logger.error(`create: Gagal membuat file: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Gagal membuat file.');
    }
  }
}
