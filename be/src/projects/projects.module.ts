import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project])], // ربط جدول المشاريع
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService] // لتتمكن من استخدامه في أماكن أخرى إذا احتجت
})
export class ProjectsModule {}