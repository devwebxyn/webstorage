// backend/src/files/files.controller.ts
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { CreateFileDto } from './dto/create-file.dto'; // Impor DTO

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as any;
    return this.filesService.findAllForUser(user.id);
  }

  @Post() // Endpoint baru untuk membuat data file
  create(@Body() createFileDto: CreateFileDto, @Req() req: Request) {
    const user = req.user as any;
    return this.filesService.create(createFileDto, user.id);
  }
}