import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Gate2ScopeService } from './gate2-scope.service';
import { CreateGate2ScopeDto } from './dto/create-gate2-scope.dto';
import { UpdateGate2ScopeDto } from './dto/update-gate2-scope.dto';

@Controller('gate2-scope')
export class Gate2ScopeController {
  constructor(private readonly service: Gate2ScopeService) {}

  @Post()
  create(@Body() createDto: CreateGate2ScopeDto) {
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
  update(@Param('id') id: string, @Body() updateDto: UpdateGate2ScopeDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
