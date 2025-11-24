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
            origin: ['http://localhost:8008'],
        });
    }
    app.setGlobalPrefix('api');
    await app.listen(3000, '0.0.0.0');
}

bootstrap();