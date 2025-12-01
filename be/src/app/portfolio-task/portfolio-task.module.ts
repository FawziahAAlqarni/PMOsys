import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PortfolioTask} from './entities/portfolio-task.entity';
import {PortfolioTaskService} from './portfolio-task.service';
import {PortfolioTaskController} from './portfolio-task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioTask])],
  controllers: [PortfolioTaskController],
  providers: [PortfolioTaskService],
  exports: [PortfolioTaskService],
})
export class PortfolioTaskModule {
}
