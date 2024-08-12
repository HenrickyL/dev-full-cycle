import { NestFactory } from '@nestjs/core';
import { Partner2Module } from './partner2.module';
import { AllExceptionsFilter } from '_infra/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(Partner2Module);
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3001);
}
bootstrap();
