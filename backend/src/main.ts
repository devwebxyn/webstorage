// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // Pastikan bagian CORS ini sudah ada dan benar seperti yang kita bahas sebelumnya
  app.enableCors({
    origin: 'http://localhost:5173', // Penting: Ini harus URL frontend Anda
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(3000); // Pastikan ini 3000
}
bootstrap();