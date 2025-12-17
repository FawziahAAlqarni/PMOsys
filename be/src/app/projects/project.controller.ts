import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import {ProjectService} from './project.service';
import {CreateProjectDto} from './dto/create-project.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

// @UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {
  }


  @Post()
  create(@Body() createDto: CreateProjectDto) {
    return this.projectService.create(createDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

}
