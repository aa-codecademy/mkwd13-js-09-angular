import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // Enable CORS for frontend communication
  app.enableCors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'], // Angular dev server
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow cookies/auth headers
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap().catch((err) => {
  console.error('Error starting the application:', err);
  process.exit(1);
});
