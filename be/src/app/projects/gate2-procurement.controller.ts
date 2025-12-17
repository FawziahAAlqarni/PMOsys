import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Gate2ProcurementService } from './gate2-procurement.service';
import { CreateGate2ProcurementDto } from './dto/create-gate2-procurement.dto';
import { UpdateGate2ProcurementDto } from './dto/update-gate2-procurement.dto';

@Controller('gate2-procurement')
export class Gate2ProcurementController {
  constructor(private readonly service: Gate2ProcurementService) {}

  @Post()
  create(@Body() createDto: CreateGate2ProcurementDto) {
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
  update(@Param('id') id: string, @Body() updateDto: UpdateGate2ProcurementDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
