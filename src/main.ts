import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const appPort = 3000;
  console.log(`App listening on port ${appPort}`);
  await app.listen(appPort);
}
bootstrap();
