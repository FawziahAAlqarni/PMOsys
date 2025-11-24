import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Portfolio } from './portfolio.enum';

@Entity('portfolio_tasks')
export class PortfolioTask {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Portfolio,
  })
  portfolioName: Portfolio;

  @Column()
  taskName: string;

  @Column({ unique: true })
  taskId: string; // Format: HA_1, MA_4, EA_9

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'int', default: 0 })
  completionPercentage: number; // 0-100

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}