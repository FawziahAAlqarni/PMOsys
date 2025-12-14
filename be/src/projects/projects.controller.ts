import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: any): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  // التعديل هنا بإضافة []
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }
}