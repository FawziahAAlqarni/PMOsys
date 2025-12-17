import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Gate2ChangeCardService } from './gate2-change-card.service';
import { CreateGate2ChangeCardDto } from './dto/create-gate2-change-card.dto';
import { UpdateGate2ChangeCardDto } from './dto/update-gate2-change-card.dto';

@Controller('gate2-change-card')
export class Gate2ChangeCardController {
  constructor(private readonly service: Gate2ChangeCardService) {}

  @Post()
  create(@Body() createDto: CreateGate2ChangeCardDto) {
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
  update(@Param('id') id: string, @Body() updateDto: UpdateGate2ChangeCardDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
