import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DefaultResponseHeadersInterceptor } from './interceptors/default-response-headers.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new DefaultResponseHeadersInterceptor());

  await app.listen(3000);
}
bootstrap();
