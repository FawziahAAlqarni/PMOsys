import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RiskRegisterService } from './risk-register.service';
import { CreateRiskRegisterDto } from './dto/create-risk-register.dto';
import { UpdateRiskRegisterDto } from './dto/update-risk-register.dto';

@Controller('risk-register')
export class RiskRegisterController {
  constructor(private readonly riskRegisterService: RiskRegisterService) {}

  @Post()
  create(@Body() createDto: CreateRiskRegisterDto) {
    return this.riskRegisterService.create(createDto);
  }

  @Get()
  findAll() {
    return this.riskRegisterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riskRegisterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateRiskRegisterDto) {
    return this.riskRegisterService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riskRegisterService.remove(id);
  }
}
