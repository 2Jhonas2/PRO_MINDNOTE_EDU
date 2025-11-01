import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilita validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no incluidas en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan campos extra
      transform: true, // transforma tipos automáticamente (por ejemplo, string a number)
    }),
  );

  // ✅ CORS (ya lo tenías)
  app.enableCors();

  // ✅ Puerto
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
