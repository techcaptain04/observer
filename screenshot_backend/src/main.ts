import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
      // allowedHeaders:"*",
      origin: "http://localhost:5173",
      credentials: true,
  });
  console.log(process.env.PORT);
  await app.listen(process.env.PORT ?? 5174);
}
bootstrap();
