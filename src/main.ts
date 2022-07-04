import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DefaultResponseHeadersInterceptor } from './interceptors/default-response-headers.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new DefaultResponseHeadersInterceptor());

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
