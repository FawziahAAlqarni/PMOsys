import {Portfolio} from '../entities/portfolio.enum';

export class CreatePortfolioTaskDto {
  portfolioName: Portfolio;
  taskName: string;
  dueDate: Date;
  completionPercentage?: number;
}
