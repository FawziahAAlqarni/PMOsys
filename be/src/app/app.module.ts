import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {LoggerModule} from 'nestjs-pino';
import {v4 as uuidv4} from 'uuid';
import {ProjectModule} from "./projects/project.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./auth/guards/jwt-auth.guard";
import {AuthModule} from "./auth/auth.module";
import {PermissionsModule} from "../permissions/permissions.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'project_management',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: false,
      ssl: false,
    }),
    AuthModule,
    ProjectModule,
    PermissionsModule,
  ],
  providers: [],
})
export class AppModule {}