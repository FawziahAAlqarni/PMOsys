import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {AppModule} from "./app/app.module";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import {Logger} from 'nestjs-pino';
import {v4 as uuidv4} from 'uuid';
import {JwtAuthGuard} from "./app/auth/guards/jwt-auth.guard";

async function bootstrap() {

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      genReqId: () => uuidv4(),
      requestIdLogLabel: 'traceId',
    }),
    { bufferLogs: true },
  );

  // --- بداية التعديل (إعدادات CORS) ---
  // تم السماح للواجهة بالاتصال بغض النظر عن البيئة (Development/Production)
  // يمكنك لاحقاً تحديد الروابط بدقة بدلاً من "origin: true" لزيادة الأمان
  app.enableCors({
    origin: true, // يسمح بالاتصال من http://localhost:3000 و http://localhost:8008
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

 

  // --- نهاية التعديل ---

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

  // global auth guard
  // app.useGlobalGuards(new JwtAuthGuard())

  // OpenAPI/Swagger setup at /docs and JSON at /docs-json
  const config = new DocumentBuilder()
    .setTitle('Portfolio Tasks API')
    .setDescription('API documentation for the Portfolio Tasks backend')
    .setVersion('1.0.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'docs-json',
    swaggerOptions: { persistAuthorization: true },
  });

  // تأكد أن البورت هنا يطابق ما هو موجود في Docker (3030 أو 3000)
  const port = process.env.PORT || 3030;
  
  // الاستماع على 0.0.0.0 ضروري لكي يعمل داخل Docker
  await app.listen(port, '0.0.0.0');
  
  console.log(`✓ Server is running on http://0.0.0.0:${port}`);
  console.log(`✓ API Docs: http://localhost:${port}/docs`);
}

bootstrap().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});