import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ProjectCardService} from './project-card.service';
import {CreateProjectCardDto} from './dto/create-project-card.dto';

@Controller('project-cards')
export class ProjectCardController {
  constructor(private readonly projectCardService: ProjectCardService) {
  }

  @Post()
  create(@Body() createDto: CreateProjectCardDto) {
    return this.projectCardService.create(createDto);
  }

  @Get()
  findAll() {
    return this.projectCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectCardService.findOne(id);
  }

}
