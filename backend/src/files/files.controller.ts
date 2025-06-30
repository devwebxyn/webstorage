// backend/src/files/files.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
  UnauthorizedException,
  InternalServerErrorException,
  Logger,
  Query,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

// Definisikan tipe Request yang sudah diautentikasi
interface AuthenticatedRequest extends Request {
  auth: {
    userId: string;
  };
}

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  private readonly logger = new Logger(FilesController.name);

  constructor(private readonly filesService: FilesService) {}

  @Get()
  async findAll(
    @Req() req: AuthenticatedRequest,
    @Query('isPublic') isPublic?: string,
  ) {
    if (!req.auth) {
      throw new UnauthorizedException('Authentication data not found.');
    }
    const userId = req.auth.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found.');
    }
    const filters = {
      isPublic: isPublic ? isPublic === 'true' : undefined,
    };
    return this.filesService.findAll(userId, filters);
  }

  // Endpoint untuk file publik, tidak perlu AuthGuard
  @Get('public')
  @UseGuards() // Kosongkan guard untuk bypass autentikasi
  async findPublicFiles() {
    return this.filesService.findPublicFiles();
  }

  @Post()
  async create(@Body() createFileDto: CreateFileDto, @Req() req: AuthenticatedRequest) {
    if (!req.auth) {
      throw new UnauthorizedException('Authentication data not found.');
    }
    const userId = req.auth.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found.');
    }
    return this.filesService.create(createFileDto, userId);
  }
  
  // Endpoint untuk mengubah status file (misal: menjadikannya public)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @Req() req: AuthenticatedRequest
  ) {
    // Di sini Anda bisa menambahkan logika untuk memastikan hanya pemilik file yang bisa mengedit
    // Untuk saat ini, kita biarkan simpel
    // return this.filesService.update(+id, updateFileDto);
    this.logger.log(`Request to update file ${id} with data:`, updateFileDto);
    // Logika update belum diimplementasikan di service, jadi kita return pesan
    return { message: `File with id ${id} would be updated.` };
  }
}