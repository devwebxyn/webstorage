// backend/src/files/dto/create-file.dto.ts
import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  path: string; // Validasi `path` tidak boleh kosong

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsBoolean()
  @IsOptional()
  isPublic?: boolean;

  @IsString()
  @IsNotEmpty()
  storageProvider: string;
}