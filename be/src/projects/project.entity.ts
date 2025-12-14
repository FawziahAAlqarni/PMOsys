import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectName: string;

  @Column()
  programName: string;

  @Column('decimal', { precision: 15, scale: 2 })
  budget: number;

  @Column()
  managerName: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ default: 'initiation' })
  stage: string;

  @Column('jsonb', { nullable: true })
  risks: any;
}
