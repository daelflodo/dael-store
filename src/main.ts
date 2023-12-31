import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes() es una función utilizada para configurar un "pipe" global en toda la aplicación.
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      //automaticamente el va a negar o eliminar del payload todos los atributos que no esten definido en el DTO
      whitelist: true,
      //
      forbidNonWhitelisted: true,
    }),
  );
  //instalamos la dependencia npm install --save @nestjs/swagger
  const config = new DocumentBuilder()
    .setTitle('Dael store')
    .setDescription('Una api para dael-store')
    .setVersion('1.0')
    .addTag('products')
    .addTag('customers')
    .addTag('users')
    .addTag('brands')
    .addTag('categories')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  app.enableCors();
  await app.listen(PORT, '0.0.0.0', () => {
    console.log('Listening in port:' + PORT);
  });
}
bootstrap();
