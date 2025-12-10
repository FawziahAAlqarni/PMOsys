import {AuthModule} from './auth/auth.module';
import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LoggerModule} from 'nestjs-pino';
import {v4 as uuidv4} from 'uuid';
import {ProjectModule} from "./projects/project.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.LOG_PRETTY === 'true'
            ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                singleLine: false,
                translateTime: 'HH:MM:ss.l',
                ignore: 'pid,hostname',
              },
            }
            :
            undefined,
        level: process.env.LOG_LEVEL || 'info',
        autoLogging: true,

        // Generate trace ID (backend only, no client headers accepted)
        genReqId: () => uuidv4(),

        redact: {
          paths: [
            'req.headers.authorization',
            'req.headers.cookie',
            'req.body.password',
            'req.body.token',
          ],
          censor: 'censored'
        },
      },
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'project_management',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AuthModule,
    ProjectModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {
}
