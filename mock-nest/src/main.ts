import { NestFactory } from '@nestjs/core';
import { MockModule } from './app.module';
import { SuccessInterceptor } from './middleware/success.interceptor';
import { GlobalExceptionFilter } from './middleware/global-exception.filter';
import { findAvailablePort } from './tool';

async function bootstrap() {
  const app = await NestFactory.create(MockModule);

  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const port = await findAvailablePort(3000);

  await app.listen(port, 'localhost');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
