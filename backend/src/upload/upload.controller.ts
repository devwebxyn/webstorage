// backend/src/upload/upload.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  ParseFilePipe,
  MaxFileSizeValidator,
  UnauthorizedException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { AuthGuard } from '../auth/auth.guard';
import { Express, Request } from 'express'; // Impor Request dari express

// Definisikan tipe Request yang sudah diautentikasi
// Sesuaikan dengan struktur yang dibuat oleh AuthGuard Anda
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

@Controller('upload')
@UseGuards(AuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('mega')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileToMega(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
    @Req() req: AuthenticatedRequest, // Gunakan tipe yang sudah didefinisikan
  ) {
    // PERBAIKAN UTAMA: Ambil userId dari req.user, bukan req.auth
    const userId = req.user.userId;

    if (!userId) {
      // Baris ini sebagai pengaman tambahan, meskipun seharusnya tidak akan pernah terjadi
      throw new UnauthorizedException('User ID tidak dapat ditemukan setelah autentikasi.');
    }

    const fileMetadata = await this.uploadService.uploadToMega(file, userId);

    return {
      status: 'success',
      message: 'File berhasil diunggah ke MEGA.',
      file: fileMetadata,
    };
  }
}