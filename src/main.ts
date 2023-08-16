import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { env } from '~config/env.config';
import { setupSwagger } from '~config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const logger = new Logger('Bootstrap Logger');
  setupSwagger(app);
  await app.listen(env.APP.APP_PORT || 5000);
  logger.log(
    `Application listening on port ${env.APP.APP_PORT.toString() || '5001'}`,
  );
}
bootstrap();
