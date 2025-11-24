import { Entity, PrimaryColumn, Column } from 'typeorm';
import { Portfolio } from './portfolio.enum';

@Entity('portfolio_counters')
export class PortfolioCounter {
  @PrimaryColumn({
    type: 'enum',
    enum: Portfolio,
  })
  portfolio: Portfolio;

  @Column({ type: 'int', default: 0 })
  counter: number;
}