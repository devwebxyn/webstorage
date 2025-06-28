// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Menambahkan 'api' secara global ke semua endpoint
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();