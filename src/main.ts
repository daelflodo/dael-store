import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const PORT = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes() es una función utilizada para configurar un "pipe" global en toda la aplicación.
  app.useGlobalPipes(
    new ValidationPipe({
      //automaticamente el va a negar o eliminar del payload todos los atributos que no esten definido en el DTO
      whitelist: true,
      //
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(PORT);
}
bootstrap();
