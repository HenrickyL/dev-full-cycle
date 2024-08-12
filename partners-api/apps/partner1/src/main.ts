import { NestFactory } from '@nestjs/core';
import { Partner1Module } from './partner1.module';
import { AllExceptionsFilter } from '_infra/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(Partner1Module);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
