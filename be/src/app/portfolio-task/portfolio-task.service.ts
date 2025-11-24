import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PortfolioTask } from './entities/portfolio-task.entity';
import { PortfolioCounter } from './entities/portfolio-counter.entity';
import { Portfolio } from './entities/portfolio.enum';
import { CreatePortfolioTaskDto } from './dto/create-portfolio-task.dto';
import { UpdatePortfolioTaskDto } from './dto/update-portfolio-task.dto';

@Injectable()
export class PortfolioTaskService {
  constructor(
    @InjectRepository(PortfolioTask)
    private readonly taskRepository: Repository<PortfolioTask>,
    @InjectRepository(PortfolioCounter)
    private readonly counterRepository: Repository<PortfolioCounter>,
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreatePortfolioTaskDto): Promise<PortfolioTask> {
    const taskId = await this.generateTaskId(dto.portfolioName);

    const task = this.taskRepository.create({
      ...dto,
      taskId,
    });

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<PortfolioTask[]> {
    return this.taskRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<PortfolioTask | null> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async findByTaskId(taskId: string): Promise<PortfolioTask | null> {
    return this.taskRepository.findOne({ where: { taskId } });
  }

  async findByPortfolio(portfolio: Portfolio): Promise<PortfolioTask[]> {
    return this.taskRepository.find({
      where: { portfolioName: portfolio },
      order: { createdAt: 'ASC' },
    });
  }

  async update(
    id: string,
    dto: UpdatePortfolioTaskDto,
  ): Promise<PortfolioTask | null> {
    await this.taskRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  private async generateTaskId(portfolio: Portfolio): Promise<string> {
    // Use a transaction to ensure atomic counter increment
    return this.dataSource.transaction(async (manager) => {
      let counter = await manager.findOne(PortfolioCounter, {
        where: { portfolio },
        lock: { mode: 'pessimistic_write' },
      });

      if (!counter) {
        counter = manager.create(PortfolioCounter, {
          portfolio,
          counter: 0,
        });
      }

      counter.counter += 1;
      await manager.save(counter);

      return `${portfolio}_${counter.counter}`;
    });
  }
}
