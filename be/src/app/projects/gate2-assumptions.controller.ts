import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Gate2AssumptionsService } from './gate2-assumptions.service';
import { CreateGate2AssumptionsDto } from './dto/create-gate2-assumptions.dto';
import { UpdateGate2AssumptionsDto } from './dto/update-gate2-assumptions.dto';

@Controller('gate2-assumptions')
export class Gate2AssumptionsController {
  constructor(private readonly service: Gate2AssumptionsService) {}

  @Post()
  create(@Body() createDto: CreateGate2AssumptionsDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateGate2AssumptionsDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
