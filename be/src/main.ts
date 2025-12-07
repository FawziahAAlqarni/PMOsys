import {NestFactory} from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {AppModule} from "./app/app.module";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import {Logger} from 'nestjs-pino';
import {v4 as uuidv4} from 'uuid';

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      genReqId: () => uuidv4(),
      requestIdLogLabel: 'traceId',
    }),
    {bufferLogs: true},
  );

  app.useLogger(app.get(Logger));
  const corsOptions = {
    methods: ['GET', 'HEAD', 'POST', 'PATCH', 'DELETE'],
  };
  if (process.env.NODE_ENV === 'development') {
    app.enableCors(corsOptions);
  } else {
    app.enableCors({
      ...corsOptions,
      origin: ['http://localhost:3000'],
    });
  }

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );


  // OpenAPI/Swagger setup at /docs and JSON at /docs-json
  const config = new DocumentBuilder()
    .setTitle('Portfolio Tasks API')
    .setDescription('API documentation for the Portfolio Tasks backend')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs-json',
    swaggerOptions: {persistAuthorization: true},
  });

  const port = process.env.PORT || 3030;
  const logger = app.get(Logger);
  logger.log(`Server is running on port ${port}`, 'Bootstrap');
  await app.listen(port, '0.0.0.0');
}

bootstrap();
