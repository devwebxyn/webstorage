// backend/src/files/dto/create-file.dto.ts
// backend/src/files/dto/create-file.dto.ts
export class CreateFileDto {
  fileName: string;
  path: string;
  size: number;
  isPublic: boolean; // <-- Tambahkan properti ini
}