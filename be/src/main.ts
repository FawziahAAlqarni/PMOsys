import {NestFactory} from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {AppModule} from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
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
  app.setGlobalPrefix('api');
  const port = process.env.PORT || 3030;
  await app.listen(port, '0.0.0.0');
}

bootstrap();
