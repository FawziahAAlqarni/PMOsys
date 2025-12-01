import {Controller, Get, Post, Body, Patch, Param, Delete, Query,} from '@nestjs/common';
import {PortfolioTaskService} from './portfolio-task.service';
import {CreatePortfolioTaskDto} from './dto/create-portfolio-task.dto';
import {UpdatePortfolioTaskDto} from './dto/update-portfolio-task.dto';
import {Portfolio} from './entities/portfolio.enum';

@Controller('portfolio-tasks')
export class PortfolioTaskController {
  constructor(private readonly portfolioTaskService: PortfolioTaskService) {
  }

  @Post()
  create(@Body() createDto: CreatePortfolioTaskDto) {
    return this.portfolioTaskService.create(createDto);
  }

  @Get()
  findAll(@Query('portfolio') portfolio?: Portfolio) {
    if (portfolio) {
      return this.portfolioTaskService.findByPortfolio(portfolio);
    }
    return this.portfolioTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfolioTaskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePortfolioTaskDto) {
    return this.portfolioTaskService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfolioTaskService.remove(id);
  }
}
