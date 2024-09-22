import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  app.setGlobalPrefix('v1/api');
  app.use(cookieParser());
  app.enableCors({
    origin: ['*', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders:
      'Content-Type, Accept, Authorization, X-Requested-With, Application, refreshtoken', 
  });

  const config = new DocumentBuilder()
    .setTitle(process.env.DB_NAME)
    .setDescription('Bidding API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {});
  fs.writeFileSync(
    '../../schemas/src/swagger-schema.json',
    JSON.stringify(document),
  );

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { basePath: '/v1/api' },
  });
  await app.listen(process.env.API_PORT);
  logger.log(`Application running on port ${process.env.API_PORT}`);
}
bootstrap();
